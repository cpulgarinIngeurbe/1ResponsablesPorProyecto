class DirectorioApp {
    constructor() {
        console.log('📊 Iniciando Directorio de Responsables...');
        console.log('FOTOS cargadas:', typeof FOTOS !== 'undefined' ? FOTOS.length : 'NO DEFINIDO');
        console.log('PROYECTOS:', typeof PROYECTOS !== 'undefined' ? PROYECTOS : 'NO DEFINIDO');

        this.filtroProyecto = null;
        this.responsables = [];
        this.init();
    }

    init() {
        try {
            this.parseResponsables();
            this.renderFilters();
            this.render();
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('grid').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">❌</div>
                    <div class="empty-state-title">Error al cargar</div>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }

    parseResponsables() {
        this.responsables = FOTOS.map(foto => {
            const [proyecto, cargoParte, ...nombrePartes] = foto.replace('.png', '').split('_');
            const nombre = nombrePartes.join('_').replace(/-/g, ' ');
            const cargo = cargoParte.replace(/-/g, ' ');

            // Obtener información adicional si existe
            const infoAdicional = RESPONSABLES_INFO[foto] || {};

            return {
                foto: `assets/photos/${foto}`,
                nombre,
                cargo,
                proyecto,
                correo: infoAdicional.correo || this.generarCorreo(nombre, proyecto),
                telefono: infoAdicional.telefono || '+57 3XX XXXXXXX',
                teams: infoAdicional.teams || null
            };
        });
    }

    generarCorreo(nombre, proyecto) {
        const nombreLimpio = nombre.toLowerCase().replace(/\s+/g, '.');
        return `${nombreLimpio}@ingeurbe.com`;
    }

    renderFilters() {
        const container = document.getElementById('filters');

        const todoBtn = document.createElement('button');
        todoBtn.className = 'filter-btn active';
        todoBtn.textContent = 'Todos';
        todoBtn.addEventListener('click', () => {
            this.filtroProyecto = null;
            this.updateFilters();
            this.render();
        });
        container.appendChild(todoBtn);

        PROYECTOS.forEach(proyecto => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = proyecto;
            btn.addEventListener('click', () => {
                this.filtroProyecto = proyecto;
                this.updateFilters();
                this.render();
            });
            container.appendChild(btn);
        });
    }

    updateFilters() {
        const btns = document.querySelectorAll('.filter-btn');
        btns.forEach(btn => {
            btn.classList.remove('active');
            if (
                (this.filtroProyecto === null && btn.textContent === 'Todos') ||
                (this.filtroProyecto === btn.textContent)
            ) {
                btn.classList.add('active');
            }
        });
    }

    getResponsablesFiltrados() {
        if (!this.filtroProyecto) {
            return this.responsables;
        }
        return this.responsables.filter(r => r.proyecto === this.filtroProyecto);
    }

    render() {
        const grid = document.getElementById('grid');
        const filtrados = this.getResponsablesFiltrados();

        if (filtrados.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">🔍</div>
                    <div class="empty-state-title">No hay responsables</div>
                </div>
            `;
            return;
        }

        grid.innerHTML = filtrados.map(r => this.renderCard(r)).join('');
    }

    renderCard(responsable) {
        return `
            <div class="card">
                <img
                    src="${responsable.foto}"
                    alt="${responsable.nombre}"
                    class="card-photo"
                    onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23e5e7eb%22 width=%22100%22 height=%22100%22/></svg>'"
                />
                <div class="card-name">${responsable.nombre}</div>
                <div class="card-cargo">${responsable.cargo}</div>
                <div class="card-proyecto">${responsable.proyecto}</div>
                <div class="card-actions">
                    <a href="mailto:${responsable.correo}" class="btn btn-correo" title="Enviar correo">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="m22 7-10 5L2 7"></path>
                        </svg>
                    </a>
                    ${responsable.teams ? `<a href="msteams://teams.microsoft.com/l/chat/0/0?users=${responsable.teams}" class="btn btn-teams" title="Abrir Teams">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.5 1h-8C6.1 1 5 2.1 5 3.5v17C5 21.9 6.1 23 7.5 23h8c1.4 0 2.5-1.1 2.5-2.5v-17C18 2.1 16.9 1 15.5 1zm-4 21c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm4-4H7V4h12.5v14z"/>
                        </svg>
                    </a>` : ''}
                </div>
            </div>
        `;
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DirectorioApp();
    });
} else {
    new DirectorioApp();
}
