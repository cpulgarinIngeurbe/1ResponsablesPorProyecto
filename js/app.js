class DirectorioApp {
    constructor() {
        console.log('📊 Iniciando Directorio de Responsables...');
        console.log('FOTOS cargadas:', typeof FOTOS !== 'undefined' ? FOTOS.length : 'NO DEFINIDO');
        console.log('PROYECTOS:', typeof PROYECTOS !== 'undefined' ? PROYECTOS : 'NO DEFINIDO');

        this.filtrosProyectos = [];
        this.filtrosCargos = [];
        this.responsables = [];
        this.init();
    }

    init() {
        try {
            this.parseResponsables();
            this.renderFilters();
            this.populateCargosFilter();
            this.setupEventListeners();
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
        todoBtn.id = 'btn-proyecto-todos';
        todoBtn.addEventListener('click', () => {
            this.filtrosProyectos = [];
            this.updateFilters();
            this.render();
        });
        container.appendChild(todoBtn);

        PROYECTOS.forEach(proyecto => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = proyecto;
            btn.id = `btn-proyecto-${proyecto}`;
            btn.addEventListener('click', () => {
                if (this.filtrosProyectos.includes(proyecto)) {
                    this.filtrosProyectos = this.filtrosProyectos.filter(p => p !== proyecto);
                } else {
                    this.filtrosProyectos.push(proyecto);
                }
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

            if (btn.id === 'btn-proyecto-todos' && this.filtrosProyectos.length === 0) {
                btn.classList.add('active');
            } else if (this.filtrosProyectos.includes(btn.textContent)) {
                btn.classList.add('active');
            }
        });
    }

    populateCargosFilter() {
        const menu = document.getElementById('cargo-dropdown-menu');
        if (!menu) return;

        // Agregar opción "Todos los cargos"
        const todoDiv = document.createElement('div');
        todoDiv.className = 'cargo-option selected';
        todoDiv.textContent = 'Todos los cargos';
        todoDiv.addEventListener('click', () => {
            this.filtrosCargos = [];
            this.updateCargoOptions();
            this.render();
            this.updateCargoButtonText();
        });
        menu.appendChild(todoDiv);

        // Obtener cargos únicos
        const cargosUnicos = [...new Set(this.responsables.map(r => r.cargo))].sort();

        // Crear opciones de cargos
        cargosUnicos.forEach(cargo => {
            const div = document.createElement('div');
            div.className = 'cargo-option';
            div.textContent = cargo;

            div.addEventListener('click', () => {
                if (this.filtrosCargos.includes(cargo)) {
                    this.filtrosCargos = this.filtrosCargos.filter(c => c !== cargo);
                } else {
                    this.filtrosCargos.push(cargo);
                }
                this.updateCargoOptions();
                this.render();
                this.updateCargoButtonText();
            });

            menu.appendChild(div);
        });
    }

    setupEventListeners() {
        // Dropdown de cargos
        const btn = document.getElementById('cargo-dropdown-btn');
        const menu = document.getElementById('cargo-dropdown-menu');
        const dropdown = document.getElementById('cargo-dropdown');

        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('open');
                btn.querySelector('.dropdown-arrow').classList.toggle('open');
            });

            document.addEventListener('click', (e) => {
                if (!dropdown.contains(e.target)) {
                    menu.classList.remove('open');
                    btn.querySelector('.dropdown-arrow').classList.remove('open');
                }
            });
        }

        // Botones de acciones múltiples
        const btnCorreoTodos = document.getElementById('btn-correo-todos');
        const btnTeamsTodos = document.getElementById('btn-teams-todos');

        if (btnCorreoTodos) {
            btnCorreoTodos.addEventListener('click', () => this.enviarCorreoATodos());
        }

        if (btnTeamsTodos) {
            btnTeamsTodos.addEventListener('click', () => this.copiarTeamsATodos());
        }
    }

    enviarCorreoATodos() {
        const filtrados = this.getResponsablesFiltrados();
        if (filtrados.length === 0) {
            alert('No hay responsables para enviar correo');
            return;
        }

        const correos = filtrados.map(r => r.correo).join(',');
        const asunto = 'Directorio de Responsables';
        const mailto = `mailto:?bcc=${encodeURIComponent(correos)}&subject=${encodeURIComponent(asunto)}`;
        window.location.href = mailto;
    }

    copiarTeamsATodos() {
        const filtrados = this.getResponsablesFiltrados();
        if (filtrados.length === 0) {
            alert('No hay responsables para copiar Teams');
            return;
        }

        const teamsEmails = filtrados
            .filter(r => r.teams)
            .map(r => r.teams)
            .join('; ');

        if (teamsEmails.length === 0) {
            alert('No hay emails de Teams para copiar');
            return;
        }

        navigator.clipboard.writeText(teamsEmails).then(() => {
            this.mostrarNotificacion('Emails de Teams copiados al portapapeles');
        }).catch(() => {
            alert('Error al copiar al portapapeles');
        });
    }

    mostrarNotificacion(mensaje) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: white;
            border-left: 4px solid #cddc39;
            border-radius: 6px;
            padding: 16px 24px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            font-size: 14px;
            color: #333;
            z-index: 2000;
            animation: slideInUp 250ms;
        `;
        notif.textContent = mensaje;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.animation = 'slideInDown 250ms';
            setTimeout(() => notif.remove(), 250);
        }, 3000);
    }

    updateCargoOptions() {
        const opciones = document.querySelectorAll('.cargo-option');
        opciones.forEach((opt, idx) => {
            opt.classList.remove('selected');
            if (idx === 0 && this.filtrosCargos.length === 0) {
                opt.classList.add('selected');
            } else if (idx > 0 && this.filtrosCargos.includes(opt.textContent)) {
                opt.classList.add('selected');
            }
        });
    }

    updateCargoButtonText() {
        const btn = document.getElementById('cargo-dropdown-btn');
        if (!btn) return;

        if (this.filtrosCargos.length === 0) {
            btn.innerHTML = '<span>Todos los cargos</span><span class="dropdown-arrow">▼</span>';
        } else if (this.filtrosCargos.length === 1) {
            btn.innerHTML = `<span>${this.filtrosCargos[0]}</span><span class="dropdown-arrow">▼</span>`;
        } else {
            btn.innerHTML = `<span>${this.filtrosCargos.length} cargos</span><span class="dropdown-arrow">▼</span>`;
        }
    }

    applyFilters() {
        this.render();
    }

    getResponsablesFiltrados() {
        let filtrados = this.responsables;

        // Filtro por proyectos (si hay seleccionados)
        if (this.filtrosProyectos.length > 0) {
            filtrados = filtrados.filter(r => this.filtrosProyectos.includes(r.proyecto));
        }

        // Filtro por cargos (si hay seleccionados)
        if (this.filtrosCargos.length > 0) {
            filtrados = filtrados.filter(r => this.filtrosCargos.includes(r.cargo));
        }

        return filtrados;
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
                        <img src="LogoOutlook.png" alt="Outlook" class="btn-icon">
                        <span>Correo</span>
                    </a>
                    ${responsable.teams ? `<a href="msteams://teams.microsoft.com/l/chat/0/0?users=${responsable.teams}" class="btn btn-teams" title="Abrir Teams">
                        <img src="LogoTeams.png" alt="Teams" class="btn-icon">
                        <span>Teams</span>
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
