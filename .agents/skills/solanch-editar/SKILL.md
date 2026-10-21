---
name: solanch-editar
description: Preparar cortes, formato, títulos y subtítulos de una grabación con el editor local de Solanch y generar una muestra MP4.
---

# Editar una grabación

Lee LEEME-PRIMERO.md y FORMATO-DEL-PLAN.md. Usa el script del proyecto, no sustituyas el kit por otra aplicación.

Obtén la ruta del video local, formato deseado y cambios solicitados. Si faltan cortes o textos, pregunta lo necesario y prepara el plan con lo disponible. Conserva el original.

Ejecuta `npm run preparar -- "ruta del video"` para crear un JSON en proyectos. Si ya existe un plan, léelo y actualízalo sin perder los cambios aprobados. source y output se resuelven respecto al JSON. keep y captions usan segundos del original. captions requieren texto real revisado: no infieras una transcripción de metadatos o del nombre de archivo.

Modifica el plan según la petición. Para pausas, `npm run silencios -- "ruta"` ofrece candidatos que necesitan revisión. La primera edición puede hacerse sin subtítulos si el usuario no proporciona transcripción. No presentes detección de silencios como comprensión de las frases.

Genera `npm run render -- "ruta del plan.json" --muestra` y muestra la ruta absoluta de la muestra para revisión. Tiene hasta 10 s y menor resolución. Solicita la decisión del usuario sobre la muestra antes de exportar el archivo completo, salvo que ya haya aprobado el plan y pedido la exportación completa.

Si falla, muestra la causa concreta y resuélvela antes de anunciar un archivo listo. No sobrescribas grabaciones ni publiques en redes.
