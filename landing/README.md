# Landing de Solanch | Comunidad MINED/FWP

Landing publicada: https://solanch-mined-fwp.netlify.app/

Proyecto de Netlify: `solanch-mined-fwp` (`e483571d-78ec-4650-9af5-f1d1974f408e`).

Página estática en `dist/`. No requiere compilación ni instalar las dependencias del editor para publicarla.

## Publicación gratuita con Netlify

Conecta el repositorio de GitHub con Netlify y la rama `main`. `netlify.toml`, en la raíz, configura el directorio base `landing`, el directorio publicado `dist` y ningún comando de compilación. Comprueba que el proyecto se mantiene en Free; el servicio tiene límites mensuales de uso.

Para usar el registro, entra al proyecto en Netlify > Forms y activa la detección de formularios antes de desplegar la página. El formulario detectado se llama `comunidad-solanch`. Las respuestas se consultan y exportan desde ese panel privado; no se guardan en GitHub.

## Comportamiento

- Los 10 pasos, la selección Mac/Windows y Claude/Codex se guardan en `localStorage` de cada navegador.
- El registro opcional recoge nombre, correo y consentimiento mediante Netlify Forms. No crea cuentas ni sincroniza avance.
- El PDF se sirve desde `dist/descargas/playbook-solanch.pdf`.
- El ZIP y el repositorio abren los enlaces propios de GitHub.
- `dist/gracias/` confirma un envío aceptado; `dist/privacidad/` explica el uso de los datos.

Para previsualizar: `python3 -m http.server 4173 --directory landing/dist`, desde la raíz del repositorio. El envío real del registro requiere desplegar en Netlify con Forms habilitado.
