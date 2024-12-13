import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Recuerda el comando "npm run build" para hacer un deploy del proyecto y subirlo a Netlify arrastrando la carpeta dist (el proyecto no incluye variables de entorno) */}
    <App />
  </StrictMode>,
)
