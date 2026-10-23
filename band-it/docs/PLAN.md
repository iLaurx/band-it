# Plan de tres etapas

**Cierre: 23 de octubre de 2026. Las tres etapas principales están realizadas.** Evidencia y límites en [ESTADO.md](ESTADO.md). Build y configuración listos; publicación pendiente de autorización y acceso al proyecto de Vercel, con pasos en [DESPLIEGUE.md](DESPLIEGUE.md). Este plan se conserva como alcance de referencia, sin abrir una cuarta etapa.

## 1 — Base
Entregables: Vite, Three.js, escena articulada, tres movimientos iniciales, inventario exacto, interfaz en español adaptable, README, AGENTS, fuentes, prompts, configuración Vercel y validación del catálogo. Mantener el alcance acotado para que las siguientes dos etapas puedan cerrar el producto.

## 2 — Producto y movimientos
- Revisar las animaciones de frente, perfil y durante todo el ciclo. Corregir uniones, longitud de segmentos, agarre, continuidad de la banda y apoyo bajo pies.
- Evaluar expansión a 6–8 ejercicios solo si existen variantes compatibles con el equipo confirmado y fuentes suficientes. No completar una cuota con ejercicios dudosos; el MVP puede cerrar con los tres iniciales.
- Agregar metadatos de equipo/apoyo y referencias por ejercicio si se amplía el catálogo.
- Mejorar información visual y ergonomía móvil, conservando el lenguaje visual verde oscuro y lima salvo indicación del usuario.
- No introducir rutinas, calendarios, cuentas ni almacenamiento remoto; quedan fuera del MVP.
- Cierre: filtros y estados funcionan; movimientos distinguibles; todo el contenido visible concuerda con el equipo; pruebas y build pasan. Documentar cualquier animación todavía esquemática.

## 3 — Validación y entrega
- Verificar escritorio y móvil (ancho 390 px y 360 px), teclado y contraste; corregir desbordamientos.
- Probar selección, cero resultados, cambio de banda, pausa, velocidad, rotación, zoom y restablecer.
- Probar reducción de movimiento, fallo de WebGL, carga y pérdida del contexto si es viable. Asegurar que las instrucciones permanecen disponibles.
- Revisar rendimiento: carga diferida de Three.js, un solo renderizador, geometrías reutilizadas y ausencia de peticiones innecesarias. Medir antes de introducir optimizaciones.
- Ejecutar npm test y npm run build. Registrar checks y límites reales.
- Preparar y, si está autorizado y hay acceso, publicar en Vercel. Comprobar la URL. Si falta acceso, entregar el build y las instrucciones exactas, marcando el despliegue pendiente.
- Actualizar README y estado para reflejar el resultado final, sin promesas pendientes ocultas.

## Definición de página terminada
Catálogo compatible con bandas y agarraderas; movimientos diferenciados y entendibles; instrucciones claras; español; móvil y escritorio; acceso por teclado; alternativa textual sin WebGL; compilación reproducible; configuración de Vercel; sin errores conocidos que impidan el flujo principal. Publicación completada solo con URL verificada.
