// Componente para el mensaje de error, recibe un children como prop
export default function ErrorMessage({ children }: { children: React.ReactNode }) {
    return (
        // Solamente muestra el valor de children
        <div>{children}</div>
    )
}
