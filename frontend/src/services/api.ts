import axios from "axios";


// Laravel api url
const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/news",
})

export default api;