# 🔧 Configuración de Sincronización con SharePoint

Este documento describe cómo configurar la sincronización automática entre GitHub (js/data.js) y SharePoint (Lista de Responsables).

---

## 📋 PASO 1: Crear App Registration en Azure

### 1.1 Acceder a Azure Portal
1. Abre: https://portal.azure.com
2. Inicia sesión con tu cuenta de Microsoft 365

### 1.2 Crear la App Registration
1. Busca "App registrations" en la barra superior
2. Haz clic en "New registration"
3. Completa los campos:
   - **Name**: `GitHub-SharePoint-Sync`
   - **Supported account types**: "Accounts in this organizational directory only"
   - **Redirect URI**: Deja vacío por ahora
4. Haz clic en "Register"

### 1.3 Obtener Credenciales
En la página de la app, copia y guarda estos valores:
```
Client ID (Application ID): [COPIAR ESTE VALOR]
Tenant ID (Directory ID): [COPIAR ESTE VALOR]
```

### 1.4 Crear Client Secret
1. En el menú izquierdo, haz clic en "Certificates & secrets"
2. Haz clic en "New client secret"
3. Description: `GitHub Sync`
4. Expires: `24 months`
5. Haz clic en "Add"
6. **IMPORTANTE**: Copia el "Value" inmediatamente (no podrás verlo después)
```
Client Secret: [COPIAR ESTE VALOR]
```

---

## 🔐 PASO 2: Configurar Permisos en Azure

### 2.1 Agregar Permisos de API
1. En el menú izquierdo, haz clic en "API permissions"
2. Haz clic en "Add a permission"
3. Selecciona "Microsoft Graph"
4. Elige "Application permissions"
5. Busca y marca estos permisos:
   - `Sites.ReadWrite.All` (para crear/actualizar items en SharePoint)
   - `Directory.Read.All` (para leer info de usuarios)

### 2.2 Conceder Consentimiento de Admin
1. Haz clic en "Grant admin consent for [Tu Org]"
2. Confirma

---

## 📊 PASO 3: Crear Lista en SharePoint

### 3.1 Acceder a SharePoint
1. Abre: https://ingeurbe.sharepoint.com/sites/AutomatizacionObras
2. Haz clic en "New" → "List"
3. Elige "Blank list"

### 3.2 Configurar Columnas
**Nombre de lista**: `Responsables`

**Columnas a crear:**
| Columna | Tipo | Requerido | Notas |
|---------|------|-----------|-------|
| Proyecto | Single line text | Sí | Ej: FLORA, VIALE26 |
| Cluster | Single line text | No | Ej: Robles, Living |
| Subgerente | Single line text | No | Nombre completo |
| Cargo | Single line text | Sí | Ej: Director, Residente 1 |
| Nombre | Single line text | Sí | Nombre del responsable |
| Correo | Email | No | email@ingeurbe.com |
| Teléfono | Single line text | No | +57 3XX XXXXXXX |
| Teams | Email | No | email@ingeurbe.com |
| Foto | Single line text | No | URL a la foto |

### 3.3 Obtener ID de la Lista
1. Abre la lista "Responsables"
2. Haz clic en "Settings" (engranaje superior derecha)
3. En la URL, copia el `ListId`:
```
https://ingeurbe.sharepoint.com/sites/AutomatizacionObras/Lists/Responsables/AllItems.aspx?Id=1
                                          ↑ SITE ID                   ↑ LIST ID
```
Guarda estos valores:
```
Site ID: [COPIAR DE LA URL]
List ID: [COPIAR DE LA URL]
```

---

## 🔑 PASO 4: Guardar Secretos en GitHub

### 4.1 Acceder a Settings del Repositorio
1. Abre: https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/settings/secrets/actions
2. Haz clic en "New repository secret"

### 4.2 Crear los Siguientes Secretos
```
Nombre: AZURE_CLIENT_ID
Valor: [Client ID de paso 1.3]

Nombre: AZURE_CLIENT_SECRET
Valor: [Client Secret de paso 2.1]

Nombre: AZURE_TENANT_ID
Valor: [Tenant ID de paso 1.3]

Nombre: SHAREPOINT_SITE_ID
Valor: [Site ID de paso 3.3]

Nombre: SHAREPOINT_LIST_ID
Valor: [List ID de paso 3.3]
```

---

## 🚀 PASO 5: Verificar Configuración

Los secretos deben estar en GitHub. La sincronización se ejecutará automáticamente cuando hagas:
```bash
git push origin main
```

El flujo `.github/workflows/sync-sharepoint.yml` se disparará y sincronizará los datos de `js/data.js` a la lista de SharePoint.

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] App Registration creada en Azure
- [ ] Client ID copiado
- [ ] Client Secret copiado
- [ ] Tenant ID copiado
- [ ] Permisos de API configurados en Azure
- [ ] Lista "Responsables" creada en SharePoint
- [ ] Columnas configuradas correctamente
- [ ] Site ID obtenido de SharePoint
- [ ] List ID obtenido de SharePoint
- [ ] 5 secretos guardados en GitHub
- [ ] Archivo `.github/workflows/sync-sharepoint.yml` creado
- [ ] Primer push a main realizado

---

## 🔍 TROUBLESHOOTING

### El Action falla con "Unauthorized"
- Verifica que los secretos estén correctamente copiados en GitHub
- Verifica que los permisos estén otorgados en Azure

### Los datos no aparecen en SharePoint
- Verifica que la lista existe y tiene el nombre "Responsables"
- Verifica que el Site ID y List ID son correctos
- Revisa los logs del Action en GitHub → Actions tab

### El Action no se ejecuta
- Verifica que `.github/workflows/sync-sharepoint.yml` esté en el repositorio
- Verifica que el archivo esté correctamente formateado (YAML)

---

## 📞 SOPORTE

Si tienes problemas en cualquier paso, revisa los logs en:
https://github.com/cpulgarinIngeurbe/1ResponsablesPorProyecto/actions
