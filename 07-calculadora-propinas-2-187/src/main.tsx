import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Escribe el comando npm run build para generar la carpeta dist y luego subirlo a Netlify */}

    {/* Uno de los errores que se puede ver en la consola es que no puede continuar si hay importaciones que no se estan utilizando */}
    <App />
  </StrictMode>,
)
