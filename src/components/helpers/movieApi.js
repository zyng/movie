import { movieApiUrl, userMovieCollectionUrl } from "./routing";
import * as api from "./api";

export const getAllMovies = (type, page) =>
    api.get(movieApiUrl(type, page))

export const getSimilarMovies = (id, page) =>
    api.get(movieApiUrl("similar", page, id))

export const getMovie = (id) =>
    api.get(movieApiUrl("single", 1, id))

export const getMoviesQuery = (text, page) =>
    api.get(movieApiUrl("", 1, page, text))

export const addToMovieCollection = (collection, id) =>
    api.post(userMovieCollectionUrl(collection, id))

export const removeFromMovieCollection = (collection, id) =>
    api.post(userMovieCollectionUrl(collection, id, "remove"))

export const showUserMovieCollection = (collection) =>
    api.get(userMovieCollectionUrl(collection))


