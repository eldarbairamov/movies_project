import axios from "axios";
import {moviesURL} from "../configs";
import {_accessKey} from "./access.key";

export const axiosService = axios.create({baseURL: moviesURL})

axiosService.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${_accessKey}`
    return config
})