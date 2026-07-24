// Clústeres (Zonas)
// Agregar los clústeres que necesites aquí. Ejemplo:
// const CLUSTERS = [
//     { id: 1, nombre: "Clúster Norte", ubicacion: "Zona Residencial Norte" },
//     { id: 2, nombre: "Clúster Centro", ubicacion: "Zona Centro" },
//     { id: 3, nombre: "Clúster Sur", ubicacion: "Zona Residencial Sur" }
// ];
const CLUSTERS = [
    { id: 1, nombre: "Robles", ubicacion: "Zona Norte" },
    { id: 2, nombre: "LIVING", ubicacion: "Zona LIVING" },
    { id: 3, nombre: "Occidente", ubicacion: "Zona Occidente" },
    { id: 4, nombre: "Américas", ubicacion: "Zona Américas" }
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
    },
    {
        id: 2,
        nombre: " Arq. Fabio Galan Pulido",
        foto: "assets/photos/subgerentes/Subgerente2.png",
        correo: "fgalan@ingeurbe.com",
        telefono: "+57 300 0000002",
        teams: "fgalan@ingeurbe.com"
    },
    {
        id: 3,
        nombre: "Ing. Rosa Esperanza Almanza Pulido",
        foto: "assets/photos/subgerentes/Subgerente3.png",
        correo: "ralmanza@ingeurbe.com",
        telefono: "+57 300 0000003",
        teams: "ralmanza@ingeurbe.com"
    }
];

