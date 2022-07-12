import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_BASE_URL


export const getAmigos = async (user) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/amigo`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}


export const deleteAmigo = async (user) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/amigo/`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}


export const getSolicitudes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/amigo/solicitud`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const sendSolicitud = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/amigo/solicitud`,{
            nickNameAmigo: user
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const acceptSolicitud = async (user) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/amigo/solicitud/aceptar`,{
            nickNameAmigo: user
        }, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const deleteSolicitud = async (user) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/amigo/solicitud`,{
            nickNameAmigo: user
        },{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}

export const buscarNuevoAmigo = async (user) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/usuario/buscar/${user}`, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error.response
    }
}