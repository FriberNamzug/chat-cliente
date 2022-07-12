import axios from 'axios'


const BASE_URL = import.meta.env.VITE_APP_BASE_URL


export const getChats = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/chat`,{
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        })
        return response
    } catch (error) {
        return error
    }
}