# Verificación de esta entrega

20 de octubre de 2026. Probado en macOS Apple Silicon, Node 22.22.3 y FFmpeg descargado por ffmpeg-static 5.3.0 (el binario de esta plataforma reporta FFmpeg 6.0).

- npm ci desde una carpeta extraída del ZIP limpio.
- Diagnóstico del ejecutable y filtro libass.
- Video sintético de cuatro segundos: dos fragmentos conservados; MP4 vertical de 2,80 s, con audio, título, marca y subtítulos; decodificación sin errores.
- Exportación completa horizontal de 1,50 s sin audio; rutas con espacios; fotograma revisado para título y subtítulos con acentos.
- Rechazo de tiempos fuera del original y comprobación de que el original conserva su hash.
- Tres skills con frontmatter validado y copias equivalentes para Claude Code.

El flujo de comandos está comprobado. No se ha realizado una sesión independiente con cada asistente ni una instalación física en Windows o Mac Intel. Cada participante debe ejecutar la prueba incluida antes de editar material propio. No se anuncia transcripción automática ni funciones ajenas al alcance documentado.
