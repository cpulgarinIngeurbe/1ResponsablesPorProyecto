# Directorio de Responsables

Aplicación simple para gestionar y consultar el directorio de responsables por proyecto.

## 🚀 Cómo Usar

### 1. Subir Fotografías

Las fotos deben ir en la carpeta `assets/photos/` con el siguiente formato de nombre:

```
Proyecto_Cargo_Nombre.png
```

**Ejemplos:**
- `VIALE_Director_Manuel-Perez.png`
- `FLORA_Residente-1_Carlos-Ruiz.png`
- `ALBURA_Residente-BIM_Juan-Garcia.png`

**Notas:**
- Usa guiones `-` para espacios en los nombres
- Los cargos deben ser uno de los estándar definidos
- Formato: PNG, JPG o WebP

### 2. Agregar a la Lista

Abre `js/data.js` y agrega el nombre del archivo al array `FOTOS`:

```javascript
const FOTOS = [
    'VIALE_Director_Manuel-Perez.png',
    'FLORA_Residente-1_Carlos-Ruiz.png',
    // Agregar más aquí
];
```

### 3. Publicar

Haz `git push` y GitHub Pages se actualiza automáticamente.

---

## 📋 Cargos Estándar

- Director
- Residente 1
- Residente 2
- Residente 3
- Residente 4
- Administrativo 1
- Administrativo 2
- Administrativo 3
- Residente BIM
- Residente de Control
- Almacenista
- Residente S.S.T.

---

## 🏗️ Proyectos

- VIALE
- ALBURA
- FLORA

---

## 📂 Estructura

```
.
├── index.html
├── js/
│   ├── data.js      (Proyectos, cargos y lista de fotos)
│   └── app.js       (Lógica principal)
├── assets/photos/   (Todas las fotos)
└── README.md
```

---

## ⚡ Características

✅ Filtrado por proyecto  
✅ Búsqueda automática en tarjetas  
✅ Responsive (móvil, tablet, desktop)  
✅ Sin dependencias  
✅ Botones para correo, llamada, WhatsApp  

---

**Última actualización:** 2026-07-23
