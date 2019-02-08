import React, { Component } from 'react';
import Movie from './Movie';
import $ from 'jquery';
import * as movieApi from "../helpers/movieApi";
import Loading from "../Loading/Loading";
import Notification from "../Notification/Notification";

class Movies extends Component {
    state = {
        movies: [],
        page: 1,
        type: '',
        action: "overwrite",
        currentMovieId: '',
        readMoreMovies: false,
        isLoading: false,
        isUserList: false,
        isInputSearch: false,
        error: false,
        errorMessage: '',
    }
    movie = React.createRef();
    componentDidMount() {
        $("html, body").animate({ scrollTop: 0 }, 400);
        const page = this.props.match.params.id
        const movieId = this.props.match.params.match || '';

        let type = page || 'popular'

        if (type === 'must-watch' || type === "favourite" || type === "watched" || type === "maybe-later") {
            this.setState({ isUserList: true });
        } else {
            this.setState({ isUserList: false });
        }

        this.setState({ isLoading: true });
        if (movieId) {
            this.loadMovies(type, 1, movieId)
        } else {
            this.loadMovies(type);
        }


        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }

        window.onscroll = () => {

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                if (!this.state.isUserList && !this.state.isInputSearch && !this.state.readMoreMovies) {
                    const nextPage = this.state.page + 1;
                    this.setState({
                        action: "load",
                        page: nextPage
                    });
                    this.loadNextPage(this.state.type, nextPage, this.state.currentMovieId);
                }
            }
        };
    }

    loadMovies = (type = "popular", page = 1, id = '', inputValue = '') => {
        let promiseMovies;

        if (type === 'must-watch' || type === "favourite" || type === "watched" || type === "maybe-later") {
            promiseMovies = movieApi.showUserMovieCollection(type)
        } else if (inputValue) {
            promiseMovies = movieApi.getMoviesQuery(inputValue);
        } else if (type === "similar" && id) {
            promiseMovies = movieApi.getSimilarMovies(id, this.state.page);
        } else if ((type && page) || type) {
            promiseMovies = movieApi.getAllMovies(type, page);
        } else {
            promiseMovies = movieApi.getAllMovies("popular", 1);
        }

        promiseMovies.then(data => {
            const movies = data.results || data.items;

            if (!data.total_pages || page <= data.total_pages)
                Promise.all(movies.map(movie => fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
                )))
                    .then(resp => Promise.all(resp.map(r => r.json())))
                    .then(result => {

                        const moviesWithPageAndGenres = result.map((data, i) => {

                            const movie = movies[i];
                            movie.genres = data.genres ? data.genres.map(genre => genre.name) : [];
                            movie.homepage = data.homepage;
                            movie.display = true;

                            return movie;
                        });

                        return moviesWithPageAndGenres;

                    })
                    .then(async result => {

                        await movieApi.getRatedMovies()
                            .then(async data => {
                                const totalPages = data.total_pages;

                                const ratedMovies = data.results;

                                result = movies.map(movie => {
                                    ratedMovies.forEach(rated => {
                                        if (movie.id === rated.id) {
                                            movie.user_rating = rated.rating
                                        }
                                    })

                                    return movie
                                })

                                if (totalPages > 1)
                                    for (let i = 2; i <= totalPages; i++) {
                                        await movieApi.getRatedMovies(i)
                                            .then(data => {
                                                const ratedMovies = data.results;

                                                result = movies.map(movie => {
                                                    ratedMovies.forEach(rated => {
                                                        if (movie.id === rated.id) {
                                                            movie.user_rating = rated.rating
                                                        }
                                                    })

                                                    return movie
                                                })

                                            })
                                    }
                            })
                        return result

                    })
                    .then(result => {
                        Promise.all(result.map(movie => fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
                        )))
                            .catch((response) => {
                                console.log(response);

                                if (Response.status === 429) {
                                    this.setState({ error: true, errorMessage: "Too many Request... Something could go wrong. Try again later." });
                                }
                            })
                            .then(resp => Promise.all(resp.map(r => r.json())))
                            .then(result => {

                                const moviesWithSimilarResult = result.map((data, i) => {
                                    const movie = movies[i];
                                    movie.similarResult = data.total_results
                                    return movie
                                })

                                if (this.state.action === "overwrite") {
                                    this.setState({
                                        movies: moviesWithSimilarResult,
                                        type: type,
                                        currentMovieId: id,
                                        page: 1,
                                        readMoreMovies: false,
                                        isLoading: false
                                    });
                                } else if (this.state.action === "load") {
                                    const moviesNewList = this.state.movies.concat(moviesWithSimilarResult);
                                    this.setState((state) => ({
                                        movies: moviesNewList,
                                        action: this.props.action,
                                        type: type,
                                        readMoreMovies: false,
                                        isLoading: false
                                    }));
                                }
                            })
                    })

        })




    }

    loadNewMovies = (type, page, id) => {
        this.setState({ action: "overwrite" });
        this.loadMovies(type, page, id);
    }

    loadNextPage = (type, page, id) => {
        this.setState({ readMoreMovies: true });
        this.loadMovies(type, page, id);
    }

    changeTypeMovies = (type) => {
        this.loadMovies(type, 1);
    }

    handleInput = (e) => {
        const inputSearchMovie = e.target.value;


        if (this.state.isUserList) {
            const howToDisplayMovies = this.state.movies.map(movie => {
                const title = movie.title.toLowerCase();

                if (!title.includes(inputSearchMovie)) {
                    movie.display = false
                } else {
                    movie.display = true
                }
                return movie;
            })

            this.setState({ movies: howToDisplayMovies });


        }
    }
    handleInputSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const input = form.querySelector('input');

        const inputSearchMovie = input.value;
        const inputFormatted = inputSearchMovie.replace(/ /g, '+');

        this.setState({ isInputSearch: true });
        this.loadMovies('', 1, '', inputFormatted);
        input.value = '';
    }

    removeMovie = (collection, id, title) => {
        const history = {
            movie_name: title,
            collection: collection,
            action: 'remove'
        }

        movieApi.removeFromMovieCollection(collection, id)
            .then(() => {
                const moviesWithoutRemoved = this.state.movies.filter(movie => movie.id !== id)

                this.setState({
                    movies: moviesWithoutRemoved
                });
            })
            .then(() => {
                if (this.state.type === "watched")
                    movieApi.removeRating(id)
            })
            .then(() => movieApi.saveHistory(history))
    }

    hideNotification = () => {
        this.setState({ error: false });

        if (this.notification)
            clearTimeout(this.notification)
    }


    render() {
        const movies = this.state.movies.map(movie => {
            if (movie.poster_path && movie.title && movie.vote_average) {
                return (<Movie
                    genres={movie.genres}
                    homepage={movie.homepage}
                    key={movie.movie_id || movie.id}
                    id={movie.movie_id || movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    rating={movie.vote_average}
                    similarResult={movie.similarResult}
                    actualPage={this.props.match.params.id}
                    removeMovieFromCollection={this.removeMovie}
                    userRating={movie.user_rating}
                    showMovie={movie.display}

                    ref={this.movie}
                />)
            }
        })

        return (
            <>
                {this.state.error && <Notification error children={this.state.errorMessage} hide={this.notification = setTimeout(this.hideNotification, 5000)} close={this.hideNotification} />}
                <div className="movies" >
                    {(this.state.isLoading && <Loading isActive page />) || (movies.length > 0 ? movies : "No movies in collection.")}
                </div>
            </>
        )

    }
}

export default Movies;