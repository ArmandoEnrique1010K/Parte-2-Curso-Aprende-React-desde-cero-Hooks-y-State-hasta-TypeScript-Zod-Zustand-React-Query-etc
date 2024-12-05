import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Recuerda que se rodea la aplicación con el provider */}
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
