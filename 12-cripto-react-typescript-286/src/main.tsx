import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Comandos para crear el proyecto */}
    {/* 
      cd <<Ruta de la carpeta>>
      npm create vite@latest
      12-cripto-react-typescript
      React
      TypeScript + SWC
      cd 12-cripto-react-typescript
      npm install
      npm run dev
    */}

    {/*
      Elimina la carpeta assets, el archivo App.css, el archivo react.svg (se encuentra en la carpeta assets) limpia el componente App.tsx y borra el contenido de index.css

      Sube una imagen para el fondo de la aplicación en la carpeta public
    */}
    <App />
  </StrictMode>,
)
