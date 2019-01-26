import { movieApiUrl } from "./routing";
import * as api from "./api";

const mustWatchMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/must-watch-movies";
const favoriteMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/favorite-movies";
const watchedMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/watched-movies";
const maybeLaterMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/maybe-later-movies";

export const getAllMovies = (type, page) =>
    api.get(movieApiUrl(type, page))


export const getSimilarMovies = (id, page) =>
    api.get(movieApiUrl("similar", page, id))


export const getMovie = (id) =>
    api.get(movieApiUrl("single", 1, id))



export const getMoviesQuery = (text, page) =>
    api.get(movieApiUrl("", 1, page, text))


export const addToMustWatchMovies = (data) =>
    api.post(mustWatchMoviesUrl, data)


export const addToFavoriteMovies = (data) =>
    api.post(favoriteMoviesUrl, data)


export const addToWatchedMovies = (data) =>
    api.post(watchedMoviesUrl, data)


export const addToMaybeLaterMovies = (data) =>
    api.post(maybeLaterMoviesUrl, data)
