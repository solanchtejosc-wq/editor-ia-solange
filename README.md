# Instala tu editor de IA paso a paso

**Solanch | Comunidad MINED/FWP**

[Descargar el playbook en PDF](https://github.com/solanchtejosc-wq/editor-ia-solange/raw/refs/heads/main/docs/Playbook-Solanch-Comunidad-MINED-FWP.pdf) · [Descargar todos los archivos del editor (ZIP)](https://github.com/solanchtejosc-wq/editor-ia-solange/archive/refs/heads/main.zip)

Sigue los pasos en orden y marca cada uno al terminarlo. Solo instalas dos o tres programas tú; el resto lo instala la IA. No necesitas saber programar.

## Antes de empezar

| Necesitas | Detalle |
|---|---|
| Una computadora | Mac o Windows, con al menos 3 GB libres; el espacio final puede aumentar con modelos y videos. |
| Una cuenta con acceso a IA | Claude con acceso a Code, o ChatGPT con acceso a Codex. |
| Internet | Para instalar, descargar el transcriptor y hablar con la IA. El procesamiento del video se hace en tu computadora. |
| Un video tuyo | Grabado con el celular, de 30 a 60 segundos. En el paso 8 tienes consejos. |

Los tiempos de cada paso son orientativos. La instalación se hace una sola vez.

## Parte 1 · Instalación (una sola vez)

Pasos 1 a 6. Hazlos el mismo día si puedes.

### 1. Instala Node.js

*Tiempo orientativo: 3 min.*

Es el motor que hace funcionar el editor.

**1.** Entra a [nodejs.org](https://nodejs.org) y descarga la versión **LTS** para tu computadora.

**2.** Abre el instalador y sigue las instrucciones. Al terminar, cierra y vuelve a abrir tu app de IA.

- [ ] Paso 1 completado

### 2. Instala las herramientas del sistema

*Tiempo orientativo: 5-10 min.*

**En Mac:** abre Terminal (búscala con Comando + Espacio), pega este comando y pulsa Enter. En la ventana que aparece, pulsa Instalar.

```text
xcode-select --install
```

Si dice que ya están instaladas, sigue al paso 3.

**En Windows:** instala Git for Windows desde [git-scm.com/download/win](https://git-scm.com/download/win), con las opciones predeterminadas.

- [ ] Paso 2 completado

### 3. Instala Claude Code o abre Codex

*Tiempo orientativo: 5 min.*

**Claude:** descarga la app de escritorio desde [claude.ai/download](https://claude.ai/download), inicia sesión con tu cuenta y abre la pestaña **Code**.

**Opción Terminal en Mac:**

```text
curl -fsSL https://claude.ai/install.sh | bash
```

Después escribe `claude` e inicia sesión.

> **Si usas Codex:** abre la app y entra con tu cuenta de ChatGPT con acceso a Codex. En los pasos siguientes usa **$** en vez de **/**: por ejemplo, `$instalar-editor`.

- [ ] Paso 3 completado

### 4. Descarga el editor de Solanch

*Tiempo orientativo: 2 min.*

**1.** Abre [el repositorio de Solanch en GitHub](https://github.com/solanchtejosc-wq/editor-ia-solange).

**2.** Pulsa **Code** y luego **Download ZIP**. También puedes usar [la descarga directa del editor](https://github.com/solanchtejosc-wq/editor-ia-solange/archive/refs/heads/main.zip).

**3.** Descomprime el ZIP. La carpeta se llama `editor-ia-solange-main`. Cámbiale el nombre a `Mi-Editor`.

**4.** Muévela a una carpeta local: en Mac puede ser tu carpeta de usuario (la de la casita en Finder).

> **Evita las carpetas sincronizadas con iCloud, OneDrive o Dropbox.** La instalación puede ocupar más de 1 GB. Guarda el editor fuera de la sincronización en la nube.

- [ ] Paso 4 completado

### 5. Abre la carpeta en tu app de IA

*Tiempo orientativo: 1 min.*

**App de escritorio:** elige la carpeta `Mi-Editor` como proyecto en Claude Code o Codex. Abre esa carpeta, no una carpeta de dentro.

**Terminal en Mac:** si guardaste Mi-Editor en tu carpeta de usuario, escribe:

```text
cd ~/Mi-Editor && claude
```

Si usas Codex en Terminal, sustituye `claude` por `codex`.

- [ ] Paso 5 completado

### 6. Pídele a la IA que instale el editor

*Tiempo orientativo: 3-5 min.*

Escribe en el chat de Claude y pulsa Enter:

```text
/instalar-editor
```

En Codex escribe `$instalar-editor`. La IA revisa tu computadora, instala lo que falta y hace una prueba. Lee las solicitudes de permiso antes de aprobarlas.

Termina cuando te diga que todo quedó instalado.

- [ ] Paso 6 completado

## Parte 2 · Tu marca y tu primer video

Pasos 7 a 10. La primera vez puede tardar más por la descarga del transcriptor.

### 7. Crea tu kit de marca (recomendado)

*Tiempo orientativo: 5 min.*

**1.** Copia tu logo (PNG) a `Mi-Editor/public/imagenes/`.

**2.** Escribe en Claude:

```text
/marca
```

En Codex: `$marca`. Te pregunta tus colores, tu logo, tu llamado a la acción y tu estilo. Desde ahí, tus videos usan tu marca sin repetirlo.

> **Nombre para esta edición:** Solanch | Comunidad MINED/FWP. El kit queda listo para que cada participante configure su propia marca.

- [ ] Paso 7 completado

### 8. Graba tu video bien desde el principio

*Tiempo orientativo: 10 min.*

Una buena grabación ahorra tiempo de edición. Usa un video hablado de 30 a 60 segundos para practicar.

**Graba en 1080p a 30 fps.** En iPhone: Ajustes > Cámara > Grabar video. El editor también acepta 4K, pero la exportación puede tardar más.

**En vertical,** con el celular quieto o apoyado y buena luz de frente.

**Para cambiar de ángulo:** mueve el celular, quédate quieta y en silencio un segundo y luego habla. Así el corte queda limpio.

**Equivocarte no importa:** haz una pausa y repite la frase. La IA puede conservar la última toma.

**¿No sabes qué decir?** En `material-de-clase/guiones-de-practica.md` tienes tres guiones cortos listos.

> **Pasa el video sin comprimir:** por AirDrop (iPhone y Mac), por cable o por Google Drive. Evita enviarlo como video comprimido por mensajería; si la usas, elige archivo/documento y comprueba la calidad.

- [ ] Paso 8 completado

### 9. Edita tu primer video

*Tiempo orientativo: 20-30 min la primera vez.*

Escribe en Claude y arrastra el archivo del video al chat:

```text
/editar-video
```

En Codex escribe `$editar-video`. La IA te hace unas preguntas rápidas: para qué red, qué quieres lograr y qué estilo usar. Luego trabaja en este orden:

| Qué pasa | Qué revisar |
|---|---|
| Transcribe lo que dices | La primera vez descarga Whisper; después suele tardar menos. |
| Te pregunta las palabras dudosas | Revisa nombres, marcas y cifras para que los subtítulos salgan bien. |
| Corta silencios y muletillas | Revisa que el ritmo se sienta natural. |
| Pone subtítulos y propone animaciones | Tú apruebas el estilo y los cambios. |
| Exporta una muestra de 8 segundos | Mírala en el celular y pide los ajustes. |
| Exporta el video completo | Después de tu aprobación, lo guarda en entregas/. |

> **Los tiempos son orientativos.** Cambian según la computadora, la duración, la resolución y las descargas de la primera instalación.

Después de la muestra, pide cambios con tus palabras. Aprueba la muestra antes de exportar el video completo.

- [ ] Paso 9 completado

### 10. Recoge tu video y publícalo

*Tiempo orientativo: 1 min.*

Tu video terminado queda en `Mi-Editor/entregas/`, con la fecha y la hora en el nombre. Pásalo al celular y publícalo.

¿Lo quieres también para YouTube o en cuadrado? Pide: *"Hazme también la versión cuadrada y la horizontal".*

- [ ] Paso 10 completado

## Pedidos para copiar

Escríbelos en Claude o Codex tal cual, o cámbialos a tu gusto.

- Quita los silencios, pero deja un ritmo natural
- Hazlo más rápido, estilo TikTok
- Pon un título al inicio con la pregunta del gancho
- Haz zoom cuando digo "esto es lo más importante"
- Pon emojis en las palabras clave, sin pasarte
- Que el cambio de ángulo no se vea: corta cuando muevo el celular
- Pon los subtítulos más grandes y un poco más arriba
- Exporta el video final

## Si algo falla

Primero copia el mensaje de error y pégaselo a tu app de IA.

| Problema | Solución |
|---|---|
| "npm" o "node" no se reconoce | Instala Node.js (paso 1), cierra y vuelve a abrir Claude Code o Codex. |
| La skill no aparece | Abre Mi-Editor, no una carpeta de dentro, y reinicia la app. En Claude usa /nombre; en Codex, $nombre. |
| La transcripción falla | En Mac, repite xcode-select --install (paso 2). Luego vuelve a pedir /instalar-editor o $instalar-editor. |
| Escribe mal nombres o marcas | Indica la palabra correcta. Ejemplo: "La marca se escribe Comunidad MINED/FWP". |
| El subtítulo tapa la cara | Pide "sube los subtítulos" o "bájalos". |
| Exportar tarda mucho | Con 4K puede tardar más. Para el próximo, graba en 1080p (paso 8). |
| No encuentro el video terminado | Está en Mi-Editor/entregas/, con la fecha y la hora en el nombre. |

## Material incluido

- `material-de-clase/`: guiones, plantillas y hojas de seguimiento.
- `proyecto/`: kit de marca, edición, transcripción y versiones.
- `.claude/skills/` y `.agents/skills/`: instrucciones para Claude Code y Codex.
- `public/`: fuentes, sonidos y carpetas para tus archivos.
- `scripts/` y `src/`: herramientas y código del editor.
- [Referencia del editor](docs/REFERENCIA-EDITOR.md) y [guía para la clase](GUIA-DE-CLASE.md).

Edición y publicación: **Solanch | Comunidad MINED/FWP**. Funciona con Claude Code (Anthropic), Codex (OpenAI) y Remotion. Consulta [origen y componentes](ORIGEN.md).
