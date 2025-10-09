# Configuración de Cloudflare Turnstile

## Pasos para configurar tu sitekey:

1. **Ir a Cloudflare Dashboard:**
   - Visita: https://dash.cloudflare.com/
   - Inicia sesión o crea una cuenta

2. **Navegar a Turnstile:**
   - En el panel izquierdo, busca "Turnstile"
   - O ve directamente a: https://dash.cloudflare.com/?to=/:account/turnstile

3. **Crear un nuevo sitio:**
   - Haz clic en "Add a site"
   - Nombre del sitio: "Landing North South"
   - Dominio: tu-dominio.com (o localhost para desarrollo)
   - Widget type: "Managed (recommended)"

4. **Obtener las claves:**
   - **Site Key (público):** Esta va en el código
   - **Secret Key (privado):** Esta va en tu backend (si validas server-side)

5. **Reemplazar en el código:**
   ```jsx
   const siteKey = "TU_SITE_KEY_AQUÍ"; // Reemplaza esta línea
   ```

## Configuración para desarrollo:
- Para desarrollo local, puedes usar: `localhost`, `127.0.0.1`, o `*.localhost`
- Para producción, agrega tu dominio real

## Configuración actual:
- Archivo: `src/components/ContactForm.jsx`
- Línea: ~7 (const siteKey = "...")

## Nota de seguridad:
- La Site Key es pública y puede estar en el código frontend
- La Secret Key debe mantenerse privada en el backend
- FormSubmit manejará la validación automáticamente