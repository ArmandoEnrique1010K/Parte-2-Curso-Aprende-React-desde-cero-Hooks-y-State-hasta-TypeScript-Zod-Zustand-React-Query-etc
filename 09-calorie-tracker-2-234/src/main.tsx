import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ActivityProvider } from './context/ActivityContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envuelve ActivityProvider al componente principal, provider es de donde vienen los datos */}
    <ActivityProvider>
      {/* Finaliza el proyecto escribiendo en la consola "npm run build" para hacer un deploy del proyecto y subirlo a Netlify */}
      <App />
    </ActivityProvider>
  </StrictMode>,
)
