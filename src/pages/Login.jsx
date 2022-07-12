import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { login } from '../services/auth.services'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';

export const Login = () => {

    const styleForm = {
        incorrecto: "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400",
        default: "w-full border rounded-lg outline-none p-2",
    }

    const initForm = {
        email: '',
        password: '',
    }

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [form, setForm] = useState(initForm)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [response, setResponse] = useState(null)
    const [responseMessage, setResponseMessage] = useState(null)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
        //hacemos la logica para mostrar y ocultar la contraseña del input con id password
        const passwordInput = document.getElementById('password');
        if (passwordInput) {
            if (showPassword) {
                passwordInput.type = 'password';
            }
            else {
                passwordInput.type = 'text';
            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        setErrors(validationsForm(form))
    }

    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validationsForm(form))
    }

    const validationsForm = () => {
        let errors = {}
        if (!form.email) {
            errors.email = 'El email es requerido'
        } else {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(form.email)) {
                errors.email = 'El email no es valido'
            }
        }
        return errors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleChange(e)
        handleBlur(e)
        setErrors(validationsForm(form))

        if (Object.keys(errors).length === 0) {
            setLoading(true)
            const response = await login(form)
            if (response.status === 200) {
                console.log(response.data)
                setLoading(false)
                setResponse(true)
                setResponseMessage("")
                localStorage.setItem("token", response.data.data.tokenAccess)
                localStorage.setItem("user", JSON.stringify(response.data.data.usuario))
                navigate("/home")
                return response.data
            } else if (response.data === undefined) {
                setLoading(false)
                setResponse(true)
                setResponseMessage("Error en el servidor, intentar mas tarde 😢😢😓")
                return response.data
            } else {
                setLoading(false)
                setResponse(true)
                setResponseMessage(response.data.message)
                return response.data
            }


        } else {
            toast.error("Por favor corrige los errores");
            return
        }
    }


    return (

        <div className="flex flex-col items-center justify-center">
            <div className="bg-slate-100 hover:translate-y-5 transition border shadow-lg rounded-xl px-8 pt-6 mb-4 w-11/12  sm:w-10/12 md:w-6/12 lg:w-6/12 xl:w-4/12 mx-10">
                <h1 className="text-2xl font-bold text-center">Login</h1>

                <form
                    className='mt-8 space-y-6'
                    onSubmit={handleSubmit}>

                    <div className=''>
                        <label className="block mb-2 text-sm font-medium text-gray-900 bold">Correo Electronico</label>
                        <input
                            type="email"
                            name="email"
                            className={`${errors.email ? styleForm.incorrecto : styleForm.default}`}
                            placeholder="Introduce tu correo electrónico"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.email}
                            required
                        />
                        {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errors.email}</span></p>}
                    </div>


                    <div className='relative'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 bold">Password</label>
                        <input
                            id='password'
                            type="password"
                            name="password"
                            placeholder="Introduce tu contraseña"
                            className='w-full border rounded-lg outline-none p-2'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={form.password}
                            required
                        />

                        {!showPassword &&
                            <p onClick={handleClickShowPassword} className='absolute top-9 right-4 cursor-pointer ' >
                                <VisibilityIcon />
                            </p>
                        }
                        {showPassword &&
                            <p onClick={handleClickShowPassword} className='absolute top-9 right-4 cursor-pointer' >
                                <VisibilityOffIcon />
                            </p>
                        }

                        {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errors.password}</span></p>}
                    </div>


                    <div className='py-2'>

                        <button
                            type="submit"
                            className=" w-full justify-center  text-white bg-cyan-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg py-2.5 text-center mr-2 :focus:ring-blue-800 inline-flex items-center">
                            {loading && <svg
                                role="status"
                                className="inline w-4 h-4 mr-3 text-white animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                            }
                            Inicia Sesión
                        </button>

                    </div>
                </form>
                {response &&
                    <div className='flex justify-center text-center py-3 text-red-600 border-b  '>
                        <p>
                            {responseMessage}
                        </p>
                    </div>
                }
                <div>
                    <div className='text-center m-2'>
                        <Link to='/recuperar' className="text-center hover:underline text-blue-500 text-sm">¿Olvidaste tu contraseña?</Link>
                    </div>
                </div>
                <div>
                    <div className='text-center border-t mt-5 p-2 '>
                        <p className="text-gray-600 text-sm">¿No tienes una cuenta?</p>
                        <Link to='/register' className="text-center hover:underline text-blue-500 text-sm">Registrate</Link>
                    </div>
                </div>
            </div>

        </div >
    )
}