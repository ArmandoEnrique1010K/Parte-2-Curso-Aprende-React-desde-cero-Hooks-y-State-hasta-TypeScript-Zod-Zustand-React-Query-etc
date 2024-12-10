export type SearchType = {
    city: string
    country: string
}

export type Country = {
    code: string
    name: string
}

// No se recomienda crear un type para la data que se obtiene de la respuesta luego de realizar un petición a una API
export type Weather = {
    // Datos que se necesitan para la aplicación
    name: string
    main: {
        temp: number
        temp_max: number
        temp_min: number
    }
}