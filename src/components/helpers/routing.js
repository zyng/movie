const movieURL = "https://api.themoviedb.org/3/movie";
const userListUrl = "https://api.themoviedb.org/3/list";
const userRatedListUrl = "https://api.themoviedb.org/3/account"
const searchMovieURL = "https://api.themoviedb.org/3/search/movie";


const mustWatchListId = 104224;
const favouriteListId = 104225;
const watchedListId = 104226;
const maybeLaterListId = 104227;

const userId = 8223639;

const key = "ae60b48c0c9fb756e036cdeb7bc07360";
const sessionId = "1c9c64e55f08ecdb3d95d688e85862d1373616db";
// const requestToken = "bad1c98445b656a8b07219a6649f327f0ad2f1b9";



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

export const userMovieCollectionUrl = (collection, id, type) => {
    switch (collection) {
        case "must-watch":
            return type === "remove" ?
                `${userListUrl}/${mustWatchListId}/remove_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                : id ?
                    `${userListUrl}/${mustWatchListId}/add_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                    : `${userListUrl}/${mustWatchListId}?api_key=${key}`

        case "favourite":
            return type === "remove" ?
                `${userListUrl}/${favouriteListId}/remove_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                : id ?
                    `${userListUrl}/${favouriteListId}/add_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                    : `${userListUrl}/${favouriteListId}?api_key=${key}`

        case "watched":
            return type === "remove" ?
                `${userListUrl}/${watchedListId}/remove_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                : id ?
                    `${userListUrl}/${watchedListId}/add_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                    : `${userListUrl}/${watchedListId}?api_key=${key}`

        case "maybe-later":
            return type === "remove" ?
                `${userListUrl}/${maybeLaterListId}/remove_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                : id ?
                    `${userListUrl}/${maybeLaterListId}/add_item?api_key=${key}&session_id=${sessionId}&media_id=${id}`
                    : `${userListUrl}/${maybeLaterListId}?api_key=${key}`
        default:
            return ``
    }
}

export const userRatingUrl = (id, rating) =>
    rating ? `${movieURL}/${id}/rating?api_key=${key}&session_id=${sessionId}&value=${rating}` : `${movieURL}/${id}/rating?api_key=${key}&session_id=${sessionId}`


export const ratedMoviesListUrl = (page = 1) =>
    `${userRatedListUrl}/${userId}/rated/movies?api_key=${key}&session_id=${sessionId}&page=${page}`

export const historyApiUrl = 'https://searchmoviesdatabase.herokuapp.com/api/history'
