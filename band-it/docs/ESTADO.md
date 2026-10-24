# Estado de la entrega

## Actualización de catálogo solicitada · 23 de octubre de 2026

Petición posterior al cierre del MVP: investigar y añadir ejercicios. Se resuelve en esta misma entrega, sin subagentes ni una nueva secuencia de etapas. Se mantienen exactamente el inventario de cinco bandas y las dos agarraderas; sin nuevos tipos de banda, accesorios, dependencias ni despliegues.

### Resultado

- Siete ejercicios: los tres originales más **remo inclinado, apertura de banda, remo vertical y curl martillo**. Filtro Espalda y búsqueda por nombres alternativos (pull apart, remo al mentón, antebrazo).
- Trayectorias distintas para remo, apertura y remo vertical. Torso, cabeza y hombros inclinados desde cadera en remo. Banda entre manos en apertura, con tramos del suelo ocultos. El martillo comparte la flexión de codo del curl con orientación de agarradera y pulgar propia; variante justificada de agarre, conservando el accesorio.
- Pasos y referencias visibles por ejercicio. Conservadas las advertencias de apoyo condicionado al fabricante, rango cómodo y resistencia nominal. La animación no simula tensión ni determina si la longitud de la banda real permite ese movimiento.
- La primera imagen se toma como referencia visual de remo vertical: se representa sin cruzar la banda y con recorrido más corto. La tercera coincide con la apertura. La segunda no permite identificar la secuencia y muestra una banda cerrada: no se copia ni se añade ese tipo de banda. Investigación y adaptaciones en [FUENTES.md](FUENTES.md).
- Filtros con salto de línea para evitar desbordamientos; lista desplazable en escritorio cuando supera 660 px. En móvil conserva su desplazamiento horizontal. Fases del ciclo ahora Ida / Extremo del recorrido / Regreso para servir también a movimientos horizontales.

### Comprobaciones de esta actualización

- `npm ci --offline --cache .npm-cache`: correcto con lockfile, 15 paquetes; auditoría local 0 vulnerabilidades reportadas, sin consulta de auditoría actualizada en línea.
- `npm test`: **6/6 aprobadas**. Se amplían los controles de longitudes, agarres, continuidad y simetría a los siete movimientos: 2,814 poses para invariantes y 7,000 pares de muestras para continuidad/simetría. Comprobaciones adicionales de torso del remo, apertura horizontal, codos del remo vertical y diferencia de agarre martillo/curl. Son controles geométricos, no validación biomecánica.
- `npm run build`: correcto. HTML 0.74 kB, CSS 10.72 kB, interfaz 18.98 kB, visor diferido 506.76 kB (127.62 kB gzip calculado por Vite). Sigue el aviso de chunk superior a 500 kB; no se incorporan modelos externos ni dependencias.
- Navegador integrado Chromium, build servido exclusivamente por loopback. Escritorio a 1366 × 900 y móviles simulados 390 × 844 / 360 × 800. clientWidth/scrollWidth: 1351/1351, 375/375 y 345/345, respectivamente: sin desbordamiento horizontal del documento. No se usó teléfono físico.
- Selección y pasos de los cuatro nuevos ejercicios comprobados. Inspeccionados extremos con recorrido manual por teclado: remo de perfil, apertura y remo vertical de frente, martillo de perfil. Apertura revisada en móvil; controles de cámara, zoom, restablecer, reproducción, pausa y velocidad 1.5× operados. Se observó avance en reproducción y valor 66 conservado entre dos lecturas separadas tras pausar; no es una nueva medición de rendimiento.
- Buscar «antebrazo» encuentra martillo (1/7); combinar con Espalda produce cero. Limpiar recupera 7/7. Espalda muestra 2/7 y «pull apart» encuentra apertura (1/7).
- Seleccionados los cinco colores y comprobados sus estados textuales. Inspección visual de banda amarilla en escritorio y roja en apertura móvil. El resto de colores conserva el código del visor ya revisado anteriormente; no se guardó captura de cada uno.
- Movimiento reducido simulado al cargar: inicio detenido, aviso y recorrido manual funcionales. WebGL bloqueado mediante QA: modo textual, controles 3D ocultos y tres pasos disponibles para cada uno de los cuatro ejercicios nuevos. No se repitió pérdida/restauración de contexto ni evento de pestaña oculta en esta actualización.
- Consola: sin errores/avisos antes del ensayo sin WebGL. Después solo se observaron los dos registros esperados de creación de contexto bloqueada. No se realizó una nueva auditoría integral de contraste, lector de pantalla o tacto físico.

Capturas del build: [catálogo ampliado](catalogo-ampliado.jpg), [apertura en 360 px](catalogo-movil-360.jpg). La segunda incluye el panel local de QA de movimiento reducido, que no pertenece al build distribuido.

Sin push, commit, repositorio remoto ni publicación. Los límites del equipo desconocido y de verificación física siguen vigentes. El registro siguiente corresponde al cierre previo de tres ejercicios y se conserva como evidencia histórica.

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
