# Directorio de Responsables por Proyecto

Aplicación moderna para consultar y gestionar el directorio de responsables de proyectos de construcción. Desarrollada con HTML5, CSS3 y JavaScript vanilla, hospedada en GitHub Pages.

## 🚀 Características

- ✅ **Dashboard con indicadores** - Visualiza estadísticas en tiempo real
- 🔍 **Búsqueda inteligente** - Busca por nombre, correo o teléfono
- 🎯 **Filtros avanzados** - Filtra por proyecto, cargo y estado
- 📱 **Responsive** - Funciona perfectamente en desktop, tablet y móvil
- 🎨 **Diseño premium** - Interfaz moderna y elegante
- ⚡ **Rendimiento** - Carga rápida con lazy loading
- 🔗 **Acciones directas** - Envía correos, llamadas y mensajes WhatsApp
- 🚀 **GitHub Pages** - Publicación automática con GitHub Actions

## 📋 Estructura del Proyecto

```
.
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos principales
│   ├── variables.css      # Variables de diseño
│   ├── animations.css     # Animaciones
│   └── responsive.css     # Media queries
├── js/
│   ├── app.js             # Lógica principal
│   ├── api.js             # Carga de datos
│   ├── filters.js         # Lógica de filtros
│   ├── search.js          # Búsqueda
│   ├── cards.js           # Renderizado de tarjetas
│   ├── utils.js           # Utilidades
│   ├── config.js          # Configuración
│   └── notifications.js   # Notificaciones
├── data/
│   ├── responsables.json  # Base de datos
│   ├── proyectos.json     # Proyectos
│   └── cargos.json        # Cargos disponibles
├── assets/photos/         # Fotografías organizadas por proyecto
│   ├── Flora/
│   ├── Albura/
│   ├── Madero/
│   ├── Piazza/
│   └── Reserva/
└── .github/workflows/
    └── deploy.yml         # Workflow de GitHub Actions
```

## 🔧 Cómo Agregar o Editar Responsables

### 1. Editar datos en GitHub web

1. Ve a la carpeta `data/`
2. Haz clic en `responsables.json`
3. Haz clic en el icono de editar (lápiz)
4. Realiza los cambios necesarios
5. Haz commit con un mensaje descriptivo

### 2. Agregar fotografías

1. Ve a la carpeta `assets/photos/[PROYECTO]/`
2. Haz clic en "Add file" → "Upload files"
3. Selecciona la fotografía (preferiblemente en formato WebP)
4. Nombra el archivo: `NombreApellido.webp`
5. Haz commit

### 3. Actualizar el JSON de responsables

Una vez subida la foto, edita `data/responsables.json` y agrega:

```json
{
  "id": 7,
  "nombre": "Tu Nombre Completo",
  "proyecto": "Flora",
  "cargo": "Tu Cargo",
  "correo": "tu.email@ingeurbe.com",
  "telefono": "+57 XXX XXXXXXX",
  "foto": "assets/photos/Flora/NombreApellido.webp",
  "estado": "activo"
}
```

## 🌍 Publicación Automática

Cuando hagas **push** a las ramas `main` o `master`:

1. ✅ GitHub Actions valida los archivos JSON
2. ✅ Construye la aplicación
3. ✅ Publica automáticamente en GitHub Pages

La aplicación estará disponible en: `https://tu-usuario.github.io/1ResponsablesPorProyecto`

## 📱 Campos en responsables.json

| Campo | Tipo | Requerido | Ejemplo |
|-------|------|-----------|---------|
| id | número | ✅ | 1 |
| nombre | texto | ✅ | "Juan Pérez García" |
| proyecto | texto | ✅ | "Flora" |
| cargo | texto | ✅ | "Gerente de Obra" |
| correo | email | ✅ | "juan.perez@ingeurbe.com" |
| telefono | texto | ✅ | "+57 312 1234567" |
| foto | ruta | ✅ | "assets/photos/Flora/JuanPerez.webp" |
| estado | texto | ✅ | "activo" \| "inactivo" |

## 🎨 Personalización

### Cambiar colores

Edita `css/variables.css`:

```css
:root {
  --primary: #3b82f6;      /* Color principal */
  --success: #10b981;      /* Verde */
  --warning: #f59e0b;      /* Amarillo */
  --danger: #ef4444;       /* Rojo */
}
```

### Agregar nuevos proyectos

Edita `data/proyectos.json`:

```json
{
  "id": 6,
  "nombre": "Nuevo Proyecto",
  "color": "#FF6B6B",
  "estado": "activo"
}
```

Luego crea la carpeta: `assets/photos/NuevoProyecto/`

## ⚙️ Configuración

Edita `js/config.js` para:

- Cambiar rutas de archivos
- Ajustar duraciones de caché
- Modificar delays de debounce
- Configurar items por página

## 🚀 Rendimiento

- **Lazy Loading**: Las imágenes se cargan solo cuando son visibles
- **Caché**: Los datos se cachean en localStorage por 5 minutos
- **Debounce**: La búsqueda se debouncea para evitar excesivas operaciones
- **Validación JSON**: GitHub Actions valida antes de desplegar

## 📱 Responsive

| Breakpoint | Columnas | Dispositivo |
|------------|----------|-------------|
| < 640px | 1 | Móvil |
| 640px - 1023px | 2 | Tablet |
| 1024px - 1279px | 3 | Laptop |
| ≥ 1280px | 4 | Desktop |

## ♿ Accesibilidad

- ✅ Cumple WCAG 2.1 nivel AA
- ✅ Navegación por teclado completa
- ✅ Contraste de colores adecuado
- ✅ Texto alternativo en imágenes
- ✅ Etiquetas ARIA semánticas

## 🔒 Seguridad

- ✅ No requiere autenticación ni tokens en el frontend
- ✅ Todos los datos se servem desde GitHub Pages estáticamente
- ✅ Validación de JSON en el servidor
- ✅ Sin dependencias externas de terceros
- ✅ Política CORS segura

## 📊 Indicadores del Dashboard

- **Total Responsables**: Suma de todos los responsables
- **Proyectos**: Cantidad de proyectos únicos
- **Cargos**: Cantidad de cargos únicos
- **Activos**: Responsables con estado "activo"

## 🐛 Troubleshooting

### Las imágenes no cargan

1. Verifica que el archivo exista en `assets/photos/[PROYECTO]/`
2. Revisa que la ruta en el JSON sea correcta
3. Asegúrate de que el nombre del archivo sea exacto (case-sensitive)

### Los cambios no se reflejan

1. Verifica que el JSON sea válido (GitHub Actions lo valida)
2. Espera a que GitHub Actions termine el deploy
3. Limpia el caché del navegador (Ctrl+Shift+Delete)
4. Abre en incógnito si persiste el problema

### El JSON está inválido

1. Usa un validador: https://jsonlint.com/
2. Asegúrate de:
   - Comillas dobles (no simples)
   - Comas entre propiedades
   - Sin comas al final de arrays/objetos

## 📝 Licencia

Proyecto privado de Ingeurbe.

## 👥 Equipo

Desarrollado por el equipo de tecnología de Ingeurbe.

---

**Última actualización**: 2026-07-23
