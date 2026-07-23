class Filters {
  constructor() {
    this.proyecto = '';
    this.cargo = '';
    this.estado = '';
  }

  setProyecto(proyecto) {
    this.proyecto = proyecto;
  }

  setCargo(cargo) {
    this.cargo = cargo;
  }

  setEstado(estado) {
    this.estado = estado;
  }

  matches(responsable) {
    if (this.proyecto && responsable.proyecto !== this.proyecto) {
      return false;
    }

    if (this.cargo && responsable.cargo !== this.cargo) {
      return false;
    }

    if (this.estado && responsable.estado !== this.estado) {
      return false;
    }

    return true;
  }

  filter(responsables) {
    return responsables.filter((r) => this.matches(r));
  }

  clear() {
    this.proyecto = '';
    this.cargo = '';
    this.estado = '';
  }

  hasFilters() {
    return this.proyecto || this.cargo || this.estado;
  }
}

export default new Filters();
