# Componentes y referencias

La implementación de los scripts y las instrucciones de esta entrega se preparó de nuevo para Solanch con asistencia de IA. El código nuevo se distribuye bajo LICENSE (MIT). Esto no cambia la autoría ni la licencia de herramientas externas.

- **ffmpeg-static 5.3.0**, autores y colaboradores del proyecto eugeneware/ffmpeg-static: paquete GPL-3.0-or-later. https://github.com/eugeneware/ffmpeg-static . `npm ci` descarga el binario que corresponde a tu sistema desde sus releases. Los binarios y sus componentes tienen sus propias condiciones; consulta el README y la licencia instalados en node_modules/ffmpeg-static y https://ffmpeg.org/legal.html . No se incluyen esos binarios en el ZIP de Solanch.
- **FFmpeg**, equipo y colaboradores FFmpeg: ejecutable externo para lectura, filtros y codificación. https://ffmpeg.org/ . Sus filtros trim, atrim, concat, scale, pad y subtitles se utilizan conforme a la documentación: https://ffmpeg.org/ffmpeg-filters.html . La versión concreta del binario depende de la plataforma y se muestra en el diagnóstico.
- **Node.js**, OpenJS Foundation y colaboradores: runtime que cada participante instala desde https://nodejs.org/en/download . Licencia y avisos del proyecto: https://github.com/nodejs/node/blob/main/LICENSE .
- Las fuentes de los títulos se resuelven en el sistema mediante libass; el kit solicita Arial y permite la sustitución disponible. No distribuye archivos de fuentes, música, fotos o videos de terceros. La prueba genera patrones y un tono sintéticos con FFmpeg.
- Documentación de skills de Codex: https://learn.chatgpt.com/docs/build-skills . Claude Code: https://code.claude.com/docs/en/skills . Los nombres y marcas de servicios pertenecen a sus titulares. No se afirma afiliación.

Las dependencias transitivas conservan sus avisos en node_modules; package-lock.json fija sus versiones. La licencia MIT de este kit no reemplaza ninguna licencia externa.
