# Publicar Band·it en Vercel

Estado al 23 de octubre de 2026: build local terminado; **sin publicación ni URL pública**. En esta sesión no se recibió autorización para publicar. No se inició sesión ni se verificó acceso a una cuenta/proyecto de Vercel.

## Desde esta carpeta, sin repositorio remoto

Ejecutar estos pasos solo cuando se decida publicar. La CLI puede pedir instalar el paquete oficial `vercel` y autenticar la cuenta.

```powershell
Set-Location -LiteralPath 'C:\Users\ele\Documents\Proyectos\band-it'
npm ci
npm test
npm run build
npx vercel@latest login
npx vercel@latest --cwd 'C:\Users\ele\Documents\Proyectos\band-it'
```

En la configuración interactiva:

1. Confirmar la cuenta o equipo propietario correcto.
2. Si ya existe el proyecto de Band·it, enlazarlo y verificar su nombre. Si no existe, crear `band-it` únicamente al autorizar su publicación. No elegir otro proyecto por similitud de nombre.
3. Directorio de código: `./`, dentro de Band·it. Framework Vite. Instalación `npm ci`, compilación `npm run build`, salida `dist`. No requiere variables de entorno, backend ni servicios de pago.
4. Usar Node **24.x** en Project Settings → Build and Deployment (revisión local con 24.21.0). Aceptar la configuración de `vercel.json`.
5. Abrir la URL de Preview que devuelve la CLI y revisar carga 3D, selección, banda, cámara, zoom, pausa y pasos desde escritorio y móvil. Verificar que no aparecen solicitudes fallidas de recursos. La Preview puede estar protegida por la cuenta.

Tras comprobar que `.vercel/project.json` corresponde al proyecto y propietario elegidos, publicar en producción:

```powershell
npx vercel@latest --prod --cwd 'C:\Users\ele\Documents\Proyectos\band-it'
```

Abrir la URL de producción que devuelve Vercel, recargarla directamente y repetir el flujo principal en escritorio y móvil. Solo entonces registrar esa URL y la fecha en ESTADO.md. No se conoce ahora un dominio ni una URL pública de este proyecto.

`.vercelignore` evita enviar dependencias, caché, capturas, herramientas de QA y documentación con la CLI. El despliegue reconstruye `dist` desde el lockfile. La aplicación tiene una sola página y no necesita reescrituras de rutas.

## Alternativa por Git

Usar un repositorio dedicado que contenga exclusivamente Band·it. Actualmente `git rev-parse --show-toplevel` devuelve `C:/Users/ele/Documents/Proyectos`: **no conectar ese repositorio superior ni subir su contenido**. Si se prepara un repositorio independiente, hacerlo fuera de ese Git superior o con aislamiento explícito y subir solo esta web.

En Vercel → Add New → Project, importar el repositorio dedicado. Root Directory `./`, framework Vite, Node 24.x, `npm ci`, `npm run build`, `dist`, sin variables. Publicar y verificar la URL como arriba.

## Referencias oficiales revisadas

- [Vite en Vercel](https://vercel.com/docs/frameworks/frontend/vite).
- [Vercel CLI deploy](https://vercel.com/docs/cli/deploy).
- [Exclusiones con .vercelignore](https://vercel.com/docs/deployments/vercel-ignore).

No se ejecutaron los comandos de publicación ni se crearon repositorios, commits o push durante la revisión final.
