# 🏗️ Arquitectura de Sincronización GitHub ↔ SharePoint

## 📊 Resumen General

```
┌─────────────────────────────────────────────────────────────────┐
│                        GITHUB REPOSITORY                        │
│  https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto │
│                                                                 │
│  ┌─────────────┐  ┌──────────────────┐  ┌───────────────────┐ │
│  │ js/data.js  │→ │ sync-sharepoint  │→ │ GitHub Actions    │ │
│  │  (SOURCE)   │  │     (SCRIPT)     │  │  (TRIGGER)        │ │
│  └─────────────┘  └──────────────────┘  └───────────────────┘ │
│         ▲                                                        │
│         │ (manual edit)                                         │
│    Agregar/Eliminar                                             │
│    responsables                                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Microsoft Graph API
                              │ (OAuth 2.0)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                          SHAREPOINT                             │
│   https://ingeurbe.sharepoint.com/sites/AutomatizacionObras    │
│                                                                 │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │            Lista: Responsables                            │ │
│  │                                                           │ │
│  │ Proyecto | Cluster | Subgerente | Cargo | Nombre | ...  │ │
│  │ --------|---------|-----------|-------|--------|-----  │ │
│  │ FLORA   | Robles  | Diego...  | Dir.  | Carlos | ...  │ │
│  │ VIALE26 | Occide. | Fabio...  | Resid.| Juan   | ...  │ │
│  │ ...     | ...     | ...       | ...   | ...    | ...  │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 FLUJO DE SINCRONIZACIÓN

### Paso 1: Cambio en GitHub
```
Usuario edita js/data.js
    │
    ├─ Agrega responsable (nueva foto)
    ├─ Actualiza datos (correo, teléfono)
    └─ Elimina responsable (borra entrada)
    │
    ▼
git push origin main
```

### Paso 2: GitHub Actions Se Dispara
```
GitHub detecta cambio en js/data.js
    │
    ▼
Inicia el workflow: sync-sharepoint.yml
    │
    ├─ Descarga el código del repositorio
    ├─ Configura Node.js 18
    └─ Ejecuta sync-sharepoint.js
```

### Paso 3: Script de Sincronización
```
sync-sharepoint.js
    │
    ├─ 🔐 Autentica en Azure usando credenciales
    │  (Client ID + Client Secret → Token OAuth 2.0)
    │
    ├─ 📖 Lee y parsea js/data.js
    │  Extrae: CLUSTERS, SUBGERENTES, PROYECTOS, FOTOS, RESPONSABLES_INFO
    │
    ├─ 🔨 Construye lista de responsables
    │  Por cada foto en FOTOS:
    │    - Extrae: Proyecto, Cargo, Nombre del nombre de archivo
    │    - Busca Subgerente y Cluster del proyecto
    │    - Obtiene: Correo, Teléfono, Teams de RESPONSABLES_INFO
    │    - Crea objeto con todos los campos
    │
    ├─ 🔄 Sincroniza a SharePoint
    │  - Obtiene items existentes de la lista
    │  - Crea items nuevos
    │  - Actualiza items existentes
    │  - Elimina items que ya no existen
    │
    └─ ✅ Completa con reporte
       (items creados, actualizados, eliminados)
```

### Paso 4: Datos en SharePoint
```
Lista "Responsables" se actualiza automáticamente
    │
    ├─ Nuevos responsables aparecen como items
    ├─ Cambios en datos se reflejan
    └─ Responsables eliminados se borran
    │
    ▼
SharePoint Lists muestra datos actualizados
    │
    └─ Disponible en: https://ingeurbe.sharepoint.com/sites/AutomatizacionObras
```

---

## 📁 ESTRUCTURA DE DATOS

### Entrada en js/data.js
```javascript
// CLUSTERS
const CLUSTERS = [
    { id: 1, nombre: "Robles", ubicacion: "Zona Norte" },
    ...
];

// SUBGERENTES
const SUBGERENTES = [
    { id: 1, nombre: "Ing. Diego Alejandro Robles Fonseca", ... },
    ...
];

