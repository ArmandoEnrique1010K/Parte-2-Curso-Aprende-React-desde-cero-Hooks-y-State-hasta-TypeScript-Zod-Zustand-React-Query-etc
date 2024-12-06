import { Fragment } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import { useBudget } from '../hooks/useBudget'
import ExpenseForm from './ExpenseForm';
// Componente para definir una ventana modal, se necesita instalar headlessui y heroicons de react

// Introduce en la terminal los comandos "npm i @headlessui/react" y "npm i @heroicons/react" para instalar las librerias
export default function ExpenseModal() {

    // Llama al custom hook, extrae el state y dispatch
    const { state, dispatch } = useBudget();

    return (
        <>
            <div className="fixed right-5 bottom-5 flex items-center justify-center">
                <button
                    type="button"
                    // Para mostrar el modal al hacer clic en el botón se define un evento onClick
                    onClick={() => dispatch({ type: 'show-modal' })}
                >
                    <PlusCircleIcon className='w-16 h-16 text-blue-600 rounded-full' />
                </button>
            </div>

            {/* Puedes cambiar el valor de la prop show a true para mostrar la ventana modal */}
            <Transition
                appear
                // show={false}
                // Cambia el valor que se envia a la prop show por el state de modal
                show={state.modal}
                as={Fragment}
            >
                {/* Este componente lleva un evento onClose, que tiene la estructura de un arrow function que contiene un callback para ejecutar algo */}
                <Dialog
                    as="div"
                    className="relative z-10"
                    // onClose={() => { }}
                    // Llama al dispatch para cerrar la ventana modal en el evento onClose
                    onClose={() => dispatch({ type: 'close-modal' })}
                // En el navegador, para cerrar la ventana modal, solamente haz clic fuera de la ventana modal
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    {/* Aqui se define el contenido de la ventana modal. En este caso renderiza el componente ExpenseForm */}
                                    <ExpenseForm />

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}