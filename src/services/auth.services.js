import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL


export const login = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/autenticacion/login`, {
            email: user.email,
            password: user.password
        })
        //console.log(response.data)
        return response
    } catch (error) {
        //console.error(error.response.data)
        return error.response
    }
}


export const registrar = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/autenticacion/register`, {
            nickName: user.nickname,
            email: user.email,
            password: user.password
        });
        return response
    } catch (error) {
        return error
    }
}
export const validarNickname = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/autenticacion/register/nickname`, {
            nickName: user,
        });
        return response
    } catch (error) {
        return error
    }
}