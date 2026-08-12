#!/usr/bin/env node
/**
 * Script de Sincronización GitHub → SharePoint
 * Lee datos de js/data.js y los sincroniza a la lista "Responsables" en SharePoint
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Variables de entorno
const CLIENT_ID = process.env.AZURE_CLIENT_ID;
const CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET;
const TENANT_ID = process.env.AZURE_TENANT_ID;
const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const LIST_ID = process.env.SHAREPOINT_LIST_ID;

let accessToken = null;

/**
 * Obtiene token de acceso de Azure
 */
async function getAccessToken() {
    return new Promise((resolve, reject) => {
        const postData = new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials',
            scope: 'https://graph.microsoft.com/.default'
        }).toString();

        const options = {
            hostname: 'login.microsoftonline.com',
            path: `/${TENANT_ID}/oauth2/v2.0/token`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode === 200) {
                    const token = JSON.parse(data).access_token;
                    resolve(token);
                } else {
                    reject(new Error(`Failed to get token: ${res.statusCode}`));
                }
            });
        });

        req.on('error', reject);
        req.write(postData);
        req.end();
    });
}

/**
 * Realiza una llamada a Microsoft Graph API
 */
async function graphRequest(method, endpoint, body = null) {
    if (!accessToken) {
        accessToken = await getAccessToken();
    }

    // Procesar endpoint para construir Site ID correctamente
    let finalEndpoint = endpoint;
    if (endpoint.includes('/sites/') && !endpoint.includes('ingeurbe.sharepoint.com')) {
        // Reemplazar /sites/AutomatizacionObras con el formato completo
        finalEndpoint = endpoint.replace(/\/sites\/([^/]+)/, '/sites/ingeurbe.sharepoint.com:/sites/$1');
    }

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'graph.microsoft.com',
            path: finalEndpoint,
            method: method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(JSON.parse(data || '{}'));
                } else if (res.statusCode === 401) {
                    // Token expirado, obtener uno nuevo
                    accessToken = null;
                    graphRequest(method, endpoint, body).then(resolve).catch(reject);
                } else {
                    reject(new Error(`API Error ${res.statusCode}: ${data}`));
                }
            });
        });

        req.on('error', reject);
        if (body) {
            req.write(JSON.stringify(body));
        }
        req.end();
    });
}

/**
 * Lee y parsea el archivo data.js
 */
function parseDataJs() {
    const dataPath = path.join(__dirname, 'js', 'data.js');
    const content = fs.readFileSync(dataPath, 'utf8');

    // Extraer arrays usando regex
    const extractArray = (name) => {
        const regex = new RegExp(`const ${name}\\s*=\\s*\\[(.*?)\\];`, 's');
        const match = content.match(regex);
        if (!match) return [];
        try {
            return eval(`[${match[1]}]`);
        } catch (e) {
            console.error(`Error parsing ${name}:`, e.message);
            return [];
        }
    };

    const extractObject = (name) => {
        const regex = new RegExp(`const ${name}\\s*=\\s*\\{(.*?)\\};`, 's');
        const match = content.match(regex);
        if (!match) return {};
        try {
            return eval(`({${match[1]}})`);
        } catch (e) {
            console.error(`Error parsing ${name}:`, e.message);
            return {};
        }
    };

    return {
        CLUSTERS: extractArray('CLUSTERS'),
        SUBGERENTES: extractArray('SUBGERENTES'),
        PROYECTOS: extractArray('PROYECTOS'),
        CARGOS: extractArray('CARGOS'),
        FOTOS: extractArray('FOTOS'),
        RESPONSABLES_INFO: extractObject('RESPONSABLES_INFO')
    };
}

/**
 * Construye la lista de responsables para sincronizar
 */
function buildResponsablesData(data) {
    const responsables = [];
    const { CLUSTERS, SUBGERENTES, PROYECTOS, FOTOS, RESPONSABLES_INFO } = data;

    FOTOS.forEach(foto => {
        // Parsear nombre de archivo: PROYECTO_Cargo_Nombre.png
        const [proyecto, cargoParte, ...nombrePartes] = foto.replace('.png', '').split('_');
        const nombre = nombrePartes.join('_').replace(/-/g, ' ');
        const cargo = cargoParte.replace(/-/g, ' ');

        // Obtener info del proyecto
        const proyectoInfo = PROYECTOS.find(p => p.nombre === proyecto);
        if (!proyectoInfo) {
            console.warn(`Proyecto no encontrado: ${proyecto}`);
            return;
        }

        // Obtener info del subgerente
        const subgerente = SUBGERENTES.find(s => s.id === proyectoInfo.subgerente_id);
        const subgerenteName = subgerente ? subgerente.nombre : '';

        // Obtener info del cluster
        const cluster = CLUSTERS.find(c => c.id === proyectoInfo.cluster_id);
        const clusterName = cluster ? cluster.nombre : '';

        // Obtener contacto
        const contactInfo = RESPONSABLES_INFO[foto] || {};

        responsables.push({
            Proyecto: proyecto,
            Cluster: clusterName,
            Subgerente: subgerenteName,
            Cargo: cargo,
            Nombre: nombre,
            Correo: contactInfo.correo || '',
            Telefono: contactInfo.telefono || '',
            Teams: contactInfo.teams || '',
            Foto: `assets/photos/${foto}`
        });
    });

    return responsables;
}

