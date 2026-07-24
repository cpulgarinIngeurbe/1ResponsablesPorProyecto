// Clústeres (Zonas)
// Agregar los clústeres que necesites aquí. Ejemplo:
// const CLUSTERS = [
//     { id: 1, nombre: "Clúster Norte", ubicacion: "Zona Residencial Norte" },
//     { id: 2, nombre: "Clúster Centro", ubicacion: "Zona Centro" },
//     { id: 3, nombre: "Clúster Sur", ubicacion: "Zona Residencial Sur" }
// ];
const CLUSTERS = [
    { id: 1, nombre: "Robles", ubicacion: "Zona Norte" }

    
];

// Subgerentes
const SUBGERENTES = [
    {
        id: 1,
        nombre: "Ing. Diego Alejandro Robles Fonseca",
        foto: "assets/photos/subgerentes/Subgerente1.png",
        correo: "drobles@ingeurbe.com",
        telefono: "+57 300 0000001",
        teams: "drobles@ingeurbe.com"
    }

];

// Proyectos con logos, subgerente y clúster asignado
// cluster_id: null si no pertenece a ningún clúster (aparecerá sin agrupar)
const PROYECTOS = [
    { nombre: 'FLORA', logo: 'assets/logos/FLORA.png', subgerente_id: 1, cluster_id: 1 }
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
  
    'FLORA_Director_Viviana-Marcela-Hoyos-Bonilla.png': {
        correo: 'vhoyos@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'vhoyos@construccion.com.co'
    },
    'FLORA_Residente-1_Daniela-Tellez-Gaviria.png': {
        correo: 'dtellez@construccion.com.co',
        telefono: '+57 317 3334444',
        teams: 'dtellez@construccion.com.co'
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
