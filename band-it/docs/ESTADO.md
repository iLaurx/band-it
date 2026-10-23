# Estado de la entrega

23 de octubre de 2026. **Etapa 3 de 3 cerrada. MVP local listo para Vercel; publicación pendiente de autorización y acceso al proyecto correcto.** No hay URL pública verificada. No se propone una cuarta etapa.

## Alcance y correcciones finales

- Se conservan curl de bíceps, elevación lateral y elevación frontal, cada uno con trayectoria propia. Inventario: amarilla 10, azul 20, verde 30, negra 40 y roja 50 lb nominales, con agarraderas. Sin anclajes, banco, barra, tobilleras, cargas prescritas, rutinas, cuentas ni backend.
- Revisados catálogo, pasos, orientación y apoyos: solo banda y dos agarraderas; pisarla queda condicionado al fabricante. No se conocen marca, longitud, material, uniones reales ni límite de estiramiento. No se amplió el contenido ni se atribuye validación biomecánica.
- Corregida la disponibilidad durante la carga diferida: los controles 3D están deshabilitados hasta crear el visor, evitando acciones que se perderían durante la descarga. Selección de ejercicio y color se conservan para iniciar el visor. Revisado en código y comprobados controles habilitados tras cargar; no se simuló una red lenta para observar el estado transitorio.
- Bordes de buscador, cámara y reproducción reforzados; foco explícito en el título al saltar a los pasos. Añadido aviso para JavaScript desactivado (revisado en el HTML, no probado con JavaScript desactivado en navegador).
- Vercel: instalación reproducible explícita en vercel.json y exclusiones en .vercelignore para no enviar caché, documentación, capturas ni herramientas locales por CLI. Pasos exactos en [DESPLIEGUE.md](DESPLIEGUE.md).
- Herramienta local de QA ampliada con medición de dos segundos y cambio simulado de preferencia reducida. No se incluye en dist ni Vercel.

## Evidencia ejecutada en esta sesión

### Instalación y compilación

- Windows, Node **24.21.0**, Vite **7.3.7**. npm ci encontró archivos de esbuild/Rollup bloqueados por un servidor Vite anterior de esta carpeta. Se identificó y cerró exclusivamente ese proceso de Band·it; después **npm ci --offline --cache .npm-cache** instaló 15 paquetes desde el lockfile. Auditoría local: 0 vulnerabilidades reportadas; no sustituye una auditoría actualizada en línea. Sin cambios de dependencias ni lockfile.
- **npm test: 5/5 aprobadas.** Inventario, contrato del catálogo, longitudes y agarres en 1,206 poses, distinción de movimientos, continuidad y simetría en 3,000 muestras. Son invariantes geométricas, no evaluación de técnica humana.
- **npm run build: correcto** tras los ajustes finales. Sintaxis comprobada con node --check en main.js, viewer.js y qa-server.mjs.
- dist contiene únicamente index.html y tres recursos locales: CSS, interfaz JS y visor JS. Sin modelos, fuentes o imágenes descargados de terceros al abrir la página. Las referencias externas se abren solo al seguir sus enlaces.

### Navegador y accesibilidad

Build de producción en Chromium del navegador integrado, servido por loopback. Viewport observado de escritorio **1366 × 900** (se solicitó 1365; el navegador lo redondeó a 1366), móviles simulados **390 × 844** y **360 × 800**. La barra vertical ocupa 15 px en móvil: clientWidth/scrollWidth iguales a 375/375 y 345/345, respectivamente. **Sin desbordamiento horizontal de documento.** La lista de ejercicios tiene desplazamiento horizontal intencional en móvil. No equivale a un teléfono físico.

