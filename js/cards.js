import Utils from './utils.js';

class Cards {
  renderCard(responsable) {
    const statusClass = responsable.estado === 'activo' ? 'status-active' : 'status-inactive';
    const statusText = responsable.estado === 'activo' ? 'Activo' : 'Inactivo';

    return `
      <div class="card fade-in">
        <div class="card-photo-wrapper">
          <img
            src="${responsable.foto}"
            alt="${responsable.nombre}"
            class="card-photo"
            loading="lazy"
            onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><rect fill=%22%23e5e7eb%22 width=%22100%22 height=%22100%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-family=%22system-ui%22 font-size=%2224%22 fill=%22%234b5563%22>${Utils.getInitials(responsable.nombre)}</text></svg>'"
          />
        </div>

        <div class="card-info">
          <div class="card-name">${responsable.nombre}</div>
          <div class="card-cargo">${responsable.cargo}</div>
          <div class="card-project">${responsable.proyecto}</div>
        </div>

        <div class="card-contact">
          <div class="contact-item">
            <a href="mailto:${responsable.correo}" title="Enviar correo">
              ${responsable.correo}
            </a>
          </div>
          <div class="contact-item">
            <a href="tel:${responsable.telefono}" title="Llamar">
              ${responsable.telefono}
            </a>
          </div>
        </div>

        <div class="card-status ${statusClass}">
          <span class="status-dot"></span>
          ${statusText}
        </div>

        <div class="card-actions">
          <a href="mailto:${responsable.correo}" class="btn btn-secondary btn-small" title="Enviar correo">
            ✉️ Correo
          </a>
          <a href="tel:${responsable.telefono}" class="btn btn-secondary btn-small" title="Llamar por teléfono">
            📞 Llamar
          </a>
          <a href="https://wa.me/${responsable.telefono.replace(/\D/g, '')}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-small" title="Enviar mensaje por WhatsApp">
            💬 WhatsApp
          </a>
        </div>
      </div>
    `;
  }

  renderCards(responsables) {
    if (!responsables || responsables.length === 0) {
      return `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <div class="empty-state-title">No se encontraron resultados</div>
          <div class="empty-state-description">
            Intenta ajustar los filtros o la búsqueda
          </div>
        </div>
      `;
    }

    return responsables.map((r) => this.renderCard(r)).join('');
  }

  renderSkeleton(count = 4) {
    return Array(count)
      .fill(0)
      .map(
        () => `
        <div class="card skeleton skeleton-card">
          <div style="height: 100px; border-radius: 50%; margin-bottom: 16px;"></div>
          <div class="skeleton-text" style="width: 80%;"></div>
          <div class="skeleton-text" style="width: 60%;"></div>
          <div class="skeleton-text" style="width: 70%;"></div>
        </div>
      `
      )
      .join('');
  }
}

export default new Cards();
