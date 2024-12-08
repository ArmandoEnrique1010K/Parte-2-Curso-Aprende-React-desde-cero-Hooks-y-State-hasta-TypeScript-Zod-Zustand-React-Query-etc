// Crea este componente para mostrar un elemento del paciente (un detalle)

// Para que sea reutilizable, debe tomar el label (tipo de información) y data (la información)
type PatientDetailItemProps = {
    label: string,
    data: string
}

export default function PatientDetailItem({ label, data }: PatientDetailItemProps) {
    return (
        // Muestra los valores de las props label y data
        <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {''}
            <span className="font-normal normal-case">{data}</span>
        </p>
    )
}
