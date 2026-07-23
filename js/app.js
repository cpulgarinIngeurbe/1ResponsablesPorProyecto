import CONFIG from './config.js';
import API from './api.js';
import Utils from './utils.js';
import Filters from './filters.js';
import Search from './search.js';
import Cards from './cards.js';
import Notifications from './notifications.js';

class App {
  constructor() {
    this.data = null;
    this.allResponsables = [];
    this.filteredResponsables = [];
  }

  async init() {
    try {
      this.showLoading();
      await this.loadData();
      this.setupEventListeners();
      this.render();
      this.updateIndicators();
    } catch (error) {
      console.error('Error initializing app:', error);
      Notifications.error('Error al cargar los datos. Por favor, recarga la página.');
    }
  }

  async loadData() {
    this.data = await API.getAllData();
    this.allResponsables = this.data.responsables || [];
    this.filteredResponsables = [...this.allResponsables];
  }

  setupEventListeners() {
    // Search
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener(
        'input',
        Utils.debounce((e) => {
          Search.setSearchTerm(e.target.value);
          this.applyFilters();
        }, CONFIG.FILTERS.DEBOUNCE_DELAY)
      );
    }

    // Filters
    const proyectoFilter = document.getElementById('filter-proyecto');
    const cargoFilter = document.getElementById('filter-cargo');
    const estadoFilter = document.getElementById('filter-estado');

    if (proyectoFilter) {
      proyectoFilter.addEventListener('change', (e) => {
        Filters.setProyecto(e.target.value);
        this.applyFilters();
      });
    }

    if (cargoFilter) {
      cargoFilter.addEventListener('change', (e) => {
        Filters.setCargo(e.target.value);
        this.applyFilters();
      });
    }

    if (estadoFilter) {
      estadoFilter.addEventListener('change', (e) => {
        Filters.setEstado(e.target.value);
        this.applyFilters();
      });
    }
  }

  applyFilters() {
    let results = [...this.allResponsables];
    results = Filters.filter(results);
    results = Search.filter(results);
    this.filteredResponsables = results;
    this.render();
  }

  updateIndicators() {
    const totalResponsables = this.allResponsables.length;
    const totalProyectos = new Set(
      this.allResponsables.map((r) => r.proyecto)
    ).size;
    const totalCargos = new Set(
      this.allResponsables.map((r) => r.cargo)
    ).size;
    const activosResponsables = this.allResponsables.filter(
      (r) => r.estado === 'activo'
    ).length;

    document.getElementById('indicator-total-responsables').textContent =
      totalResponsables;
    document.getElementById('indicator-total-proyectos').textContent =
      totalProyectos;
    document.getElementById('indicator-total-cargos').textContent = totalCargos;
    document.getElementById('indicator-activos-responsables').textContent =
      activosResponsables;
  }

  populateFilters() {
    // Populate proyecto filter
    const proyectoFilter = document.getElementById('filter-proyecto');
    if (proyectoFilter && this.data.proyectos) {
      const options = this.data.proyectos.map(
        (p) => `<option value="${p.nombre}">${p.nombre}</option>`
      );
      proyectoFilter.innerHTML =
        '<option value="">Todos los proyectos</option>' + options.join('');
    }

    // Populate cargo filter
    const cargoFilter = document.getElementById('filter-cargo');
    if (cargoFilter && this.data.cargos) {
      const cargosUnicos = [
        ...new Set(this.allResponsables.map((r) => r.cargo)),
      ];
      const options = cargosUnicos.map(
        (c) => `<option value="${c}">${c}</option>`
      );
      cargoFilter.innerHTML =
        '<option value="">Todos los cargos</option>' + options.join('');
    }

    // Populate estado filter
    const estadoFilter = document.getElementById('filter-estado');
    if (estadoFilter) {
      estadoFilter.innerHTML = `
        <option value="">Todos los estados</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      `;
    }
  }

  render() {
    const cardsContainer = document.getElementById('cards-container');
    if (!cardsContainer) return;

    cardsContainer.innerHTML = Cards.renderCards(this.filteredResponsables);
    this.populateFilters();
  }

  showLoading() {
    const cardsContainer = document.getElementById('cards-container');
    if (cardsContainer) {
      cardsContainer.innerHTML = Cards.renderSkeleton();
    }
  }
}

// Initialize app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    app.init();
  });
} else {
  const app = new App();
  app.init();
}

export default App;
