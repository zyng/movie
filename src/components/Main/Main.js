import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie';
import * as movieApi from "../helpers/movieApi";

class MainContent extends Component {

    state = {
        movies: [],
        page: this.props.page,
        type: this.props.type,
        action: this.props.action,
        currentMovieId: '',
        isLoading: false,
    }

    componentDidMount() {
        this.loadMovies();

        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        }
        window.onscroll = () => {

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                if (!this.state.isLoading) {
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

        if (inputValue) {
            promiseMovies = movieApi.getMoviesQuery(inputValue);
        } else if (type === "similar" && id) {
            promiseMovies = movieApi.getSimilarMovies(id, this.state.page);
        } else if ((type && page) || type) {
            promiseMovies = movieApi.getAllMovies(type, page);
        } else {
            promiseMovies = movieApi.getAllMovies("popular", 1);
        }

        promiseMovies.then(data => {
            const movies = data.results;
            Promise.all(movies.map(movie => fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
            )))
                .then(resp => Promise.all(resp.map(r => r.json())))
                .then(result => {

                    const moviesWithPageAndGenres = result.map((data, i) => {

                        const movie = movies[i];
                        movie.genres = data.genres ? data.genres.map(genre => genre.name) : []

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
                                    page: this.props.page,
                                    isLoading: false
                                });
                            } else if (this.state.action === "load") {
                                const moviesNewList = this.state.movies.concat(moviesWithSimilarResult);
                                this.setState((state) => ({
                                    movies: moviesNewList,
                                    action: this.props.action,
                                    type: type,
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
        this.setState({ isLoading: true });
        this.loadMovies(type, page, id);
    }

    changeTypeMovies = (e, type) => {
        e.preventDefault();
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
                return <Movie
                    genres={movie.genres}
                    homepage={movie.homepage}
                    key={movie.id}
                    id={movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    rating={movie.vote_average}
                    similarResult={movie.similarResult}
                    similar={() => this.loadNewMovies("similar", 1, movie.id)}
                    addToCollection={this.addToCollection}
                />
            }
        })

        return (
            <section className="main__content">
                <header className="main__header">
                    <div className="main__title">{this.state.type === "similar" ? 'Similar' : 'Browse Available'} Movies</div>
                    <div className="main__actions-bar">
                        <ul className="main__filters">
                            <li onClick={(e) => this.changeTypeMovies(e, 'popular')} className="active"><a href="">Popular Movies</a></li>
                            <li onClick={(e) => this.changeTypeMovies(e, 'top_rated')}><a href="">Top Rated Movies</a></li>
                            <li onClick={(e) => this.changeTypeMovies(e, 'now_playing')} ><a href="">Now Playing Movies</a></li>
                            <li onClick={(e) => this.changeTypeMovies(e, 'upcoming')}><a href="">Upcoming Movies</a></li>
                        </ul>
                        <label htmlFor="search-movie">
                            <input onChange={this.handleInput} type="text" id="search-movie" placeholder="Enter keywords..." />
                            <i className="fa fa-search"></i>
                        </label>
                    </div>
                </header>

                <div className="movies">
                    {movies}
                </div>
            </section>

        );
    }
}

export default MainContent;