| Comprobación | Evidencia y resultado |
| --- | --- |
| Búsqueda y filtros | ` BÍCEPS ` encuentra 1/3; combinar con Hombros produce cero resultados; limpiar recupera 3/3. En 360 px: frontal encuentra 1/3 y con Brazos produce cero. Texto parecido a HTML no se interpreta. Los pasos seleccionados permanecen disponibles. |
| Selección | Los tres ejercicios actualizan título, pasos y movimiento. Enter conserva el foco en la selección; en móvil acerca la demostración. |
| Movimientos | Curl revisado en perfil; lateral en frente y perfil; frontal en perfil y frente, con recorrido manual hasta el punto alto. Vistas de tres cuartos y posiciones intermedias inspeccionadas. Banda continua, agarraderas y puntos bajo pies visibles. |
| Cinco colores | Seleccionados y observados en el canvas los cinco colores, incluido el grafito de la negra; estado textual y marca de selección se actualizan. No es recomendación de resistencia. |
| Pausa y velocidad | Pausa sin avance ni renderizados en muestra de 2 s; reproducir reanuda. En escritorio se midieron aproximadamente 26/50/76 puntos del ciclo en 2 s a 0.5×/1×/1.5×. En móvil se operaron pausa, reproducción y selector de velocidad. |
| Cámara y zoom | Frente, perfil, tres cuartos, acercar, alejar y restablecer operados. Giro por arrastre observado en escritorio. Controles de cámara y zoom también operados en móvil. |
| Teclado | Tab recorrió filtros, tres ejercicios, tres vistas, recorrido, reproducción, reset, zoom, velocidad, fuente, cinco bandas y pie sin atrapamiento. Enter/Espacio activaron filtros, selección, banda, pausa, cámara y zoom. Home, End, PageUp y flechas recorrieron el ciclo y lo dejaron en pausa. Enlace de salto llevó el foco al título de los pasos. |
| Tamaño y contraste | Controles visibles medidos con altura mínima de 44 px. Cálculo de contraste del texto visible, usando el punto más claro del gradiente: mínimo observado **4.78:1**. Bordes nuevos #718772: **3.87:1** frente al buscador y **3.02:1** frente al punto más claro del visor. Focos visibles inspeccionados. No es certificación WCAG ni auditoría con lector de pantalla. |
| Movimiento reducido | Preferencia **simulada** antes de cargar: Reproducir, inicio detenido y aviso correcto. Recorrido manual funcional. Alternar la preferencia simulada durante reproducción detuvo el movimiento y actualizó el aviso. No se cambió la preferencia del sistema operativo. |
| Sin WebGL | Contexto bloqueado mediante simulación: modo textual, controles 3D ocultos, selección de elevación frontal y sus tres pasos disponibles. |
| Pérdida de contexto | WEBGL_lose_context: mensaje y controles ocultos al perder; mensaje normal y controles habilitados al restaurar. |
| Consola | En los registros consultados solo aparecieron el error y aviso esperados de la simulación sin WebGL; no se observaron otros errores de aplicación. |

Capturas: [escritorio](etapa3-escritorio.png), [390 px](etapa3-movil-390.png), [360 px](etapa3-movil-360.png), [sin WebGL](etapa3-sin-webgl.png). Son instantes de flujos comprobados. Las capturas etapa2 y preview.png se conservan como evidencia anterior.

### Descarga y rendimiento: medidos antes de decidir optimizaciones

| Recurso final | Tamaño | Gzip calculado por Vite |
| --- | ---: | ---: |
| HTML | 0.74 kB | 0.45 kB |
| CSS | 10.61 kB | 3.09 kB |
| Interfaz | 15.35 kB | 5.65 kB |
| Visor diferido | 505.50 kB | 127.19 kB |
| Total aproximado | 532.20 kB | 136.38 kB |

El servidor local de QA entrega archivos sin compresión: gzip es una medida del build, no tráfico comprimido verificado en Vercel. Medición local de escritorio: DOMContentLoaded 66 ms; interfaz/CSS 14–15 ms y visor 4 ms. En viewport 360: DOMContentLoaded 249 ms; interfaz/CSS 200–202 ms y visor 5 ms. Son muestras en loopback, sin limitación de red ni CPU; no predicen carga en datos móviles.

En muestras de 2 s hubo 288–289 renderizados, mediana y percentil 95 de intervalos cercanos a 7 ms, tanto en escritorio como en viewport 360. Se contó la limpieza WebGL por render; no es medición de GPU ni benchmark de teléfono. Pausado: **0 renderizados y avance 21 → 21**. No se detectó motivo para añadir dependencias, dividir artificialmente Three.js o alterar el motor. Persiste y se documenta el aviso de chunk superior a 500 kB. Ya hay importación diferida, un solo renderizador, geometrías reutilizadas, pixel ratio limitado y renderizados puntuales al operar en pausa.

Reproducir: npm run build, node tools/qa-server.mjs y rutas ?qa=audit, ?qa=reduced, ?qa=no-webgl o ?qa=context. El panel audit registra muestras al pulsar Medir 2 segundos. Las simulaciones solo existen en ese servidor local.

## Límites de verificación y publicación

- No se probó teléfono físico, tacto/pinch, giro del dispositivo, otro motor de navegador ni lector de pantalla. No se certifica accesibilidad ni rendimiento de hardware móvil.
- La suspensión por document.hidden y la limpieza de recursos están implementadas y revisadas en código; no se verificó una pestaña realmente oculta. El cambio de movimiento reducido se comprobó con evento simulado, no con configuración real del sistema.
- El modelo no calcula fuerza, tensión, elongación ni holgura física; no valida biomecánica ni fija un rango personal. Las fuentes y limitaciones del equipo siguen en [FUENTES.md](FUENTES.md).
- **Único paso operativo para disponer de URL pública: autorizar la publicación, acceder a la cuenta/proyecto correcto y verificar el despliegue** siguiendo [DESPLIEGUE.md](DESPLIEGUE.md). No se verificó acceso a Vercel porque no se autorizó publicar. Build y configuración ya entregados. Las limitaciones de dispositivo/lector indicadas arriba no se presentan como pruebas realizadas.

Sin subagentes, cuarta etapa, repositorios remotos, commits, push ni despliegues. Git sigue siendo el repositorio superior de Proyectos; no se agregaron archivos a su índice ni se modificaron proyectos vecinos. Los servidores temporales de esta revisión se detienen al finalizar. Para abrir la web, npm run dev.
