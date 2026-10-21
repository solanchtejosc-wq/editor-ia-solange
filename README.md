# Estudio creativo de Solanch | Comunidad MINED/FWP

[Abrir la experiencia](https://solanch-mined-fwp.netlify.app/) · [Entrar al estudio](https://solanch-mined-fwp.netlify.app/estudio/)

Una ruta de ocho estaciones, un cuaderno de ejercicios y un estudio de video escrito para esta nueva versión. Los textos, la organización, los ejemplos y la implementación del estudio se prepararon de nuevo con asistencia de IA.

## Qué ofrece

- Avance de ocho estaciones guardado en el navegador.
- Recorte de inicio y final de una toma, tres formatos, encuadre, título, marca y subtítulos manuales.
- Exportación local mediante Canvas, Web Audio y MediaRecorder. El contenedor disponible puede ser WebM o MP4; requiere un navegador compatible.
- Apoyo de IA mediante propuestas para copiar a la herramienta que cada participante elija. No hay generación con IA, transcripción automática ni llamadas a un modelo dentro del estudio.
- Registro opcional con el formulario Netlify existente `comunidad-solanch`.

## Archivos

`landing/dist/` contiene el sitio y el estudio. `materiales/` contiene ejercicios nuevos. `docs/` contiene el cuaderno y la documentación de esta versión.

## Ejecutar

No requiere dependencias ni instalación. Desde `landing/dist`, inicia un servidor estático, por ejemplo `python3 -m http.server 4173`, y abre la dirección local mostrada. Netlify usa `netlify.toml`.

## Alcance

El estudio trabaja una toma y no une clips ni elimina fragmentos interiores. La exportación se realiza en tiempo real; mantén la pestaña visible y descarga antes de salir. No envía el video a un servidor.

Esta versión reemplaza la adaptación inicial. Los commits anteriores y sus avisos de procedencia permanecen en el historial de Git, sin reescritura. La nueva entrega no incluye el editor anterior ni sus archivos. Esto no certifica la situación jurídica de publicaciones pasadas.
