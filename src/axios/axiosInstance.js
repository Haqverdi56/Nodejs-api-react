import axios from "axios";

export const BASE_URL = 'http://localhost:3000/api/products';

const axiosIntance = axios.create({
    baseURL: BASE_URL,
})

export const axiosNetwork = {
    getAll: async(url) => {
        let responseData = [];
        await axiosIntance.get(`${url}`)
            .then(res => responseData = res.data)
            .catch(err=>console.log('err', err))
        return responseData
    },
    addItem: async(url, data) => {
        await axiosIntance.post(`${url}`, data)
    },
    update: async(url, id, data) => {
        await axiosIntance.put(`${url}/${id}`, data)
    },
    delete: async(url,id) => {
        await axiosIntance.delete(`${url}/${id}`)
    }
    
}