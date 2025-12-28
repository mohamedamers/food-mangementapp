import axios from "axios";
import { baseURL } from "./apiURLs";

export const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization : localStorage.getItem("token")}

})