# Band·it

Web en español para explorar ejercicios con bandas de resistencia y agarraderas, con demostraciones esquemáticas animadas en Three.js. Base preparada para Vercel, sin servidor ni base de datos.

## Equipo

| Banda | Resistencia nominal |
| --- | ---: |
| Roja | 50 lb |
| Negra | 40 lb |
| Verde | 30 lb |
| Azul | 20 lb |
| Amarilla | 10 lb |

Valores transcritos de la imagen del usuario. Solo se cuenta con agarraderas; no se presupone ningún otro accesorio. La resistencia real depende del estiramiento. Elegir un color cambia la demostración y no constituye una recomendación de peso.

## Empezar en Windows

Requiere Node.js 22.12 o posterior. Desde esta carpeta:

```powershell
npm ci
npm run dev
```

Abrir la dirección local que muestra Vite. En una instalación sin package-lock.json, ejecutar `npm install` en lugar de `npm ci`.

```powershell
npm test
npm run build
npm run preview
```

## Incluido en el MVP

- Siete ejercicios: curl de bíceps, curl martillo, remo inclinado, apertura de banda, remo vertical, elevación lateral y elevación frontal.
- Buscador, filtros por grupo y selector de las cinco bandas.
- Figura articulada con movimientos diferenciados, banda y agarraderas visibles.
- Cámara orbital, vistas de frente/perfil/tres cuartos, zoom, pausa, velocidad y recorrido manual del ciclo.
- Instrucciones textuales, alternativa sin WebGL y reducción de movimiento.
- Diseño adaptable y configuración estática de Vercel.

Etapa 3 de 3 completada: MVP local revisado y preparado para publicar. Catálogo ampliado después a petición del usuario, conservando las mismas cinco bandas y agarraderas. La figura es esquemática y no valida la técnica de una persona. La página aún no está publicada: falta autorización y acceso al proyecto correcto de Vercel. Ver pruebas y límites en [docs/ESTADO.md](docs/ESTADO.md).

## Terminar en un máximo de tres etapas

1. **Base, realizada en esta entrega:** proyecto, catálogo inicial, visor, reglas, documentación y configuración de despliegue.
2. **Producto, realizada:** movimientos corregidos, referencias por ejercicio, controles accesibles, recorrido manual y comprobación en escritorio y móvil simulado a 360/390 px.
3. **Cierre, realizado:** revisión de escritorio, móvil simulado, teclado, contraste, rendimiento y fallos del visor. Publicación pendiente de autorización y acceso a Vercel.

Los dos prompts listos para copiar están en [docs/PROMPTS.md](docs/PROMPTS.md). Cada uno corresponde a un agente o sesión principal. No es necesario ejecutarlos en paralelo: el tercero depende del resultado del segundo. Alcance y criterios de aceptación en [docs/PLAN.md](docs/PLAN.md).

## Estructura

```text
src/data.js       Bandas y contenido de los ejercicios
src/main.js       Interfaz, filtros y controles
src/viewer.js     Escena Three.js, agarraderas y ciclo de vida
src/motion.js     Trayectorias comprobables y segmentos constantes
src/style.css     Diseño adaptable
tests/            Reglas del catálogo
docs/             Plan, prompts, fuentes y estado
AGENTS.md         Instrucciones para continuar
vercel.json       Compilación y salida estática
```

## Vercel

Configuración lista: **Vite**, instalación `npm ci`, build `npm run build`, salida `dist`, sin variables de entorno. La revisión final usó Node 24.21.0; seleccionar Node 24.x en Vercel. `.vercelignore` excluye caché, documentación, capturas y herramientas locales de los envíos por CLI.

Pasos exactos para publicar desde esta carpeta, sin subir el directorio superior ni requerir un repositorio nuevo: [docs/DESPLIEGUE.md](docs/DESPLIEGUE.md). También se documenta la importación desde un repositorio dedicado. No se han creado proyectos remotos ni despliegues.

## Contenido y límites

No se conocen las especificaciones de tus bandas. Antes del uso real, confirmar que el fabricante permite pisarlas y qué estiramiento admite. La figura es una guía visual simplificada. Las referencias y puntos que requieren revisión se encuentran en [docs/FUENTES.md](docs/FUENTES.md).

## Reproducir las comprobaciones especiales

Después de `npm run build`, ejecutar `node tools/qa-server.mjs` y abrir:

- `http://127.0.0.1:4174/?qa=reduced`: preferencia de movimiento reducido simulada.
- `http://127.0.0.1:4174/?qa=no-webgl`: creación de contexto WebGL bloqueada.
- `http://127.0.0.1:4174/?qa=context`: botones de QA para perder y recuperar el contexto.
- `http://127.0.0.1:4174/?qa=audit`: medición de dos segundos de renderizado y avance del ciclo, recursos descargados y tiempo local de carga. El modo reducido también permite alternar su preferencia simulada.

El servidor escucha exclusivamente en la máquina local. Estas simulaciones no se incluyen en `dist` ni en Vercel. Detener con Ctrl+C. Las instrucciones de uso normal siguen siendo `npm run dev` o `npm run preview`.
