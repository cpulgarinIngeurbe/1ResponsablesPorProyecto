class Notifications {
  constructor() {
    this.container = null;
    this.initContainer();
  }

  initContainer() {
    if (!document.getElementById('notifications-container')) {
      const container = document.createElement('div');
      container.id = 'notifications-container';
      container.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 1000;
        max-width: 400px;
      `;
      document.body.appendChild(container);
      this.container = container;
    } else {
      this.container = document.getElementById('notifications-container');
    }
  }

  show(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px 24px;
      margin-bottom: 12px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      animation: slideInUp 250ms cubic-bezier(0.4, 0, 0.2, 1);
      border-left: 4px solid #3b82f6;
    `;

    if (type === 'success') {
      notification.style.borderLeftColor = '#10b981';
    } else if (type === 'error') {
      notification.style.borderLeftColor = '#ef4444';
    } else if (type === 'warning') {
      notification.style.borderLeftColor = '#f59e0b';
    }

    notification.textContent = message;
    this.container.appendChild(notification);

    if (duration > 0) {
      setTimeout(() => {
        notification.style.animation = 'slideInDown 250ms cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
          notification.remove();
        }, 250);
      }, duration);
    }

    return notification;
  }

  success(message, duration = 3000) {
    return this.show(message, 'success', duration);
  }

  error(message, duration = 5000) {
    return this.show(message, 'error', duration);
  }

  warning(message, duration = 3000) {
    return this.show(message, 'warning', duration);
  }

  info(message, duration = 3000) {
    return this.show(message, 'info', duration);
  }

  loading(message) {
    return this.show(message, 'info', 0);
  }
}

export default new Notifications();