/**
 * Obtiene items existentes en SharePoint
 */
async function getExistingItems() {
    const endpoint = await getItemsEndpoint();
    const response = await graphRequest('GET', endpoint);
    return response.value || [];
}

/**
 * Crea o actualiza items en SharePoint
 */
let cachedSiteGuid = null;

async function getSiteGuid() {
    if (cachedSiteGuid) return cachedSiteGuid;

    // Obtener el GUID del sitio usando el nombre
    const sitePath = `ingeurbe.sharepoint.com:/sites/${SITE_ID}`;
    const response = await graphRequest('GET', `/v1.0/sites/${sitePath}?$select=id`);

    if (response.id) {
        cachedSiteGuid = response.id;
        return cachedSiteGuid;
    }
    throw new Error(`No se pudo obtener el ID del sitio: ${SITE_ID}`);
}

async function getItemsEndpoint() {
    // Obtener el GUID real del sitio
    const siteGuid = await getSiteGuid();
    return `/v1.0/sites/${siteGuid}/lists/${LIST_ID}/items?$select=id,fields`;
}

async function syncItems(newItems) {
    console.log(`📊 Sincronizando ${newItems.length} responsables a SharePoint...`);

    const existingItems = await getExistingItems();
    console.log(`📋 Items existentes: ${existingItems.length}`);

    // Mapeo: Nombre → ID existente para actualizar
    const nameToId = {};
    existingItems.forEach(item => {
        const name = item.fields?.Nombre;
        if (name) {
            nameToId[name] = item.id;
        }
    });

    let created = 0;
    let updated = 0;

    // Obtener el GUID del sitio una vez
    const siteGuid = await getSiteGuid();

    for (const item of newItems) {
        const endpoint = `/v1.0/sites/${siteGuid}/lists/${LIST_ID}/items`;
        const body = {
            fields: {
                Proyecto: item.Proyecto,
                Cluster: item.Cluster,
                Subgerente: item.Subgerente,
                Cargo: item.Cargo,
                Nombre: item.Nombre,
                Correo: item.Correo,
                Telefono: item.Telefono,
                Teams: item.Teams,
                Foto: item.Foto
            }
        };

        try {
            if (nameToId[item.Nombre]) {
                // Actualizar
                const id = nameToId[item.Nombre];
                await graphRequest('PATCH', `${endpoint}/${id}`, body);
                updated++;
                console.log(`✏️ Actualizado: ${item.Nombre}`);
            } else {
                // Crear
                await graphRequest('POST', endpoint, body);
                created++;
                console.log(`✅ Creado: ${item.Nombre}`);
            }
        } catch (error) {
            console.error(`❌ Error con ${item.Nombre}:`, error.message);
        }
    }

    // Eliminar items que ya no existen en data.js
    const newNames = new Set(newItems.map(i => i.Nombre));
    for (const item of existingItems) {
        const name = item.fields?.Nombre;
        if (name && !newNames.has(name)) {
            try {
                await graphRequest('DELETE', `${endpoint}/${item.id}`);
                console.log(`🗑️ Eliminado: ${name}`);
            } catch (error) {
                console.error(`❌ Error eliminando ${name}:`, error.message);
            }
        }
    }

    console.log(`\n✨ Sincronización completada!`);
    console.log(`📈 Creados: ${created}, Actualizados: ${updated}`);
}

/**
 * Función principal
 */
async function main() {
    try {
        console.log('🚀 Iniciando sincronización GitHub → SharePoint\n');

        // Validar variables de entorno
        if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID || !SITE_ID || !LIST_ID) {
            throw new Error('Faltan variables de entorno necesarias. Verifica los secretos en GitHub.');
        }

        console.log('📖 Leyendo data.js...');
        const data = parseDataJs();
        console.log(`✅ Datos cargados: ${data.FOTOS.length} responsables\n`);

        console.log('🔨 Construyendo lista de responsables...');
        const responsables = buildResponsablesData(data);
        console.log(`✅ Lista construida: ${responsables.length} items\n`);

        console.log('🔐 Autenticando en Azure...');
        await getAccessToken();
        console.log(`✅ Token obtenido\n`);

        await syncItems(responsables);
        console.log('\n✅ ¡Sincronización exitosa!');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
}

main();
