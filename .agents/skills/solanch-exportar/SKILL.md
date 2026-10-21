---
name: solanch-exportar
description: Exportar a MP4 un plan aprobado del editor local de Solanch y comprobar la salida.
---

# Exportar el plan aprobado

Lee FORMATO-DEL-PLAN.md y el JSON que el usuario desea exportar. Si faltan decisiones de edición, remítete a la preparación del plan. Si la persona ya aprobó la muestra o pide expresamente el resultado completo, ejecuta `npm run render -- "ruta del plan.json"`.

Conserva el original y usa una salida MP4 en exportaciones. Si el nombre ya existe, elige un nuevo nombre o reemplaza esa exportación solo cuando el usuario lo solicite. El script valida tiempos, renderiza y decodifica la salida.

Informa la ruta absoluta real, duración, dimensiones y presencia de audio que devuelva el comando. Aclara que la revisión técnica no sustituye revisar imagen, audio y textos. No anuncies éxito si el comando falla y no envíes el archivo a servicios externos sin que el usuario lo pida.
