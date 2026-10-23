# Prompts principales restantes

La base corresponde a la etapa 1. Ejecutar estos dos prompts secuencialmente en esta misma carpeta. Máximo tres agentes/sesiones principales contando la base; no crear subagentes.

## Prompt 2 — Completar el producto

```text
Continúa Band·it en este repositorio. Eres la etapa 2 de un máximo de 3 etapas principales. Lee AGENTS.md, README.md, docs/PLAN.md, docs/ESTADO.md y docs/FUENTES.md. No crees subagentes.

Convierte la base en un producto completo dentro del alcance del MVP. Mi equipo consiste exclusivamente en cinco bandas (roja 50 lb, negra 40 lb, verde 30 lb, azul 20 lb, amarilla 10 lb) y agarraderas. No tengo anclajes ni accesorios adicionales. No prescribas pesos ni asumas marca o longitudes.

Revisa y mejora las tres animaciones Three.js desde varios ángulos: articulaciones, agarre, continuidad de banda y punto de apoyo. Cada ejercicio debe tener movimiento específico y pasos coherentes. Puedes ampliar a 6–8 ejercicios únicamente si son compatibles con el equipo y puedes respaldar su técnica en fuentes primarias. Si no, termina bien los tres existentes sin rellenar el catálogo. Mantén visibles las limitaciones del modelo esquemático.

Completa la interfaz móvil en español, estados de búsqueda/filtros, controles accesibles, reducción de movimiento y alternativa sin WebGL. Conserva simplicidad, estilo y arquitectura salvo razón concreta. No agregues cuentas, rutinas personalizadas ni backend. Ejecuta pruebas y compilación, comprueba el navegador y actualiza docs/ESTADO.md y referencias. No publiques todavía. Entrega trabajo terminado, evidencia y pendientes concretos para la tercera y última etapa.
```

## Prompt 3 — Cerrar y preparar/publicar en Vercel

```text
Continúa Band·it en este repositorio. Eres la tercera y última etapa principal. Lee AGENTS.md, README.md, docs/PLAN.md y docs/ESTADO.md. No crees subagentes ni dejes tareas que puedas resolver para una cuarta etapa.

Realiza la revisión final y corrige los problemas encontrados. Comprueba navegador en escritorio y móvil de 360/390 px, teclado, filtros, cero resultados, selección de ejercicios, banda visible, movimientos, pausa, velocidad, cámara y zoom. Comprueba reducción de movimiento y alternativa si no existe WebGL. Revisa el contenido frente al equipo disponible: solo bandas y agarraderas, sin accesorios inventados. No afirmes validación biomecánica.

Ejecuta npm test y npm run build y resuelve los errores. Revisa tamaño de descarga y rendimiento antes de optimizar. Actualiza documentación y estado con evidencia real, sin marcar como verificados controles que no probaste.

Deja la web lista para Vercel. Si en esta sesión te autorizo a publicar y tienes acceso al proyecto correcto, despliega y verifica la URL; de lo contrario entrega la configuración y los pasos exactos, indicando que solo falta la publicación. No modifiques ni subas otros proyectos del directorio superior. Cierra con lo implementado, pruebas y URL o pendiente de acceso, sin ampliar el alcance del MVP.
```
