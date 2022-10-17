import {axiosService} from "./axios.service";
import {urls} from "../configs";

export const moviesService = {
    getMovies: (page = 1) => axiosService.get(urls.allMovies, {
        params: {page: page}}),

    searchMovies: (searchKey, page = 1) => axiosService.get(`${urls.searchMovies}?query=${searchKey}`, {
        params: {page: page}}),

    getGenres: () => axiosService.get(urls.genres),

    getMoviesByGenre: (genreId, page = 1) => axiosService.get(`${urls.allMovies}?with_genres=${genreId}`, {
        params: {page: page}})
}