// PROYECTOS
const PROYECTOS = [
    { nombre: 'FLORA', subgerente_id: 1, cluster_id: 1, ... },
    ...
];

// FOTOS (nombres de archivos)
const FOTOS = [
    'FLORA_Director_Carlos-Ruiz.png',
    'FLORA_Residente-1_Juan-Torres.png',
    ...
];

// RESPONSABLES_INFO (contacto)
const RESPONSABLES_INFO = {
    'FLORA_Director_Carlos-Ruiz.png': {
        correo: 'carlos.ruiz@ingeurbe.com',
        telefono: '+57 300 0000001',
        teams: 'carlos.ruiz@ingeurbe.com'
    },
    ...
};
```

### Salida en SharePoint (cada fila es un item)
```
Proyecto  | Cluster | Subgerente              | Cargo      | Nombre       | Correo                    | Teléfono       | Teams                     | Foto
----------|---------|------------------------|------------|--------------|---------------------------|-----------------|----------------------------|----------------------------------
FLORA     | Robles  | Ing. Diego Robles      | Director   | Carlos Ruiz  | carlos.ruiz@ingeurbe.com  | +57 300 0000001 | carlos.ruiz@ingeurbe.com  | assets/photos/FLORA_Director_Carlos-Ruiz.png
FLORA     | Robles  | Ing. Diego Robles      | Residente 1| Juan Torres  | juan.torres@ingeurbe.com  | +57 300 0000002 | juan.torres@ingeurbe.com  | assets/photos/FLORA_Residente-1_Juan-Torres.png
VIALE26   | Occident| Arq. Fabio Galan       | Director   | Pedro López  | pedro.lopez@ingeurbe.com  | +57 300 0000003 | pedro.lopez@ingeurbe.com  | assets/photos/VIALE26_Director_Pedro-Lopez.png
```

---

## 🔐 SEGURIDAD Y AUTENTICACIÓN

### OAuth 2.0 Flow
```
GitHub Action
    │
    ├─ Usa credenciales de AZURE_CLIENT_ID y AZURE_CLIENT_SECRET
    │  (Almacenadas seguras en GitHub Secrets)
    │
    ▼
Azure AD
    │
    ├─ Valida identidad del App Registration
    └─ Emite Access Token (1 hora de validez)
    │
    ▼
Microsoft Graph API
    │
    ├─ Usa Access Token para autorizar solicitudes
    └─ Permite crear/actualizar items en SharePoint
    │
    ▼
SharePoint List
    │
    └─ Items se crean con permisos del App Registration
```

### Secretos Necesarios en GitHub
```
AZURE_CLIENT_ID           → ID único del App Registration
AZURE_CLIENT_SECRET       → Contraseña del App (CONFIDENCIAL)
AZURE_TENANT_ID           → ID del tenant de Azure (organización)
SHAREPOINT_SITE_ID        → ID único del sitio de SharePoint
SHAREPOINT_LIST_ID        → ID único de la lista "Responsables"
```

### Permisos Requeridos en Azure
```
- Sites.ReadWrite.All    → Crear/actualizar items en listas
- Directory.Read.All     → Leer información de usuarios (opcional)
```

---

## 📊 MAPEAMIENTO DE CAMPOS

### Cómo se parsea el nombre del archivo
```
Formato: PROYECTO_Cargo_Nombre.png

Ejemplo: FLORA_Director_Carlos-Ruiz.png
         │       │        └─────────┘
         │       └─────────────────────── Cargo (con guiones)
         └──────────────────────────────── Proyecto

Parseo en el script:
- Divide por underscore (_)
- Primera parte → Proyecto (FLORA)
- Segunda parte → Cargo (Director, sin guiones)
- Resto → Nombre (Carlos-Ruiz, reemplaza guiones por espacios → Carlos Ruiz)
```

### Correspondencias
```
js/data.js              →  SharePoint List
────────────────────────────────────────────
Nombre archivo          →  Foto (URL)
Proyecto (extraído)     →  Proyecto
Cargo (extraído)        →  Cargo
Nombre (extraído)       →  Nombre

