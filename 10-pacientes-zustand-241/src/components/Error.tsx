// Componente para mostrar un error

// Recuerda que se utiliza children, es una prop especial de React y es de type React.ReactNode
export default function Error({ children }: { children: React.ReactNode }) {
    return (
        // Muestra el mensaje de error
        <p className="text-center my-4 bg-red-600 text-white font-bold p-3 uppercase text-sm">{children}</p>
    )
}
