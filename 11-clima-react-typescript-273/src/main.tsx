import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
      # Copia del codigo del archivo ".env.local" (recuerda que no se sube a github ese archivo porque se ha creado fuera de al carpeta src y contiene las variables de entorno)

      VITE_API_KEY = f428d227d2e294c72178a78ff9b3056d
    
    */}
    <App />
  </StrictMode>,
)
