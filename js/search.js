import Utils from './utils.js';

class Search {
  constructor() {
    this.searchTerm = '';
    this.searchFields = ['nombre', 'correo', 'telefono'];
  }

  setSearchTerm(term) {
    this.searchTerm = term.trim();
  }

  matches(responsable) {
    if (!this.searchTerm) return true;

    return this.searchFields.some((field) =>
      Utils.matchesSearch(String(responsable[field] || ''), this.searchTerm)
    );
  }

  filter(responsables) {
    if (!this.searchTerm) return responsables;
    return responsables.filter((r) => this.matches(r));
  }
}

export default new Search();
