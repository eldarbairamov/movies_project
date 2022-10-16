import {axiosService} from "./axios.service";

export const moviesService = {
    getMovies: (page = 1) => axiosService.get(`/discover/movie`, {
        params: {
            page: page
        }
    }),
    searchMovies: (searchKey, page = 1) => axiosService.get(`/search/movie?query=${searchKey}`, {
        params: {
            page: page
        }
    }),
    getGenres: () => axiosService.get('genre/movie/list'),
    getMoviesByGenre: (genreId, page = 1) => axiosService.get(`/discover/movie?with_genres=${genreId}`, {
        params: {
            page: page
        }
    })
}