// Proyectos con logos, subgerente y clúster asignado
// cluster_id: null si no pertenece a ningún clúster (aparecerá sin agrupar)
const PROYECTOS = [
    { nombre: 'FLORA', logo: 'assets/logos/FLORA.png', subgerente_id: 1, cluster_id: 1 },
    { nombre: 'CORTTEZA', logo: 'assets/logos/CORTTEZA.png', subgerente_id: 1, cluster_id: 1 },
    { nombre: 'ALBURA', logo: 'assets/logos/ALBURA.png', subgerente_id: 1, cluster_id: 1 },
    { nombre: '53LIVING', logo: 'assets/logos/53LIVING.png', subgerente_id: 1, cluster_id: 2 },
    { nombre: 'VIALE26', logo: 'assets/logos/VIALE26.png', subgerente_id: 2, cluster_id: 3 },
    { nombre: 'NATIVA', logo: 'assets/logos/NATIVA.png', subgerente_id: 3, cluster_id: 4 }
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
    },
    'FLORA_Residente-2_Christian-David-Arevalo-Hernandez.png': {
        correo: 'carevalo@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'carevalo@construccion.com.co'
    },
    'FLORA_Residente-3_Andres-Felipe-Rubio-Collazos.png': {
        correo: 'frubio@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'frubio@construccion.com.co'
    },
    'FLORA_Administrativo-1_Laura-Ximena-Castro.png': {
        correo: 'lcastro@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'lcastro@construccion.com.co'
    },
    'FLORA_Residente-de-Control_César-Augusto-Triviño-Oviedo.png': {
        correo: 'ctrivino@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ctrivino@construccion.com.co'
    },
    'FLORA_Residente-BIM_Julian-Acosta.png': {
        correo: 'jacosta@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jacosta@construccion.com.co'
    },
    'FLORA_Almacenista_Jorge-Luis-Tejeda-Ferrer.png': {
        correo: 'jtejeda@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jtejeda@construccion.com.co'
    },
    'FLORA_Residente-S.S.T._Edwin-Alexander-Caviedes-Martinez.png': {
        correo: 'ecaviedes@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ecaviedes@construccion.com.co'
    },
    'CORTTEZA_Director_Alejandra-Balcero-Ramirez.png': {
        correo: 'abalcero@ingeurbe.com',
        telefono: '+57 300 0000000',
        teams: 'abalcero@ingeurbe.com'
    },
    'CORTTEZA_Almacenista_Ezequiel-Francisco-Oyola-Gonzalez.png': {
        correo: 'eoyola@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'eoyola@construccion.com.co'
    },
    'CORTTEZA_Residente-BIM_Julian-Andres-Varon-Polania.png': {
        correo: 'jvaron@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jvaron@construccion.com.co'
    },
    'CORTTEZA_Residente-de-obra_Arnol-Andres-Pastrana-Buelvas.png': {
        correo: 'pastrana@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'pastrana@construccion.com.co'
    },
    '53LIVING_Director_Alejandra-Balcero-Ramirez.png': {
        correo: 'abalcero@ingeurbe.com',
        telefono: '+57 300 0000000',
        teams: 'abalcero@ingeurbe.com'
    },
    '53LIVING_Residente-1_Ivonne-Astrid-Cubides-Vega.png': {
        correo: 'icubides@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'icubides@construccion.com.co'
    },
    '53LIVING_Residente-2_Ana-Londoño-Diaz.png': {
        correo: 'alondono@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'alondono@construccion.com.co'
    },
    '53LIVING_Administrativo-1_Martha-Cecilia-Olarte-Linares.png': {
        correo: 'molarte@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'molarte@construccion.com.co'
    },
    'VIALE26_Director_Natalia-Avila.png': {
        correo: 'navila@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'navila@construccion.com.co'
    },
    'VIALE26_Residente-1_Rubén-Dario-Avellaneda-Mantilla.png': {
        correo: 'ravellaneda@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ravellaneda@construccion.com.co'
    },
    'VIALE26_Residente-2_Diana-Marcela-Reina-Torres.png': {
        correo: 'dreina@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'dreina@construccion.com.co'
    },
    'VIALE26_Residente-3_Luis-Alejandro-Rivera-Herrera.png': {
        correo: 'lrivera@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'lrivera@construccion.com.co'
    },
    'VIALE26_Administrativo-1_Erika-Fernanda-Perdomo.png': {
        correo: 'eperdomo@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'eperdomo@construccion.com.co'
    },
    'VIALE26_Residente-de-Control_Jose-Leonardo-Escobar-Rico.png': {
        correo: 'jescobar@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jescobar@construccion.com.co'
    },
    'VIALE26_Residente-BIM_Jose-Del-Castillo.png': {
        correo: 'jdelcastillo@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jdelcastillo@construccion.com.co'
    },
    'VIALE26_Almacenista_Javier-Valencia.png': {
        correo: 'jvalencia@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jvalencia@construccion.com.co'
    },
    'VIALE26_Residente-S.S.T._Erika-Andrea-Pardo-Arbelaez.png': {
        correo: 'epardo@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'epardo@construccion.com.co'
    },
    'ALBURA_Director_Luis-Fernando-Garzón.png': {
        correo: 'fgarzon@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'fgarzon@construccion.com.co'
    },
    'ALBURA_Residente-1_Miguel-Ángel-Gamboa-Bran.png': {
        correo: 'mgamboa@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'mgamboa@construccion.com.co'
    },
    'ALBURA_Residente-2_Fabian-David-Avila.png': {
        correo: 'favila@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'favila@construccion.com.co'
    },
    'ALBURA_Administrativo-1_Juan-David-Plazas-Galindo.png': {
        correo: 'jplazas@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jplazas@construccion.com.co'
    },
    'ALBURA_Almacenista_Cristian-Alberto-Satazar-Sandoval.png': {
        correo: 'csatazar@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'csatazar@construccion.com.co'
    },
    'ALBURA_Residente-BIM_Juan-Pablo-Castaneda-Santana.png': {
        correo: 'jcastaneda@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'jcastaneda@construccion.com.co'
    },
    'ALBURA_Residente-de-Control_Fredy-Yamid-Padilla-Silva.png': {
        correo: 'fpadilla@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'fpadilla@construccion.com.co'
    },
    'NATIVA_Director_Camilo-Andres-Gomez-Otero.png': {
        correo: 'cgomez@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'cgomez@construccion.com.co'
    },
    'NATIVA_Residente-1_Luis-Carlos-Gomez.png': {
        correo: 'lgomez@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'lgomez@construccion.com.co'
    },
    'NATIVA_Residente-2_Laura-Tatiana-Iorres-Lopez.png': {
        correo: 'ltorres@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ltorres@construccion.com.co'
    },
    'NATIVA_Residente-3_Edwin-Fabian-Casas-Segura.png': {
        correo: 'ecasas@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ecasas@construccion.com.co'
    },
    'NATIVA_Residente-4_Sebastian-Davila-Sanchez.png': {
        correo: 'sdavila@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'sdavila@construccion.com.co'
    },
    'NATIVA_Administrativo-1_Ivan-Dario-Fruquer-Buitrago.png': {
        correo: 'ifruquer@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ifruquer@construccion.com.co'
    },
    'NATIVA_Residente-de-Control_David-Mauricio-Riaño-Beltran.png': {
        correo: 'driano@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'driano@construccion.com.co'
    },
    'NATIVA_Almacenista_Elvina-Cardona.png': {
        correo: 'ecardona@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ecardona@construccion.com.co'
    },
    'NATIVA_Residente-BIM_William-Moreno.png': {
        correo: 'wmoreno@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'wmoreno@construccion.com.co'
    },
    'NATIVA_Residente-S.S.T._Diana-Alexandra-Colorado-Chica.png': {
        correo: 'dcolorado@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'dcolorado@construccion.com.co'
    },
    'NATIVA_Inspector-1_Yeimi-Alejandra-Mora-Mora.png': {
        correo: 'ymora@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'ymora@construccion.com.co'
    },
    'NATIVA_Inspector-2_Sandra-Milena-Ospino-Verbel.png': {
        correo: 'sospino@construccion.com.co',
        telefono: '+57 300 0000000',
        teams: 'sospino@construccion.com.co'
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
    'FLORA_Director_Viviana-Marcela-Hoyos-Bonilla.png',
    'FLORA_Residente-1_Daniela-Tellez-Gaviria.png',
    'FLORA_Residente-2_Christian-David-Arevalo-Hernandez.png',
    'FLORA_Residente-3_Andres-Felipe-Rubio-Collazos.png',
    'FLORA_Administrativo-1_Laura-Ximena-Castro.png',
    'FLORA_Residente-de-Control_César-Augusto-Triviño-Oviedo.png',
    'FLORA_Residente-BIM_Julian-Acosta.png',
    'FLORA_Almacenista_Jorge-Luis-Tejeda-Ferrer.png',
    'FLORA_Residente-S.S.T._Edwin-Alexander-Caviedes-Martinez.png',

    // CORTTEZA
    'CORTTEZA_Director_Alejandra-Balcero-Ramirez.png',
    'CORTTEZA_Almacenista_Ezequiel-Francisco-Oyola-Gonzalez.png',
    'CORTTEZA_Residente-BIM_Julian-Andres-Varon-Polania.png',
    'CORTTEZA_Residente-de-obra_Arnol-Andres-Pastrana-Buelvas.png',

    // 53LIVING
    '53LIVING_Director_Alejandra-Balcero-Ramirez.png',
    '53LIVING_Residente-1_Ivonne-Astrid-Cubides-Vega.png',
    '53LIVING_Residente-2_Ana-Londoño-Diaz.png',
    '53LIVING_Administrativo-1_Martha-Cecilia-Olarte-Linares.png',

    // VIALE26
    'VIALE26_Director_Natalia-Avila.png',
    'VIALE26_Residente-1_Rubén-Dario-Avellaneda-Mantilla.png',
    'VIALE26_Residente-2_Diana-Marcela-Reina-Torres.png',
    'VIALE26_Residente-3_Luis-Alejandro-Rivera-Herrera.png',
    'VIALE26_Administrativo-1_Erika-Fernanda-Perdomo.png',
    'VIALE26_Residente-de-Control_Jose-Leonardo-Escobar-Rico.png',
    'VIALE26_Residente-BIM_Jose-Del-Castillo.png',
    'VIALE26_Almacenista_Javier-Valencia.png',
    'VIALE26_Residente-S.S.T._Erika-Andrea-Pardo-Arbelaez.png',

    // ALBURA
    'ALBURA_Director_Luis-Fernando-Garzón.png',
    'ALBURA_Residente-1_Miguel-Ángel-Gamboa-Bran.png',
    'ALBURA_Residente-2_Fabian-David-Avila.png',
    'ALBURA_Administrativo-1_Juan-David-Plazas-Galindo.png',
    'ALBURA_Almacenista_Cristian-Alberto-Satazar-Sandoval.png',
    'ALBURA_Residente-BIM_Juan-Pablo-Castaneda-Santana.png',
    'ALBURA_Residente-de-Control_Fredy-Yamid-Padilla-Silva.png',

    // NATIVA
    'NATIVA_Director_Camilo-Andres-Gomez-Otero.png',
    'NATIVA_Residente-1_Luis-Carlos-Gomez.png',
    'NATIVA_Residente-2_Laura-Tatiana-Iorres-Lopez.png',
    'NATIVA_Residente-3_Edwin-Fabian-Casas-Segura.png',
    'NATIVA_Residente-4_Sebastian-Davila-Sanchez.png',
    'NATIVA_Administrativo-1_Ivan-Dario-Fruquer-Buitrago.png',
    'NATIVA_Residente-de-Control_David-Mauricio-Riaño-Beltran.png',
    'NATIVA_Almacenista_Elvina-Cardona.png',
    'NATIVA_Residente-BIM_William-Moreno.png',
    'NATIVA_Residente-S.S.T._Diana-Alexandra-Colorado-Chica.png',
    'NATIVA_Inspector-1_Yeimi-Alejandra-Mora-Mora.png',
    'NATIVA_Inspector-2_Sandra-Milena-Ospino-Verbel.png',
];
