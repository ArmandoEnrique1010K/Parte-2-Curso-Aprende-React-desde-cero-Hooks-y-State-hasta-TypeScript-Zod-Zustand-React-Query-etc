import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ZUSTAND - ESTADO GLOBAL DE FORMA SIMPLE */}

    {/* Zustand es una depenencia para manejar un estado global en tus aplicaciones de React */}

    {/* Su API es bastante sencilla y se puede utilizar con JS y TS */}

    {/* Es una de las principales alternativas a Redux Toolkit */}

    {/* https://www.npmjs.com/package/zustand */}
    {/* https://github.com/pmndrs/zustand */}

    {/* Comando para instalar zustand: npm i zustand */}

    {/* STORE DE ZUSTAND */}

    {/* Es lo mismo que un reducer, se coloca el state y las funciones que modifica el state */}

    {/* Puedes crear una carpeta para almacenar el store y colocar el archivo typescript que contiene el store o puedes colocar el archivo junto al main.tsx o App.tsx  */}
    <App />
  </StrictMode>,
)
