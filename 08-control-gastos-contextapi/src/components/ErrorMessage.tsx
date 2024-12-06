// Componente para el mensaje de error

import { ReactNode } from "react"

// type para el children, se asigna ReactNode
type ErrorMessageProps = {
    children: ReactNode
}

// ReactNode renderiza Strings, componentes dentro de otros componentes
// Una alternativa es PropWithChildren, solamente si pasa la validación de TypeScript funciona correctamente
// https://medium.com/@colorsong.nabi/propswithchildren-vs-reactnode-in-typescript-c3182cbf7124


// Para que sea dinamico recibe la prop children
export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        // El mensaje de error se renderiza dentro de un parrafo
        <p className='bg-red-600 p-2 text-white font-bold text-sm text-center'>
            {children}
        </p>
    )
}
