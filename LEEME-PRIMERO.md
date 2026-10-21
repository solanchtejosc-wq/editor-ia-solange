# Empieza aquí · Solanch | Comunidad MINED/FWP

Esta carpeta es un editor local controlado mediante instrucciones a Claude Code o Codex. El asistente prepara un plan de edición y ejecuta FFmpeg. El resultado es un archivo MP4 en tu computador.

## 1. Prepara tu computador

Usa un computador Mac o Windows de 64 bits. Instala [Node.js LTS](https://nodejs.org/en/download), versión 22 o posterior, y **uno** de estos asistentes con acceso a archivos y terminal local:

- [Claude Code: instalación oficial](https://code.claude.com/docs/en/quickstart).
- [Codex: página oficial](https://openai.com/codex/).

Inicia sesión en el asistente. La guía y el código se descargan gratis. El acceso y uso de Claude Code o Codex dependen de tu cuenta, plan y límites; no los proporciona esta página. La primera instalación del kit necesita internet y descarga FFmpeg. No requiere comprar alojamiento, instalar Python ni agregar una clave API al kit.

## 2. Descarga y descomprime

En la [guía de Solanch](https://solanch-mined-fwp.netlify.app/#paso-3), pulsa **Descargar editor desde mi GitHub**. También puedes [descargar este ZIP](https://github.com/solanchtejosc-wq/editor-ia-solange/archive/refs/heads/kit-solanch.zip).

Mac: haz doble clic en el ZIP. Windows: botón derecho → Extraer todo. No trabajes dentro del ZIP. Mueve la carpeta extraída a Documentos y, si quieres, renómbrala `Editor-Solanch`. Dentro deben aparecer `package.json`, `LEEME-PRIMERO.md`, `scripts`, `entradas`, `proyectos` y `exportaciones`. Las carpetas ocultas `.agents` y `.claude` también deben conservarse.

## 3. Abre la carpeta en el asistente

Agrega o abre **la carpeta que contiene package.json** como proyecto local en Claude Code o Codex. Si usas terminal, entra a esa carpeta con `cd "ruta completa de la carpeta"` y ejecuta `claude` o `codex`, según el que hayas instalado.

No basta con abrir esta página o pegar el ZIP en una conversación de ChatGPT o Claude sin acceso local a tu carpeta.

## 4. Copia esta instrucción en el chat del asistente

> Lee LEEME-PRIMERO.md y la skill solanch-instalar de esta carpeta. Comprueba Node.js. Instala las dependencias con npm ci, ejecuta npm run diagnostico y npm run prueba. Corrige los errores si aparecen. Cuando todo pase, muéstrame la ruta completa del MP4 de prueba y explícame cómo abrirlo. No modifiques otros proyectos.

El asistente instalará las dependencias **dentro de esta carpeta**, comprobará FFmpeg y generará un video sintético de prueba de unos 3 segundos. Si el asistente solicita permiso para ejecutar esos comandos en este proyecto, revísalo y concédelo para continuar.

Abre el MP4 que te indique: debes ver patrones de color, un título y subtítulos y escuchar un tono. Es una comprobación técnica. No marques el paso como hecho si termina con error. Si no aparece la skill, la instrucción completa funciona igualmente: el asistente puede leer su archivo `.agents/skills/solanch-instalar/SKILL.md` o `.claude/skills/solanch-instalar/SKILL.md`.

## 5. Edita tu primer video

Copia una grabación propia a `entradas/`. Ejemplo: `entradas/mi-video.mp4`. Se admiten videos locales legibles por FFmpeg; usa MP4 o MOV para comenzar.

Copia esta instrucción al asistente y completa los corchetes:

> Lee la skill solanch-editar y prepara entradas/[mi-video.mp4]. Quiero un video [vertical/horizontal/cuadrado]. Conserva [los segundos o fragmentos que quiero]. Agrega el título [mi título] y la marca [mi nombre]. Revisa conmigo los textos y el encuadre. Crea una muestra y muéstrame su ruta antes de exportar el video completo. No sobrescribas mi original.

Puedes pedir después: «Conserva de 2 a 8 segundos y de 10 a 18; formato vertical; título Mi primer consejo». Los subtítulos deben venir de texto y tiempos que hayas revisado. El kit no transcribe automáticamente ni decide qué dice un video por su nombre. El detector de silencios propone pausas; debes revisar cuáles conviene cortar.

## 6. Revisa y exporta

Abre la muestra en el reproductor de tu computador. La muestra es de hasta 10 segundos y menor resolución. Si te gusta, pide:

> Usa solanch-exportar para exportar el plan aprobado completo. Dime la ruta del MP4 final en exportaciones y comprueba que se puede decodificar.

El video final será 720×1280 (vertical), 1280×720 (horizontal) o 720×720 (cuadrado), H.264 y AAC si el original tiene audio. El plan usa una grabación por proyecto, permite conservar varios fragmentos de ella, encuadrar, poner título, marca y subtítulos. La exportación local no requiere mantener abierta la landing.

## Si algo no funciona

- **npm o node no se reconoce:** instala Node.js LTS y cierra y vuelve a abrir el asistente/terminal.
- **Falta package.json:** abriste la carpeta incorrecta. Elige la carpeta interior que lo contiene.
- **Descarga de FFmpeg falla:** comprueba internet y vuelve a pedir `npm ci`. No desactives la verificación TLS ni el antivirus.
- **No aparece la skill:** pega la instrucción completa del paso 4; abre el archivo SKILL.md de la carpeta o reinicia la sesión en ese proyecto.
- **El video no cabe:** pide `framing: contener` para mostrar toda la imagen o `llenar` para recortar los bordes; revisa la muestra.
- **La salida ya existe:** usa otro nombre o pide reemplazar solo esa exportación.
- **Error durante la prueba:** copia el mensaje completo al asistente y pide resolverlo antes de continuar.

## Comandos de referencia

Desde la carpeta del kit:

```text
npm ci
npm run diagnostico
npm run prueba
npm run preparar -- "entradas/mi-video.mp4"
npm run render -- "proyectos/mi-video.json" --muestra
npm run render -- "proyectos/mi-video.json"
npm run silencios -- "entradas/mi-video.mp4"
```

Consulta `FORMATO-DEL-PLAN.md` para entender el archivo JSON. `TERCEROS.md` documenta los componentes externos. El motor procesa archivos localmente; tu asistente puede enviar conversaciones y archivos a su proveedor según sus permisos y condiciones. Revisa sus ajustes antes de trabajar con material privado.
