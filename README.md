# Rick and Morty - Technical Assessment

Este proyecto es una aplicación web desarrollada con **Next.js (React 19)** y **TypeScript** que permite explorar los personajes de la serie Rick and Morty, visualizar sus detalles y gestionar una lista de favoritos persistida en una base de datos simulada.

## 🚀 Instrucciones para levantar el proyecto

Para ejecutar este proyecto localmente, necesitas tener Node.js instalado.

1. **Instalar dependencias:**
   ```bash
   npm install
   ```
2. **Levantar la base de datos simulada (JSON Server):**
   En una terminal, ejecuta el siguiente comando para levantar el servidor en el puerto 4000. Esto es necesario para la funcionalidad de Favoritos.
   ```bash
   npm run server
   ```

3. **Levantar el entorno de desarrollo:**
   Abre una segunda terminal y ejecuta:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

4. **Correr Pruebas Unitarias:**
   El proyecto cuenta con pruebas unitarias usando Jest y React Testing Library.
   ```bash
   npm run test
   ```


---

## 💡 Preguntas 

### ¿Qué es lo que más te gustó de TU desarrollo?
Lo que más disfruté fue aplicar principios de **Diseño Atómico** y la modularización de la arquitectura. En lugar de tener un único componente monolítico, logré separar la lógica en componentes reutilizables y tipados con TypeScript (`CharacterCard`, `FavsMenu`). Además, la integración de **Zustand** para el manejo del estado global resultó en un flujo de datos muy limpio, eliminando por completo el problema de *prop drilling* entre los componentes y facilitando la escalabilidad del proyecto.

### Si hubieras tenido más tiempo ¿qué hubieras mejorado o qué más hubieras hecho?
1. **Paginación Infinita / Virtualización:** Implementaría un scroll infinito o virtualización de listas (con algo como `react-window`) para manejar escenarios donde la búsqueda arroje cientos de resultados sin penalizar el rendimiento del DOM.
2. **Testing E2E:** Agregaría pruebas *End-to-End* con Cypress o Playwright para asegurar el flujo completo del usuario (desde la búsqueda hasta guardar un favorito en el json-server).
3. **Manejo de Errores Global:** Implementaría *Error Boundaries* más robustos y *Skeleton Loaders* generalizados para transiciones más suaves entre rutas o estados de carga fallidos.

### Descríbenos un pain point o bug con el que te hayas encontrado y cómo lo solucionaste.

Durante el desarrollo me encontré con dos retos técnicos interesantes:

**1. Bug en el código base: Mal parseo de la URL de la API**
Al revisar el repositorio inicial proporcionado, detecté un bug crítico en la función encargada de traer los datos (`getCharacters`). La URL de la API estaba mal construida y harcodeada, lo que generaba un mal parseo y rompía las peticiones de red.
**Solución:** En lugar de simplemente corregir el string de la URL, decidí resolver el problema de raíz implementando una arquitectura más limpia. Creé un módulo de servicios dedicado (`services/rickMorty.ts`) para abstraer toda la comunicación externa. Esto no solo solucionó el bug, sino que centralizó los métodos (`getCharacters`, `getCharacterByName`), permitió un tipado estricto con TypeScript para las respuestas de la API, y dejó a los componentes de UI completamente libres de lógica de *fetch*.

**2. Renders en cascada por inicialización síncrona en useEffect**
Al conectar el estado global (Zustand) con la carga inicial de datos desde el servicio, me topé con el error de React: *"Calling setState synchronously within an effect can trigger cascading renders"*. 
**Solución:** El problema se debía a que el `useEffect` intentaba actualizar el estado global del personaje seleccionado inmediatamente después del primer render, obligando a React a interrumpir su ciclo. Lo solucioné aplicando patrones de React 19: moví el reseteo de la paginación a un modelo basado en eventos (disparado desde el formulario) y utilicé un `useRef` como bandera (`hasInitialized.current = true`) para garantizar que el seteo inicial ocurriera de forma segura y estrictamente una sola vez, eliminando el bucle de renderizado.