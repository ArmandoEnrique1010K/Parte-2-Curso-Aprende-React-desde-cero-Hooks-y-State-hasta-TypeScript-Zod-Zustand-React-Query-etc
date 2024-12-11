import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*
    # Copia del codigo del archivo ".env.local"

    # El archivo ".env.local" se crea fuera de la carpeta src, no se sube a github

    # Una variable de entorno lleva el prefijo "VITE_"

    # Llave del API Weather
    VITE_API_KEY = f428d227d2e294c72178a78ff9b3056d

    # Vuelve a ejecutar la aplicación luego de crear las variables de entorno, en la consola, utiliza lo siguiente para ver todas las variables de entorno

    # console.log(import.meta.env)

    # Esta variable de entorno no se mostrara porque no lleva el prefijo "VITE_"
    # EMAIL_PASSWORD = 12345

    # En conclusión, el uso del archivo ".env.local" sirve para definir las variables de entorno por el tema de la seguridad de la aplicación web en un entorno de desarrollo.
    */}
    <App />
  </StrictMode>,
)
