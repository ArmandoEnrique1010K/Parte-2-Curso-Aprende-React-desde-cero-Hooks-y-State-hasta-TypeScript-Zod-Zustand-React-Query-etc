import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.js'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Escribe el comando "npm run build" para subir el proyecto a Netlify, recuerda que el contenido de la carpeta dist se actualiza si ya existe esa carpeta con una versión anterior del proyecto */}
    <App />
  </StrictMode>,
)