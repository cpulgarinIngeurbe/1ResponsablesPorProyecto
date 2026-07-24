// Clústeres (Zonas)
// Agregar los clústeres que necesites aquí. Ejemplo:
// const CLUSTERS = [
//     { id: 1, nombre: "Clúster Norte", ubicacion: "Zona Residencial Norte" },
//     { id: 2, nombre: "Clúster Centro", ubicacion: "Zona Centro" },
//     { id: 3, nombre: "Clúster Sur", ubicacion: "Zona Residencial Sur" }
// ];
const CLUSTERS = [];

// Subgerentes
const SUBGERENTES = [
    {
        id: 1,
        nombre: "Ejemplo Subgerente 1",
        foto: "assets/photos/subgerentes/Subgerente1.png",
        correo: "subgerente1@ingeurbe.com",
        telefono: "+57 300 0000001",
        teams: "@subgerente1"
    },
    {
        id: 2,
        nombre: "Ejemplo Subgerente 2",
        foto: "assets/photos/subgerentes/Subgerente2.png",
        correo: "subgerente2@ingeurbe.com",
        telefono: "+57 300 0000002",
        teams: "@subgerente2"
    }
];

// Proyectos con logos, subgerente y clúster asignado
// cluster_id: null si no pertenece a ningún clúster (aparecerá sin agrupar)
const PROYECTOS = [
    { nombre: 'VIALE', logo: 'assets/logos/VIALE.png', subgerente_id: 1, cluster_id: null },
    { nombre: 'ALBURA', logo: 'assets/logos/ALBURA.png', subgerente_id: 2, cluster_id: null },
    { nombre: 'FLORA', logo: 'assets/logos/FLORA.png', subgerente_id: 1, cluster_id: null }
];

// Obtener solo nombres para compatibilidad
const PROYECTOS_NOMBRES = PROYECTOS.map(p => p.nombre);

// Cargos estándar
const CARGOS = [
    'Director',
    'Residente 1',
    'Residente 2',
    'Residente 3',
    'Residente 4',
    'Administrativo 1',
    'Administrativo 2',
    'Administrativo 3',
    'Residente BIM',
    'Residente de Control',
    'Almacenista',
    'Residente S.S.T.'
];

// Lista de fotos con información adicional (opcional)
// Formato base: "Proyecto_Cargo_Nombre.png"
// Puedes agregar: correo, telefono, teams, etc.
const RESPONSABLES_INFO = {
    'VIALE_Director_Manuel-Perez.png': {
        correo: 'manuel.perez@ingeurbe.com',
        telefono: '+57 312 1234567',
        teams: '@manuel.perez'
    },
    'VIALE_Residente-1_Carlos-Ruiz.png': {
        correo: 'carlos.ruiz@ingeurbe.com',
        telefono: '+57 315 9876543',
        teams: '@carlos.ruiz'
    },
    'ALBURA_Director_Juan-Garcia.png': {
        correo: 'juan.garcia@ingeurbe.com',
        telefono: '+57 318 5551234',
        teams: '@juan.garcia'
    },
    'ALBURA_Residente-1_Roberto-Santos.png': {
        correo: 'roberto.santos@ingeurbe.com',
        telefono: '+57 321 7778888',
        teams: '@roberto.santos'
    },
    'FLORA_Director_Maria-Gonzalez.png': {
        correo: 'maria.gonzalez@ingeurbe.com',
        telefono: '+57 318 5551234',
        teams: '@maria.gonzalez'
    },
    'FLORA_Residente-1_Fernando-Lopez.png': {
        correo: 'fernando.lopez@ingeurbe.com',
        telefono: '+57 317 3334444',
        teams: '@fernando.lopez'
    }
};

// Lista simple de fotos (si no especificas info arriba, se genera automáticamente)
const FOTOS = [
    // VIALE
    'VIALE_Director_Natalia-Avila.png',
    'VIALE_Residente-1_Carlos-Ruiz.png',

    // ALBURA
    'ALBURA_Director_Juan-Garcia.png',
    'ALBURA_Residente-1_Roberto-Santos.png',

    // FLORA
    'FLORA_Director_Maria-Gonzalez.png',
    'FLORA_Residente-1_Fernando-Lopez.png',
];
