class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static formatPhone(phone) {
    if (!phone) return '';
    return phone.replace(/\D/g, '').slice(-10);
  }

  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  static matchesSearch(text, searchTerm) {
    return this.normalizeText(text).includes(this.normalizeText(searchTerm));
  }

  static getInitials(name) {
    return name
      .split(' ')
      .map((n) => n.charAt(0).toUpperCase())
      .join('');
  }

  static formatDate(date) {
    return new Date(date).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  static pluralize(count, singular, plural) {
    return count === 1 ? singular : plural;
  }

  static getCacheKey(key) {
    return `app_cache_${key}`;
  }

  static setCache(key, value, duration = 5 * 60 * 1000) {
    const cacheKey = this.getCacheKey(key);
    const cacheData = {
      value,
      timestamp: Date.now(),
      duration,
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }

  static getCache(key) {
    const cacheKey = this.getCacheKey(key);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) return null;

    try {
      const { value, timestamp, duration } = JSON.parse(cached);
      if (Date.now() - timestamp > duration) {
        localStorage.removeItem(cacheKey);
        return null;
      }
      return value;
    } catch {
      return null;
    }
  }

  static clearCache(key = null) {
    if (key) {
      localStorage.removeItem(this.getCacheKey(key));
    } else {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('app_cache_')) {
          localStorage.removeItem(key);
        }
      });
    }
  }

  static async delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default Utils;
