import React, { useEffect, useState } from 'react'
import { getAmigos, deleteAmigo, getSolicitudes, acceptSolicitud, deleteSolicitud } from '../services/amigo.services'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import { Buscar } from '../components/Buscar';

export const AmigosPage = () => {
  const [amigos, setAmigos] = useState([{}])
  const [solicitudes, setSolicitudes] = useState([{}])

  const [loading, setLoading] = useState(false)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    const obtenerInfo = async () => {
      const responseAmigos = await getAmigos()
      const responseSolicitudes = await getSolicitudes()
      console.log(solicitudes.data.data.solicitudes)
      console.log(responseAmigos)
      setSolicitudes(responseSolicitudes)
      setAmigos(responseAmigos)
      setLoading(true)
      return responseAmigos
    }



    obtenerInfo()
  }, [])

  const handleDelete = async (id) => {
    console.log(id)
  }

  const handleProfile = (id) => {
    console.log(id)
  }




  return (
    <div className='flex justify-center'>
      <div className=" m-5 flex w-4/5 text-center h-96 bg-white rounded-xl shadow-md flex-col">

        <div>
          <Buscar />
        </div>

        <div className='flex justify-center'>

          <div className='flex flex-col w-2/5  border m-1' id='ChatsDerecha'>
            <h5 className="mb-2 pb-3 text-3xl font-bold text-gray-900 border-b">Solicitudes</h5>
            {
              solicitudes.status === 200 && loading && solicitudes.data.data.solicitudes > 0 &&
              <ul>

                {solicitudes.amigos.map((amigo, index) => {
                  return (

                    <li
                      key={index}
                      className="flex shadow-lg px-3 m-2 py-2 text-sm transition rounded-lg duration-2000 ease-in-out border-b border-gray-300  hover:bg-gray-100">


                      <img className="object-cover w-10 h-10 rounded-full"
                        src={BASE_URL + "/" + amigo.avatar} alt={BASE_URL + "/" + amigo.avatar} />
                      <div className="w-full pb-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="block ml-4 font-bold text-lg text-black">{amigo.nickName}</span>
                        </div>

                        <div className='flex'>

                          <DoneIcon className='cursor-pointer m-2' onClick={() => handleProfile(`${amigo.nickName}`)} />
                          <DeleteIcon className='cursor-pointer m-2 text-red-600' onClick={() => handleDelete(`${amigo.nickName}`)} />
                        </div>
                      </div>

                    </li>
                  )
                }
                )}
              </ul>

            }
            {
              solicitudes.status === 200 && loading && solicitudes.data.data.length === 0 &&

              <div>
                No tienes solicitudes
              </div>
            }
            {
              solicitudes.status === 404 && loading &&
              <span className="block ml-4 font-bold text-lg text-black">No tienes solicitudes</span>

            }

          </div>





          <div className='flex flex-col w-3/5 border m-1'>
            <h5 className="mb-2 pb-3 text-3xl font-bold text-gray-900 border-b">Amigos</h5>
            {
              amigos.status === 200 && loading &&
              <ul>

                {amigos.amigos.map((amigo, index) => {
                  return (

                    <li
                      key={index}
                      className="flex shadow-lg px-3 m-2 py-2 text-sm transition rounded-lg duration-2000 ease-in-out border-b border-gray-300  hover:bg-gray-100">


                      <img className="object-cover w-10 h-10 rounded-full"
                        src={BASE_URL + "/" + amigo.avatar} alt={BASE_URL + "/" + amigo.avatar} />
                      <div className="w-full pb-2 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="block ml-4 font-bold text-lg text-black">{amigo.nickName}</span>
                        </div>

                        <div className='flex'>

                          <AccountBoxIcon className='cursor-pointer m-2' onClick={() => handleProfile(`${amigo.nickName}`)} />
                          <DeleteIcon className='cursor-pointer m-2 text-red-600' onClick={() => handleDelete(`${amigo.nickName}`)} />
                        </div>
                      </div>

                    </li>
                  )
                }
                )}
              </ul>
            }
            {
              amigos.status === 404 && loading &&
              <span className="block ml-4 font-bold text-lg text-black">No tienes amigos</span>

            }

          </div>
        </div>
      </div>





    </div>
  )
}
