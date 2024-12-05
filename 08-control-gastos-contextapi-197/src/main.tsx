import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* context rodea a toda la aplicación y de esa forma va a permitir acceder a las funciones y states que se tienen en el Provider */}
    <BudgetProvider>
      {/* App se coloca dentro de BudgetProvider, de esta forma el estado estara disponible de forma global */}
      <App />
      {/* Abre React Developer Tools, se ve los componentes BudgetProvider y Context.Provider de esa forma se tiene acceso a la información */}
    </BudgetProvider>
  </StrictMode>,
)
