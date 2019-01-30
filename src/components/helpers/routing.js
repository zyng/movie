const movieURL = "https://api.themoviedb.org/3/movie";
const searchMovieURL = "https://api.themoviedb.org/3/search/movie";
const key = "ae60b48c0c9fb756e036cdeb7bc07360";

const userMustWatchMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/must-watch-movies";
const userFavouriteMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/favourite-movies";
const userWatchedMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/watched-movies";
const userMaybeLaterMoviesUrl = "https://searchmoviesdatabase.herokuapp.com/api/maybe-later-movies";

export const movieApiUrl = (type = "popular", page = 1, id = '', inputValue = '') => {

    if (inputValue !== '') {
        return `${searchMovieURL}?api_key=${key}&query=${inputValue}`
    }
    else if ((type === "" || type === "single") && id !== '') {
        return `${movieURL}/${id}?api_key=${key}`
    }
    else if (type === "similar" && id !== '') {
        return `${movieURL}/${id}/${type}?api_key=${key}&page=${page}`
    } else {
        return `${movieURL}/${type}?api_key=${key}&page=${page}`
    }

}

export const userMovieCollectionUrl = (collection) => {
    switch (collection) {
        case "must-watch":
            return userMustWatchMoviesUrl;
        case "favourite":
            return userFavouriteMoviesUrl;
        case "watched":
            return userWatchedMoviesUrl;
        case "maybeLater":
            return userMaybeLaterMoviesUrl
        default:
            return userWatchedMoviesUrl;
    }
}

