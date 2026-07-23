import CONFIG from './config.js';
import Utils from './utils.js';

class API {
  constructor() {
    this.baseUrl = this.getBaseUrl();
  }

  getBaseUrl() {
    const { hostname, pathname } = window.location;

    if (hostname.includes('github.io')) {
      const repoName = pathname.split('/')[1] || '';
      return `/${repoName}`;
    }

    return '';
  }

  async fetch(url) {
    const cacheKey = `api_${url}`;
    const cached = Utils.getCache(cacheKey);

    if (cached) {
      return cached;
    }

    try {
      const fullUrl = this.baseUrl + url;
      console.log(`Fetching: ${fullUrl}`);

      const response = await fetch(fullUrl, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} for URL: ${fullUrl}`);
      }

      const data = await response.json();

      if (CONFIG.CACHE.ENABLED) {
        Utils.setCache(cacheKey, data, CONFIG.CACHE.DURATION);
      }

      return data;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      throw error;
    }
  }

  async getResponsables() {
    return this.fetch(CONFIG.API.RESPONSABLES);
  }

  async getProyectos() {
    return this.fetch(CONFIG.API.PROYECTOS);
  }

  async getCargos() {
    return this.fetch(CONFIG.API.CARGOS);
  }

  async getAllData() {
    try {
      const [responsables, proyectos, cargos] = await Promise.all([
        this.getResponsables(),
        this.getProyectos(),
        this.getCargos(),
      ]);

      return {
        responsables: responsables.responsables,
        proyectos: proyectos.proyectos,
        cargos: cargos.cargos,
      };
    } catch (error) {
      console.error('Error loading all data:', error);
      throw error;
    }
  }
}

export default new API();
