import axios from 'axios';
const baseUrl = 'http://192.168.174.208:5000'; // vseki put qvno go promenqme v CMD "ipconfig"

export const fetchUsers = async () => {
    axios.get(`${baseUrl}/users`)
      .then(response => {
        console.log('API Response:', response.data);
    })
      .catch(error => {
        console.error('API Request Error:', error.message);
    })
}

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/users/register`, userData);
        console.log('Registration successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Registration failed:', error.response.data.message, error.message);
        throw new Error(error.response.data.message);
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/users/login`, userData);
        console.log('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('Login failed:', error.response.data.message, error.message);
        throw new Error(error.response.data.message);
    }
}