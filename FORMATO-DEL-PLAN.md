# Plan de edición

`npm run preparar -- "entradas/mi-video.mp4"` crea `proyectos/mi-video.json`. Las rutas source y output se resuelven respecto a la carpeta de ese JSON. Los tiempos se expresan en segundos del original, incluso los de subtítulos. Al unir fragmentos, los subtítulos se trasladan a su posición correspondiente en el resultado.

```json
{
  "source": "../entradas/mi-video.mp4",
  "output": "../exportaciones/mi-video-editado.mp4",
  "format": "vertical",
  "framing": "contener",
  "keep": [[2, 8], [10, 18]],
  "title": "Mi primer consejo",
  "brand": "Tu nombre",
  "captions": [{"start": 2, "end": 5, "text": "Un subtítulo revisado"}]
}
```

El ejemplo exige un original de al menos 18 segundos. `keep` debe estar ordenado y no solaparse. Usa `contener` para conservar la imagen con bandas ciruela o `llenar` para recortar los bordes. `format` acepta vertical, horizontal o cuadrado. Un título o marca vacíos no se muestran. El título se mantiene durante todo el video. El subtítulo se coloca en la parte inferior sobre la marca.

`--muestra` crea otra salida con prefijo muestra-, hasta 10 segundos y a mitad de resolución. El archivo completo conserva la resolución de salida indicada en la guía. `--reemplazar` permite sustituir una exportación existente; el original nunca debe coincidir con la salida.

Los subtítulos se dibujan sobre la imagen. El script comprueba límites de tiempos y realiza una decodificación del MP4 al terminar. Esto detecta fallos técnicos; igualmente debes revisar el resultado visual y el contenido antes de compartir.
