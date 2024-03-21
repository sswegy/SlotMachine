import axios from 'axios';
const baseUrl = 'http://192.168.0.12:5000'; // vseki put qvno go promenqme v CMD "ipconfig"

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
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const loginUser = async (userData) => {
    try {
        const response = await axios.post(`${baseUrl}/users/login`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}

export const getUserTransactions = async(userID) => {
    try {
        const response = await axios.get(`${baseUrl}/transactions/user_id/${userID}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}