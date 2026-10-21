# Solanch | Comunidad MINED/FWP — Instalación del editor local

[Guía interactiva](https://solanch-mined-fwp.netlify.app/) · [Descargar kit instalable](https://github.com/solanchtejosc-wq/editor-ia-solange/archive/refs/heads/kit-solanch.zip) · [Código del kit](https://github.com/solanchtejosc-wq/editor-ia-solange/tree/kit-solanch)

La landing explica en ocho pasos cómo instalar y usar un editor local desde Claude Code o Codex. La descarga se realiza en el paso 3. El asistente trabaja en la carpeta extraída y exporta MP4 en el computador.

El kit está en la rama `kit-solanch` de este mismo repositorio, para descargar solo sus archivos. La rama `main` contiene la landing de Netlify y el PDF. La web no edita videos ni incluye una cuenta de IA.

## Instalación de participantes

1. Instalar Claude Code o Codex y Node.js LTS 22+.
2. Descargar el ZIP de kit-solanch y extraerlo.
3. Abrir la carpeta que contiene package.json en el asistente local.
4. Pegar la instrucción de instalación. El asistente ejecuta npm ci, npm run diagnostico y npm run prueba.
5. Abrir el MP4 de prueba, agregar una grabación a entradas, revisar una muestra y exportar.

Guía y kit gratuitos. Cada participante necesita acceso propio al asistente y está sujeto a su plan y límites. El kit incluye cortes de una toma, tres formatos, títulos, marca, subtítulos de texto y MP4; no incluye transcripción automática.

## Sitio y administración

`landing/dist` es estático. Netlify publica main usando netlify.toml. El formulario opcional existente `comunidad-solanch` se conserva. Las casillas usan localStorage del navegador y no se sincronizan con el registro.

Esta entrega y el motor local se prepararon de nuevo con asistencia de IA. Los avisos de procedencia de la adaptación anterior permanecen en el historial, sin reescritura; consulta ORIGEN.md. Componentes actuales: documentación TERCEROS.md de la rama del kit.
