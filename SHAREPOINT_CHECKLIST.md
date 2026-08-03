# ✅ CHECKLIST DE CONFIGURACIÓN SHAREPOINT

## 📋 QUÉ SE HA IMPLEMENTADO

### ✨ Archivos Creados en el Repositorio

```
✅ SHAREPOINT_SETUP.md
   └─ Guía paso a paso para configurar Azure y SharePoint
   └─ Instrucciones para crear App Registration
   └─ Instrucciones para crear la lista en SharePoint
   └─ Instrucciones para guardar secretos en GitHub

✅ SHAREPOINT_ARCHITECTURE.md
   └─ Documentación técnica de toda la arquitectura
   └─ Diagrama de flujo de sincronización
   └─ Mapeamiento de campos
   └─ Casos edge y troubleshooting

✅ sync-sharepoint.js
   └─ Script Node.js que sincroniza datos
   └─ Lee js/data.js
   └─ Crea/actualiza/elimina items en SharePoint
   └─ Usa Microsoft Graph API

✅ .github/workflows/sync-sharepoint.yml
   └─ GitHub Action que se ejecuta automáticamente
   └─ Se dispara cuando hay cambios en js/data.js
   └─ Ejecuta sync-sharepoint.js
   └─ Reporta resultados
```

### 📊 Estructura de la Lista en SharePoint

**Nombre de lista**: `Responsables`

**Columnas** (crear con estos nombres exactos):
```
1. Proyecto              (Single line text) - Requerido
2. Cluster              (Single line text) - Opcional
3. Subgerente           (Single line text) - Opcional
4. Cargo                (Single line text) - Requerido
5. Nombre               (Single line text) - Requerido
6. Correo               (Email)            - Opcional
7. Teléfono             (Single line text) - Opcional
8. Teams                (Email)            - Opcional
9. Foto                 (Single line text) - Opcional (almacena URL)
```

---

## 🚀 PRÓXIMOS PASOS (TÚ DEBES HACER)

### FASE 1️⃣: CONFIGURAR AZURE (5-10 mins)

**Paso 1: Crear App Registration en Azure**
- [ ] Abre: https://portal.azure.com
- [ ] Busca "App registrations"
- [ ] Crea nueva: `GitHub-SharePoint-Sync`
- [ ] Copia y guarda: `Client ID` y `Tenant ID`

**Paso 2: Crear Client Secret**
- [ ] Ve a "Certificates & secrets"
- [ ] Crea nuevo secreto
- [ ] **IMPORTANTE**: Copia el valor inmediatamente

**Paso 3: Configurar Permisos**
- [ ] Ve a "API permissions"
- [ ] Agrega permisos: `Sites.ReadWrite.All`
- [ ] Concede consentimiento de admin

👉 **Lee el archivo `SHAREPOINT_SETUP.md` (PASO 1-2) para instrucciones detalladas**

---

### FASE 2️⃣: CONFIGURAR SHAREPOINT (5-10 mins)

**Paso 4: Crear Lista en SharePoint**
- [ ] Abre: https://ingeurbe.sharepoint.com/sites/AutomatizacionObras
- [ ] Crea nueva lista: "Responsables"
- [ ] Agrega las 9 columnas listadas arriba
- [ ] Copia `Site ID` y `List ID` de la URL

👉 **Lee el archivo `SHAREPOINT_SETUP.md` (PASO 3) para instrucciones detalladas**

---

### FASE 3️⃣: GUARDAR SECRETOS EN GITHUB (2-3 mins)

**Paso 5: Guardar 5 Secretos**
- [ ] Abre: https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/settings/secrets/actions
- [ ] Crea estos 5 secretos:

| Nombre | Valor |
|--------|-------|
| `AZURE_CLIENT_ID` | (de paso 1) |
| `AZURE_CLIENT_SECRET` | (de paso 2) |
| `AZURE_TENANT_ID` | (de paso 1) |
| `SHAREPOINT_SITE_ID` | (de paso 4) |
| `SHAREPOINT_LIST_ID` | (de paso 4) |

👉 **Lee el archivo `SHAREPOINT_SETUP.md` (PASO 4) para instrucciones detalladas**

---

### FASE 4️⃣: VERIFICAR (2-3 mins)

**Paso 6: Ejecutar Primera Sincronización**
- [ ] Abre: https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/actions
- [ ] Ve a "Sync to SharePoint"
- [ ] Haz clic en "Run workflow" → "Run workflow"
- [ ] Espera a que termine (2-3 minutos)
- [ ] Verifica que no hay errores en los logs

