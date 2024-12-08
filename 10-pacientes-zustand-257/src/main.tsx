import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {/* Realiza un deploy en el proyecto con "npm run build", tambien sirve para ver los errores en el caso de que existieran por lo cual se tiene que corregir. Puedes subir la carpeta dist a Netlify */}
  </StrictMode>,
)
