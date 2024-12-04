import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Recordando como hacer deployment del proyecto */}

    {/* 1. Abre una terminal y escribe el comando "npm run build". Solamente si no hay errores en el proyecto con typescript, puedes ignorar las advertencias */}

    {/* 2. Sube la carpeta de dist a Netlify, ve a la sección sites y arrastra esa carpeta para subirlo */}

    {/* 3. Accede al dominio haz clic en la URL generada o en el botón Open production deploy */}
  </StrictMode>,
)