**Paso 7: Verificar Datos en SharePoint**
- [ ] Abre: https://ingeurbe.sharepoint.com/sites/AutomatizacionObras
- [ ] Ve a la lista "Responsables"
- [ ] Verifica que aparecen los responsables
- [ ] Verifica que los datos son correctos

---

## 🔄 FLUJO DE SINCRONIZACIÓN

Una vez configurado, cada vez que hagas cambios en `js/data.js`:

```
1. Editas js/data.js
   ↓
2. git push origin main
   ↓
3. GitHub Actions se dispara automáticamente
   ↓
4. sync-sharepoint.js se ejecuta
   ↓
5. Datos se sincronizan a SharePoint
   ↓
6. Lista "Responsables" se actualiza
```

**Tiempo de sincronización**: ~30 segundos a 2 minutos

---

## 📝 CASOS DE USO

### Agregar un responsable
```
1. Edita js/data.js
2. Agrega nombre de foto a FOTOS array
3. Agrega entrada a RESPONSABLES_INFO
4. git push origin main
5. ✅ Automáticamente aparece en SharePoint
```

### Actualizar datos de responsable
```
1. Edita RESPONSABLES_INFO en js/data.js
2. Cambia correo, teléfono, teams
3. git push origin main
4. ✅ Automáticamente se actualiza en SharePoint
```

### Eliminar responsable
```
1. Edita js/data.js
2. Elimina nombre de foto de FOTOS array
3. Elimina entrada de RESPONSABLES_INFO
4. git push origin main
5. ✅ Automáticamente se elimina de SharePoint
```

---

## 🎯 RESUMEN DEL SISTEMA

```
┌─────────────────────────────────────────────────────────────┐
│ GitHub (Fuente de Verdad)                                   │
│ ├─ js/data.js (datos maestros)                             │
│ ├─ sync-sharepoint.js (script de sincronización)           │
│ └─ .github/workflows/sync-sharepoint.yml (trigger)         │
└─────────────────────────────────────────────────────────────┘
                          ↓
                  (GitHub Actions)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ Azure (Autenticación)                                       │
│ ├─ App Registration (credenciales)                         │
│ └─ OAuth 2.0 (tokens)                                      │
└─────────────────────────────────────────────────────────────┘
                          ↓
                 (Microsoft Graph API)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│ SharePoint (Presentación)                                   │
│ ├─ Sitio: AutomatizacionObras                             │
│ └─ Lista: Responsables (47+ items)                         │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST FINAL

### Antes de comenzar
- [ ] Tienes acceso a Azure AD (microsoft.com/azure)
- [ ] Tienes acceso a SharePoint (ingeurbe.sharepoint.com)
- [ ] Tienes permisos para crear App Registrations en Azure
- [ ] Tienes permisos para crear listas en SharePoint

### Configuración Azure
- [ ] App Registration creada
- [ ] Client ID copiado
- [ ] Client Secret copiado (y guardado seguro)
- [ ] Tenant ID copiado
- [ ] Permisos API configurados
- [ ] Consentimiento de admin otorgado

### Configuración SharePoint
- [ ] Lista "Responsables" creada
- [ ] 9 columnas creadas con nombres exactos
- [ ] Site ID copiado
- [ ] List ID copiado

### Configuración GitHub
- [ ] 5 secretos guardados en Settings/Secrets
- [ ] sync-sharepoint.yml en .github/workflows/
- [ ] sync-sharepoint.js en raíz del repo
- [ ] Archivos pusheados a main

### Verificación
- [ ] Primera sincronización ejecutada sin errores
- [ ] Items aparecen en SharePoint
- [ ] Datos son correctos
- [ ] Logs se ven en GitHub Actions

---

## 📞 SOPORTE

### Si algo falla
1. Revisa los logs en: https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/actions/workflows/sync-sharepoint.yml
2. Lee la sección "TROUBLESHOOTING" en `SHAREPOINT_ARCHITECTURE.md`
3. Verifica que los secretos en GitHub estén correctamente copiados

### Documentación
- `SHAREPOINT_SETUP.md` - Guía de configuración paso a paso
- `SHAREPOINT_ARCHITECTURE.md` - Documentación técnica completa
- `sync-sharepoint.js` - Código del script (comentado)

---

## 🎉 ¡LISTO!

Una vez completados todos los pasos, tendrás:

✅ GitHub como fuente única de verdad para datos de responsables  
✅ Sincronización automática con SharePoint  
✅ Una lista en SharePoint con 47+ responsables organizados  
✅ Sistema escalable para agregar/actualizar/eliminar responsables  
✅ Historial de cambios en Git  

**¿Preguntas?** Revisa los archivos de documentación o consulta los logs del Action en GitHub. 🚀
