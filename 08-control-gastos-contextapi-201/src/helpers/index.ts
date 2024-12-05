// Función para formatear una cantidad numerica a moneda estadounidense
export function formatCurrency(amount: number) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
}