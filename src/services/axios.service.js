import axios from "axios";
import {baseURL} from "../configs";
import {accessKey} from "./access.key";

export const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${accessKey}`
    return config
})