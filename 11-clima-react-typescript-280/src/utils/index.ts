// Archivos para las funciones auxiliares

// Convierte la temperatura de grados kelvin a celcius
export const formatTemperature = (temperature: number): number => {
    // 0°C es igual a 273.15K
    const kelvin = 273.15
    // Realiza la operación y redondea la temperatura
    // ParseInt convierte un string a un entero
    return parseInt((temperature - kelvin).toString())
}