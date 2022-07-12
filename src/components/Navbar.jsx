import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';

export const Navbar = () => {

    const activeStyle = {
        activate: "inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 duration-200",
        desactivate: "inline-block p-4 w-full bg-white hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700 duration-200"
    }


    const logout = () => {
        localStorage.removeItem('token')
        Navigate('/')
    }


    return (
        <div>
            <nav>

                <ul className="text-sm font-medium text-center text-gray-500 rounded-lg divide-x divide-gray-200 shadow sm:flex">

                    <li className="w-full">
                        <NavLink
                            className={({ isActive }) => (isActive ? activeStyle.activate : activeStyle.desactivate)}
                            to="/home">
                            Home
                            <HomeIcon className="ml-2" />
                        </NavLink>
                    </li>

                    <li className="w-full">
                        <NavLink
                            className={({ isActive }) => (isActive ? activeStyle.activate : activeStyle.desactivate)}
                            to="chat">
                            Chats
                            <ChatIcon className="ml-2" />
                        </NavLink>
                    </li>

                    <li className="w-full">
                        <NavLink
                            className={({ isActive }) => (isActive ? activeStyle.activate : activeStyle.desactivate)}
                            to="amigos">
                            Amigos
                            <PeopleIcon className="ml-2" />
                        </NavLink>
                    </li>

                    <li className="w-full">
                        <NavLink
                            className={({ isActive }) => (isActive ? activeStyle.activate : activeStyle.desactivate)}
                            to="configuracion">
                            Config
                            <SettingsIcon className="ml-2" />
                        </NavLink>
                    </li>

                    <li className="w-full">
                        <NavLink
                            className={({ isActive }) => (isActive ? activeStyle.activate : activeStyle.desactivate)}
                            onClick={logout}
                            to="/">
                            Logout
                            <ExitToAppIcon className="ml-2" />
                        </NavLink>
                    </li>
                </ul>

            </nav>

        </div >
    )
}
