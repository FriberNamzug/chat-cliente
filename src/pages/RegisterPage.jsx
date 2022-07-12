import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { registrar, validarNickname } from '../services/auth.services'
import { toast } from 'react-toastify';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import DoneIcon from '@mui/icons-material/Done';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';

export const RegisterPage = () => {


    const styleForm = {
        incorrecto: "w-full -ml-10 pl-10 pr-3 py-2 border-2 border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:border-red-400 outline-none",
        default: "w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500",
    }

    const initForm = {
        nickname: '',
        email: '',
        password: '',
    }

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = React.useState(false);
    const [showNickname, setShowNickname] = React.useState(null);
    const [form, setForm] = useState(initForm)
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [errorNickname, setErrorNickname] = useState({})
    const [errorEmail, setErrorEmail] = useState({})
    const [errorPassword, setErrorPassword] = useState({})

    const [nickname, setNickname] = useState(null)

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
        setErrors(validationsForm(name, value))
    }

    const valNickname = async (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
        setErrors(validationsForm(name, value))

        setErrorNickname(validationsForm(name, value))

        if (Object.keys(errors).length === 0) {
            const res = await validarNickname(form.nickname)
            setNickname(true)
            if (res.status === 200) {
                setShowNickname(true)
            } else {
                console.log(res)
                setErrorNickname({ nickname: 'El nickname ya existe' })
                setShowNickname(false)
            }
            return
        } else {
            setShowNickname(false)
        }
    }

    const valEmail = async (e) => {
        const { name, value } = e.target
        handleChange(e)
        setErrorEmail(validationsForm(name, value))
    }

    const valPassword = async (e) => {
        const { name, value } = e.target
        handleChange(e)
        setErrorPassword(validationsForm(name, value))
    }

    const validationsForm = (campo, form) => {
        let errors = {}

        if (campo === 'nickname') {
            if (form.length === 0) {
                errors.nickname = 'El nickname es requerido'
            } else
                if (form.length < 3) {
                    errors.nickname = 'El nickname debe tener al menos 3 caracteres'
                } else
                    if (form.length > 20) {
                        errors.nickname = 'El nickname debe tener menos de 20 caracteres'
                    } else
                        if (/^\S+$/.test(form) === false) {
                            errors.nickname = 'El nickname no puede tener espacios'
                        } else
                            //No puede tener caracteres especiales
                            if (/^[a-zA-Z0-9_]+$/.test(form) === false) {
                                errors.nickname = 'El nickname no puede tener caracteres especiales'
                            }
        }
        if (campo === 'email') {
            if (form.length === 0) {
                errors.email = 'El email es requerido'
            } else
                if (form.length > 50) {
                    errors.email = 'El email debe tener menos de 50 caracteres'
                } else
                    if (/^\S+$/.test(form) === false) {
                        errors.email = 'El email no puede tener espacios'
                    } else
                        if (/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(form) === false) {
                            errors.email = 'El email no tiene un formato valido'
                        }
        }
        if (campo === 'password') {
            if (form.length === 0) {
                errors.password = 'La contraseña es requerida'
            } else
                if (form.length < 6) {
                    errors.password = 'La contraseña debe tener al menos 6 caracteres'
                } else
                    if (form.length > 20) {
                        errors.password = 'La contraseña debe tener menos de 20 caracteres'
                    } else
                        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/.test(form) === false) {
                            errors.password = 'La contraseña debe tener al menos una mayuscula, una minuscula, un numero y un caracter especial'
                        }
        }
        return errors
    }





    const handleSubmit = async (e) => {
        e.preventDefault()
        handleChange(e)

        valNickname(e)
        setErrorEmail(validationsForm('email', form.email))
        setErrorPassword(validationsForm('password', form.password))
        setErrorNickname(validationsForm('nickname', form.nickname))

        if (Object.keys(errorNickname).length === 0 && Object.keys(errorEmail).length === 0 && Object.keys(errorPassword).length === 0) {
            setLoading(true)
            const response = await registrar(form)

            if (response.status === 200) {
                console.log(response.data.data)
                setLoading(false)
                localStorage.setItem("token", response.data.data.tokenAccess)
/*                 setAuthData(response.data.data.tokenAccess)
 */                navigate("/home",{replace:true})

                return response.data

            } else if (response.data === undefined) {
                setLoading(false)
                toast.error(response.response.data.message);
                return response.data
            } else {
                setLoading(false)
                toast.error(response.data.message);
                return response.data
            }


        } else {
            toast.error("Por favor corrige los errores");
            return
        }

    }


    return (
        <div>

            <div className="flex flex-col items-center justify-center h-screen">
                <div className="bg-slate-100 border shadow-lg rounded-xl px-8 pt-6 mb-4 w-96 ">
                    <h1 className="text-2xl font-bold text-center">Registrarte</h1>

                    <form
                        className='mt-8 space-y-6'
                        onSubmit={handleSubmit}>

                        <div className='relative' >
                            <div className='flex'>
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                    <PersonIcon className=' mdi mdi-lock-outline text-gray-400 text-lg' />
                                </div>
                                <input
                                    type="text"
                                    name="nickname"
                                    className={`${errorNickname.nickname ? styleForm.incorrecto : styleForm.default}`}
                                    placeholder="Nickname"
                                    onChange={handleChange}
                                    onBlur={valNickname}
                                    value={form.nickname}
                                    required
                                />

                                {nickname &&
                                    <div>

                                        <p className='absolute top-2 right-4' >
                                            {showNickname && <DoneIcon />}
                                        </p>
                                        <p onClick={valNickname} className='absolute top-2 right-4 cursor-pointer' >
                                            {!showNickname && <DoDisturbIcon />}
                                        </p>
                                    </div>
                                }


                            </div>
                            {errorNickname && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errorNickname.nickname}</span></p>}
                        </div>

                        <div >
                            <div className='flex'>
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                    <EmailIcon className=' mdi mdi-lock-outline text-gray-400 text-lg' />
                                </div>

                                <input
                                    type="email"
                                    name="email"
                                    className={`${errorEmail.email ? styleForm.incorrecto : styleForm.default}`}
                                    placeholder="Correo electrónico"
                                    onChange={valEmail}
                                    onBlur={valEmail}
                                    value={form.email}
                                    required
                                />

                            </div>
                            {errorEmail && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errorEmail.email}</span></p>}
                        </div>

                        <div className='relative'>
                            <div className='flex'>
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                    <PasswordIcon className=' mdi mdi-lock-outline text-gray-400 text-lg' />
                                </div>
                                <input
                                    id='password'
                                    type="password"
                                    name="password"
                                    placeholder="Contraseña nueva"
                                    className={`${errorPassword.password ? styleForm.incorrecto : styleForm.default}`}
                                    onChange={valPassword}
                                    onBlur={valPassword}
                                    value={form.password}
                                    required
                                />
                            </div>

                            {!showPassword &&
                                <p onClick={handleClickShowPassword} className='absolute top-2 right-4 cursor-pointer ' >
                                    <VisibilityIcon />
                                </p>
                            }
                            {showPassword &&
                                <p onClick={handleClickShowPassword} className='absolute top-2 right-4 cursor-pointer' >
                                    <VisibilityOffIcon />
                                </p>
                            }

                            {errorPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">{errorPassword.password}</span></p>}
                        </div>


                        <div>
                            <div className='text-center '>
                                <p className="text-gray-600 text-sm">
                                    Al hacer clic en "Registrarte", aceptas nuestras Condiciones, la Política de datos y la Política de cookies.
                                </p>
                            </div>
                        </div>
                        <div className='py-2 flex justify-center '>

                            <button
                                type="submit"
                                className="w-52 justify-center  text-white bg-cyan-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-500 font-medium rounded-lg py-2.5 text-center mr-2 :focus:ring-blue-800 inline-flex items-center">
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
                                Registrarte
                            </button>

                        </div>
                    </form>


                    <div>
                        <div className='text-center border-t mt-5 p-2 '>
                            <p className="text-gray-600 text-sm">¿Ya tienes una cuenta?</p>
                            <Link to='/login' className="text-center hover:underline text-blue-500 text-sm">Inicia Sesión</Link>
                        </div>
                    </div>
                </div>

            </div >


        </div>
    )
}
