import { buscarNuevoAmigo,sendSolicitud  } from '../services/amigo.services'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import PeopleIcon from '@mui/icons-material/People';
import { toast } from 'react-toastify';

export const Buscar = () => {

    const [resultados, setResultados] = useState({})
    const [cerrar, setCerrar] = useState(false)
    const BASE_URL = process.env.REACT_APP_BASE_URL

    const buscarAmigo = async (e) => {
        const response = await buscarNuevoAmigo(e.target.value)
        setResultados(response)
        setCerrar(true)
    }

    const handleCerrar = () => {
        setCerrar(false)
    }

    const agregar = async (id) => {
        const response = await sendSolicitud(id)
        setCerrar(false)
        if(response.status === 200){
            toast.success(response.data.message)
        }else if(response.status === 400){
            toast.error(response.data.message)
        }
    }
    return (
        <div>
            <div className='flex justify-center m-5'>
                <input
                    className="w-full bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    type="text"
                    placeholder="Buscar un nuevo amigo"
                    onKeyPress={(e) => { if (e.key === 'Enter') { buscarAmigo(e) } }}
                />
            </div>

            <div className='  flex justify-center'>

                {
                    resultados.status === 200 && cerrar &&
                    <div className='absolute'>
                        <div className='flex justify-end'>
                            <CloseIcon className='text-3xl text-red-500 cursor-pointer' onClick={handleCerrar} />
                        </div>

                        <div class="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
                            <div class="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                                <img class="object-cover object-center h-32" src={BASE_URL + "/" + resultados.data.data.avatar} alt={BASE_URL + "/" + resultados.data.data.avatar} />
                            </div>
                            <div class="text-center mt-2">
                                <h2 class="font-semibold">{resultados.data.data.nickName}</h2>
                                <p class="text-gray-500">Usuario desde {resultados.data.data.createdAt}</p>
                            </div>

                            <ul class="py-4 mt-2 text-gray-700 flex items-center justify-around">
                                <li class="flex flex-col items-center justify-between">
                                    <PeopleIcon className='text-3xl text-blue-500' />
                                    <div>{resultados.data.data.amigos.amigos.length}</div>
                                </li>
                            </ul>

                            <div class="p-4 border-t mx-8 mt-2">
                                <button class="w-full mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2"
                                        onClick={(e)=>{agregar(`${resultados.data.data.nickName}`)}}>Agregar</button>
                            </div>
                        </div>


                    </div>
                }
                {

                    resultados.status === 400 && cerrar &&
                    <div className='bg-white w-52 border m-3'>

                        <div className='flex justify-between'>
                            <h5>No se encontraron resultados</h5>
                            <CloseIcon className='text-3xl text-red-500 cursor-pointer' onClick={handleCerrar} />
                        </div>
                    </div>

                }
            </div>

        </div>
    )
}
