import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      {/* Para finalizar el desarrollo de la aplicación, escribe el comando "npm run build" para generar la carpeta dist del proyecto para publicarlo en Netlify */}
      <App />
    </BudgetProvider>
  </StrictMode>,
)
