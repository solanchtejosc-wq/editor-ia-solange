---
name: solanch-instalar
description: Instalar y comprobar el editor local de Solanch dentro de su carpeta, con Node.js y FFmpeg.
---

# Instalar el kit

Lee LEEME-PRIMERO.md en la raíz del kit. Trabaja desde la carpeta que contiene package.json.

1. Comprueba `node --version` y `npm --version`. Se requiere Node 22 o posterior. Si falta, explica cómo instalar Node.js LTS desde su sitio oficial y retoma después.
2. Instala las dependencias de este proyecto con `npm ci`. Descarga el FFmpeg de ffmpeg-static para el sistema actual. Conserva los avisos de TERCEROS.md.
3. Ejecuta `npm run diagnostico` y `npm run prueba`. Resuelve el error concreto si falla; no anuncies éxito con un comando fallido ni desactives TLS/seguridad.
4. Muestra la ruta absoluta del MP4 de prueba generado y cómo abrirlo en el reproductor local. Describe que es una señal sintética para comprobar imagen, sonido y subtítulos.
5. Explica que el siguiente paso es copiar una grabación a entradas y pedir solanch-editar.

No instala software global adicional ni necesita Python o claves API. No modifica otros proyectos. No abre cuentas ni publica archivos.
