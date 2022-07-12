import React, { useEffect, useState } from 'react'
import { getChats } from '../services/chat.services'
export const ChatPage = () => {
  const [chats, setChats] = useState([{}])
  const [loading, setLoading] = useState(false)
  const BASE_URL = process.env.REACT_APP_BASE_URL

  useEffect(() => {
    const obtenerChats = async () => {
      const response = await getChats()

      setChats(response.data)

      const user = JSON.parse(localStorage.getItem('user'))
      const miembros = response.data.data.map(chat => {
        return chat.miembros.map(member => {
          let nickname
          if (member.nickName === user.nickName) {
            nickname = {
              nickName: member.nickName,
              avatar: member.avatar,
              id: member.id
            }
          }
          return nickname
        })
      })

      console.log(miembros)



      //Buscamos dentro del array cual es el objeto que contenga el nickname del usuario


      setLoading(true)
      return response
    }
    obtenerChats()
  }, [])



  const handleClick = async (id) => {

  }

  return (
    <div className='flex justify-center'>
      <div className=" m-8 flex w-4/5 text-center bg-white rounded-xl shadow-md flex-row">






        <div className="flex flex-col justify-center border-r w-2/5" id='Chats Izquierda'>



          <h5 className="mb-2 text-3xl font-bold text-gray-900">Tus chats</h5>
          <div className="justify-center items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

            {loading &&
              <ul className="w-80">

                {chats.data.map((chat, index) => {
                  return (
                    <li onClick={() => handleClick(chat)}
                      key={index}
                      className="flex items-center px-3 py-2 text-sm transition rounded-lg duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none">
                      <img className="object-cover w-10 h-10 rounded-full"

                        src={BASE_URL + "/" + chat.miembros[1].avatar} alt={BASE_URL + "/" + chat.miembros[1].avatar} />
                      <div className="w-full pb-2">
                        <div className="flex justify-between">
                          <span className="block ml-2 font-semibold text-gray-600">{chat.miembros[1].nickName}</span>
                          <span className="block ml-2 text-sm text-gray-600">6 hour</span>





                        </div>
                        <span className="block ml-2 text-sm text-gray-600">Ultimo mensaje</span>
                      </div>

                    </li>
                  )
                })}
              </ul>
            }
          </div>



        </div>






        <div className='flex justify-center w-3/5' id='ChatsDerecha'>
          <h5 className="mb-2 text-3xl font-bold text-gray-900">Mensajes</h5>


        </div>






      </div>
    </div>
  )
}