Via PROYECTOS lookup:
- proyecto.nombre       →  Proyecto (verificación)
- proyecto.subgerente_id → busca SUBGERENTE.nombre → Subgerente
- proyecto.cluster_id   → busca CLUSTER.nombre → Cluster

Via RESPONSABLES_INFO:
- correo                →  Correo
- telefono              →  Teléfono
- teams                 →  Teams
```

---

## ⚠️ CASOS EDGE

### Agregar Responsable
```
Acción en GitHub:
  1. Tomar foto y guardar como: PROYECTO_Cargo_Nombre.png
  2. Agregar nombre de archivo a array FOTOS
  3. Agregar entrada a RESPONSABLES_INFO
  4. git push

Resultado en SharePoint:
  → Nuevo item en lista "Responsables"
```

### Actualizar Responsable
```
Acción en GitHub:
  1. Cambiar datos en RESPONSABLES_INFO (correo, teléfono, teams)
  2. git push

Resultado en SharePoint:
  → Item se actualiza automáticamente (matchea por Nombre)
```

### Eliminar Responsable
```
Acción en GitHub:
  1. Eliminar nombre de archivo de array FOTOS
  2. Eliminar entrada de RESPONSABLES_INFO
  3. Opcionalmente: eliminar archivo de foto
  4. git push

Resultado en SharePoint:
  → Item se elimina de la lista
```

### Responsable sin Proyecto (edge case)
```
Si archivo de foto no corresponde a proyecto en PROYECTOS:
  → Se muestra warning en logs del Action
  → Item NO se sincroniza (integridad de datos)
```

---

## 📊 VENTAJAS DE ESTA ARQUITECTURA

✅ **GitHub como fuente de verdad**
   - Una única fuente de datos
   - Histórico de cambios (git log)
   - Control de versiones

✅ **Sincronización automática**
   - Sin pasos manuales
   - Cambios reflejados al instante
   - GitHub Actions gratis para repos públicos

✅ **Escalable**
   - Agregar 100 responsables solo editando data.js
   - Sin UI manual en SharePoint
   - Fácil mantenimiento

✅ **Seguro**
   - Credenciales en GitHub Secrets (encriptadas)
   - OAuth 2.0 para autenticación
   - Permisos granulares en Azure

✅ **Flexible**
   - Fácil cambiar estructura de datos
   - Fácil agregar nuevos campos
   - Script reutilizable

---

## 🔧 MANTENIMIENTO

### Logs de Sincronización
Accede a: https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/actions

Cada ejecución muestra:
- Items creados
- Items actualizados
- Items eliminados
- Errores (si los hay)

### Reejecutar Sincronización
Si algo falla:
1. Ve a Actions en GitHub
2. Selecciona "Sync to SharePoint"
3. Haz clic en "Run workflow"
4. Revisa los logs

### Actualizar Credenciales
Si caducan las credenciales de Azure:
1. Renueva el Client Secret en Azure
2. Actualiza AZURE_CLIENT_SECRET en GitHub Secrets
3. La siguiente sincronización funcionará

---

## 📞 TROUBLESHOOTING

| Problema | Causa | Solución |
|----------|-------|----------|
| "Unauthorized" en Action | Credenciales incorrectas | Verifica que los secretos sean correctos en GitHub |
| "List not found" | Site ID o List ID incorrectos | Verifica IDs en SharePoint URL |
| "Items no aparecen en SharePoint" | Columnas mal nombradas | Verifica que las columnas tengan exactamente estos nombres: Proyecto, Cluster, Subgerente, Cargo, Nombre, Correo, Teléfono, Teams, Foto |
| "Script no se ejecuta" | Archivo no está en .github/workflows/ | Verifica que sync-sharepoint.yml esté en ruta correcta |
| "Token expiration error" | Client Secret expirado | Renueva el secret en Azure |

---

## 🚀 PRÓXIMOS PASOS

1. ✅ Crear App Registration en Azure
2. ✅ Crear lista en SharePoint
3. ✅ Guardar secretos en GitHub
4. ✅ Ejecutar primer sync
5. 📊 Verificar datos en SharePoint
6. 🔄 Hacer cambios en data.js y verificar sincronización
7. 📈 Expandir con más campos si es necesario
