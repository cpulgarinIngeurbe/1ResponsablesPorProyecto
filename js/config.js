const CONFIG = {
  API: {
    RESPONSABLES: './data/responsables.json',
    PROYECTOS: './data/proyectos.json',
    CARGOS: './data/cargos.json',
  },
  CACHE: {
    ENABLED: true,
    DURATION: 5 * 60 * 1000, // 5 minutos
  },
  APP: {
    NAME: 'Directorio de Responsables',
    VERSION: '1.0.0',
  },
  FILTERS: {
    DEBOUNCE_DELAY: 300,
  },
  UI: {
    ITEMS_PER_PAGE: 12,
    ANIMATION_DURATION: 250,
  },
};

export default CONFIG;
