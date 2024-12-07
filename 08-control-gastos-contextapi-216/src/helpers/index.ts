export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}

// Función para formatear una fecha (debe retornar un string)
export function formatDate(dateStr: string): string {
    // Convierte un objeto de tipo fecha
    const dateObj = new Date(dateStr)

    // Para las opciones, se asigna el tipo de dato Intl.DateTimeFormatOptions, es un objeto con toda la información
    const options: Intl.DateTimeFormatOptions = {
        // Dia de la semana, año, mes y dia
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    // Intl.DateTimeFormat es un constructor para convertir un string a un formato de fecha, se especifica el idioma español, las opciones y con el metodo format el string
    return new Intl.DateTimeFormat('es-ES', options).format(dateObj);
}