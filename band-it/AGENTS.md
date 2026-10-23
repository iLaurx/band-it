# Band·it — instrucciones para agentes

## Objetivo y alcance
Web personal en español para explorar ejercicios con bandas y visualizar el movimiento con Three.js. Despliegue estático en Vercel. Priorizar móvil, claridad y simplicidad. Sin backend, cuentas, secretos ni servicios de pago para el MVP.

## Equipo confirmado
- Roja: 50 lb; negra: 40 lb; verde: 30 lb; azul: 20 lb; amarilla: 10 lb.
- Hay agarraderas. No hay anclajes de puerta, tobilleras, barra ni banco.
- No se conocen marca, longitud, material ni límite de estiramiento. No inventarlos.
- Resistencias nominales de la imagen; no representan una fuerza constante. No sumar cargas ni prescribir banda según músculo.
- El color inicial es para visualizar; no es una recomendación de carga.

## Reglas de contenido
- Solo ejercicios compatibles con banda y agarraderas, apoyadas bajo los pies si lo permite el fabricante. No introducir anclajes a muebles o puertas ni accesorios supuestos.
- Pasos, puntos de apoyo, orientación y animación deben coincidir. Cada ejercicio nuevo necesita un movimiento 3D propio o una variante justificada.
- No copiar la misma animación para movimientos diferentes. No presentar el modelo esquemático como validación biomecánica ni dar promesas médicas.
- Revisar fuentes primarias al ampliar contenido. Registrar referencias en docs/FUENTES.md y limitaciones en docs/ESTADO.md.
- Evitar cargas, series o repeticiones personalizadas sin contexto del usuario.

## Arquitectura
- Vite + JavaScript ES modules + Three.js. Mantener esta base salvo necesidad demostrada.
- src/data.js: inventario y catálogo. src/main.js: interfaz. src/viewer.js: escena y animaciones. src/style.css: diseño adaptable.
- Renderizador único, geometrías reutilizables, límite de pixel ratio, limpieza de recursos y pausa al ocultar pestaña. Evitar modelos externos pesados y dependencias innecesarias.
- Mantener alternativas textuales si falla WebGL y respetar reducción de movimiento. Botones operables por teclado y estados legibles sin depender solo de colores.
- Texto del buscador no debe insertarse en HTML. Los datos estáticos son internos; sanitizar si se admite contenido externo en el futuro.

## Flujo y validación
1. Leer README.md, docs/PLAN.md y docs/ESTADO.md antes de modificar.
2. Revisar instrucciones superiores aplicables y cambios locales. El directorio puede estar dentro de un Git superior: no agregar, commitear ni mover carpetas ajenas.
3. npm ci (con lockfile); npm test; npm run build. Si cambian dependencias, npm install y actualizar package-lock.json.
4. Verificar en navegador escritorio y móvil: selección, filtros, cero resultados, color 3D, pausa, velocidad, cámara, reducción de movimiento y alternativa sin WebGL. Separar checks ejecutados de pendientes.
5. Actualizar docs/ESTADO.md con alcance, evidencia y pendientes reales. No afirmar que se publicó sin URL de despliegue verificada.
6. No desplegar, hacer push ni crear repositorios remotos a menos que el usuario lo solicite.

## Presupuesto de agentes/prompts
Máximo tres etapas principales en total, contando la preparación inicial. No delegar ni crear agentes adicionales de forma automática. Los dos prompts restantes están en docs/PROMPTS.md. Cada etapa debe cerrar un resultado comprobable; no abrir una cuarta etapa para tareas que caben en la actual.
