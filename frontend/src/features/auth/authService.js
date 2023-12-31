import axios from 'axios'

const API_URL = '/api/users/'

//register user
const register = async (userData) => {
    const res = await axios.post(API_URL, userData)

    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

//logout user
const logout = () => localStorage.removeItem('user')

//login user
const login = async (userData) => {
    const res = await axios.post(API_URL + 'login', userData)
    if(res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
    }
    return res.data
}

const authService = {
    register, 
    logout,
    login,
}

export default authService