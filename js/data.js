// Proyectos
const PROYECTOS = ['VIALE', 'ALBURA', 'FLORA'];

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
    'VIALE_Director_Manuel-Perez.png',
    'VIALE_Residente-1_Carlos-Ruiz.png',

    // ALBURA
    'ALBURA_Director_Juan-Garcia.png',
    'ALBURA_Residente-1_Roberto-Santos.png',

    // FLORA
    'FLORA_Director_Maria-Gonzalez.png',
    'FLORA_Residente-1_Fernando-Lopez.png',
];
