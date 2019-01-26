const movieURL = "https://api.themoviedb.org/3/movie";
const searchMovieURL = "https://api.themoviedb.org/3/search/movie";
const key = "ae60b48c0c9fb756e036cdeb7bc07360";


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

