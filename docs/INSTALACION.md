# Guía de instalación · Solanch | MINED/FWP

## 1. Elige Claude Code o Codex

Elige uno de los dos asistentes e instálalo desde su página oficial. Inicia sesión y usa su modo de trabajo local, con acceso a una carpeta y a la terminal. Puedes usar Mac o Windows.

La guía y el kit se descargan gratis. El uso de Claude Code o Codex depende de tu cuenta, plan y límites. No necesitas instalar los dos.

[Instalar Claude Code](https://code.claude.com/docs/en/quickstart)
[Conocer e instalar Codex](https://openai.com/codex/)

- [ ] Tengo un asistente instalado y mi sesión iniciada.

## 2. Instala Node.js LTS

Abre la web oficial de Node.js y descarga la versión LTS para tu sistema, 22 o posterior. Completa la instalación. Después cierra y vuelve a abrir el asistente para que reconozca Node y npm.

Si ya lo tienes, el asistente puede comprobarlo con node --version y npm --version. Para esta versión del kit no necesitas instalar Python.

[Descargar Node.js LTS](https://nodejs.org/en/download)

- [ ] Node.js LTS está instalado.

## 3. Descarga el editor desde mi GitHub

Pulsa el botón de abajo. Se descargará un ZIP desde el GitHub de Solanch: contiene el editor local, las instrucciones y las skills para Claude Code y Codex. No necesitas una cuenta de GitHub para descargarlo.

El archivo se llama editor-ia-solange-kit-solanch.zip. El nombre técnico del repositorio conserva “solange”; la comunidad y esta guía son de SOLANCH.

[Descargar editor desde mi GitHub](https://github.com/solanchtejosc-wq/editor-ia-solange/archive/refs/heads/kit-solanch.zip)
[Ver el contenido del kit](https://github.com/solanchtejosc-wq/editor-ia-solange/tree/kit-solanch)

- [ ] El ZIP del editor está en mis Descargas.

## 4. Extrae el ZIP y ubica tu carpeta

En Mac, haz doble clic en el ZIP. En Windows, botón derecho y Extraer todo. Mueve la carpeta extraída a Documentos y, si quieres, llámala Editor-Solanch. Abre la carpeta interior donde aparece package.json.

Debes ver LEEME-PRIMERO.md, package.json, scripts, entradas, proyectos y exportaciones. No trabajes dentro del ZIP ni abras solamente un archivo suelto.



- [ ] Tengo la carpeta extraída y veo package.json.

## 5. Abre la carpeta y pide instalar

Abre o agrega esa carpeta como proyecto local en Claude Code o Codex. Luego copia esta instrucción y pégala en el chat del asistente. Si usas terminal, entra a la carpeta y ejecuta claude o codex. Revisa los permisos que te pida para instalar y ejecutar dentro de este proyecto.

La primera instalación necesita internet y descarga FFmpeg. Si la skill no aparece en el menú, esta instrucción completa permite al asistente leer su archivo y continuar.

Instrucción para tu asistente: Lee LEEME-PRIMERO.md y la skill solanch-instalar de esta carpeta. Comprueba Node.js. Instala las dependencias con npm ci, ejecuta npm run diagnostico y npm run prueba. Corrige los errores si aparecen. Cuando todo pase, muéstrame la ruta completa del MP4 de prueba y explícame cómo abrirlo. No modifiques otros proyectos.



- [ ] La instalación y los comandos terminaron sin errores.

## 6. Abre el MP4 de prueba

El asistente debe indicar PRUEBA OK y la ruta de un MP4 dentro de exportaciones. Ábrelo en el reproductor de tu computador. Verás patrones de color, un título y subtítulos y escucharás un tono: es una prueba técnica de unos 3 segundos.

Si no aparece el archivo o hay un error, copia ese mensaje al asistente y pide resolverlo. Marca Hecho solo cuando hayas abierto el MP4 correctamente.



- [ ] Abrí el MP4 y comprobé imagen, sonido y subtítulos.

## 7. Agrega tu video y pide una muestra

Copia una grabación propia a entradas, por ejemplo mi-video.mp4. Pega esta instrucción en tu asistente y completa los corchetes. Puedes pedir conservar varios fragmentos de la misma grabación, cambiar el formato, poner título, marca y subtítulos de texto.

Los subtítulos necesitan textos y tiempos revisados; el kit no transcribe automáticamente. La muestra dura hasta 10 segundos y tiene menor resolución para revisarla rápido.

Instrucción para tu asistente: Lee la skill solanch-editar y prepara entradas/[mi-video.mp4]. Quiero un video [vertical/horizontal/cuadrado]. Conserva [los segundos o fragmentos que quiero]. Agrega el título [mi título] y la marca [mi nombre]. Revisa conmigo los textos y el encuadre. Crea una muestra y muéstrame su ruta antes de exportar el video completo. No sobrescribas mi original.



- [ ] Abrí y revisé la muestra de mi propio video.

## 8. Aprueba y exporta tu video completo

Revisa cortes, encuadre, sonido y textos. Pide los ajustes que necesites. Cuando apruebes la muestra, pega esta instrucción. Abre el MP4 final de exportaciones y compártelo en la plataforma que prefieras.

Salidas: vertical 720 × 1280, horizontal 1280 × 720 o cuadrada 720 × 720, en MP4 H.264 y con AAC si el original tiene audio. Conserva la carpeta para tus siguientes videos.

Instrucción para tu asistente: Usa solanch-exportar para exportar el plan aprobado completo. Dime la ruta del MP4 final en exportaciones y comprueba que se puede decodificar.



- [ ] Abrí el MP4 final y está listo para compartir.