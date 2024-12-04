import { useReducer } from 'react';
import MenuItem from './components/MenuItem';
import OrderContents from './components/OrderContents';
import OrderTotals from './components/OrderTotals';
import TipPercentageForm from './components/TipPercentageForm';
import { menuItems } from './data/db'
// import useOrder from './hooks/useOrder';
import { initialState, orderReducer } from './reducers/order-reducer';

function App() {

  // Como ya no se utiliza el hook useOrder, se elimina
  // const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder();

  // Llama al reducer, requiere la función de tipo reducer y el state inicial (desde order-reducer)
  const [state, dispatch] = useReducer(orderReducer, initialState)

  return (
    <>
      <header className='bg-teal-400 py-5'>
        <h1 className='text-center text-4xl font-black'>Calculadora de Propinas y Consumo</h1>
      </header>

      <main className='max-w-7xl mx-auto py-20 grid md:grid-cols-2'>
        <div className='p-5'>
          <h2 className='text-4xl font-black'>Menú</h2>

          <div className='space-y-3 mt-10'>
            {menuItems.map(item => (
              <MenuItem
                key={item.id}
                item={item}
                // Pasa la función dispatch en lugar de addItem
                // El tipo de dato es: React.Dispatch<OrderActions>
                dispatch={dispatch}
              // addItem={addItem}
              />
            ))}
          </div>
        </div>

        <div className='border border-dashed border-slate-300 p-5 rounded-lg space-y-10'>

          {/* En lugar de order se utiliza state.order para utilizar el estado definido en order-reducer */}
          {
            state.order.length ? (
              <>
                {/* Para no pasar el order que se encuentra en el custom hook useOrder, se pasa state.order */}
                <OrderContents
                  order={state.order}
                  // En lugar de removeItem se utiliza dispatch
                  // removeItem={removeItem}
                  dispatch={dispatch}
                // Ahora puedes agregar items a la orden y se muestran en el navegador
                />

                <TipPercentageForm
                  // En lugar de setTip se llama al dispatch
                  // setTip={setTip}
                  dispatch={dispatch}
                  // El tipo de dato es React.Dispatch<OrderActions>, se infiere al colocar el cursor en dispatch

                  // En cuanto a la propina, aqui sera state.tip para que este conectado con el reducer
                  tip={state.tip}
                />

                {/* Para actualizar las propinas se tiene que pasar el state.order y state.tip en las props requeridas */}
                <OrderTotals
                  order={state.order}
                  tip={state.tip}
                  // Puedes observar el resultado al agregar un item y asignar una propina de un 10%, 20% o 50%

                  // Cambia placeOrder por dispatch
                  // placeOrder={placeOrder}
                  dispatch={dispatch}
                />
              </>
            ) : (
              <p className='text-center'>La orden esta vacia</p>)
          }

        </div>

      </main>
    </>
  )
}

export default App
