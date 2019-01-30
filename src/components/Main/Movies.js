import React, { Component } from 'react';
import Movie from './Movie';
import * as movieApi from "../helpers/movieApi";
import Loading from "../Loading/Loading";

class Movies extends Component {
    state = {
        movies: [],
        page: 1,
        type: this.props.type,
        action: "overwrite",
        currentMovieId: '',
        readMoreMovies: false,
        isLoading: false,
    }
    collection = false;

    componentDidMount() {

        let type = this.props.match.params.id || 'popular'

        this.setState({ isLoading: true });
        this.loadMovies(type);

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        window.onscroll = () => {

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                if (!this.state.readMoreMovies) {
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
            this.collection = true;
            promiseMovies = movieApi.showUserMovieCollection(type)
            promiseMovies.then(data => this.setState({ movies: data, isLoading: false })).catch(error => console.log(error))

        } else if (inputValue) {
            promiseMovies = movieApi.getMoviesQuery(inputValue);
        } else if (type === "similar" && id) {
            promiseMovies = movieApi.getSimilarMovies(id, this.state.page);
        } else if ((type && page) || type) {
            promiseMovies = movieApi.getAllMovies(type, page);
        } else {
            promiseMovies = movieApi.getAllMovies("popular", 1);
        }


        if (!this.collection) {
            promiseMovies.then(data => {
                const movies = data.results;
                Promise.all(movies.map(movie => fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
                )))
                    .then(resp => Promise.all(resp.map(r => r.json())))
                    .then(result => {

                        const moviesWithPageAndGenres = result.map((data, i) => {

                            const movie = movies[i];
                            movie.genres = data.genres ? data.genres.map(genre => genre.name) : [];
                            movie.homepage = data.homepage;

                            return movie;
                        });

                        return moviesWithPageAndGenres;

                    })
                    .then(result => {
                        Promise.all(result.map(movie => fetch(
                            `https://api.themoviedb.org/3/movie/${movie.id}/similar?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
                        )))
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
        const inputFormatted = inputSearchMovie.replace(/ /g, '+');
        this.loadMovies("", 1, "", inputFormatted)
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
                    similar={() => this.loadNewMovies("similar", 1, movie.id)}
                />)
            }
        })
        return (
            <div className="movies" >
                {(this.state.isLoading && <Loading isActive page />) || movies}
            </div>
        )

    }
}

export default Movies;