import React, { Component } from 'react';
import Movie from './Movie';
// import $ from 'jquery';
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


    async componentDidMount() {
        this.loadMovies("popular", 1);

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
            console.log('input')
            promiseMovies = movieApi.getMoviesQuery(inputValue);
        } else if (type === "similar" && id) {
            console.log('similar', this.state.page)
            promiseMovies = movieApi.getSimilarMovies(id, this.state.page);
        } else if (type && page || type) {
            console.log('getAll')
            promiseMovies = movieApi.getAllMovies(type, page);
        } else {
            console.log('getAllPopular')
            promiseMovies = movieApi.getAllMovies("popular", 1);
        }

        console.log(promiseMovies)


        promiseMovies.then(data => {
            // console.log(data);
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

    loadSingleMovie = (id) => {
        const promise = movieApi.getMovie(id);

        promise.then(data => {
            this.setState({ movies: data });
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

    handleInput = (e) => {
        const inputSearchMovie = e.target.value;
        const inputFormatted = inputSearchMovie.replace(/ /g, '+');
        this.loadMovies("", 1, "", inputFormatted)

    }

    handleSessionId = () => {
        var data = {
            movie_id: 12133,
            title: "asdasdfff",
            homepage: "http://sadssda.com",
            poster_path: "/rfgrerg.jpg",
            similarResult: "123",
            vote_average: "5.5",
            genres: "Comedy"
        };
        console.log(data);

        movieApi.addToMustWatchMovies(data);

        /*      $.ajax({
                 url: 'https://searchmoviesdatabase.herokuapp.com/api/must-watch-movies',
                 method: "post",
                 data: data,
                 success: function (data) {
                     console.log(data); // this is good
                 },
                 error: function (error) {
                     console.log(error);
                 }
             }); */

    }

    render() {
        // console.log(this.state.movies);
        const movies = this.state.movies.map(movie => {

            if (movie.poster_path && movie.title && movie.vote_average) {
                return <Movie
                    genres={movie.genres}
                    homepage={movie.homepage}
                    key={movie.id}
                    title={movie.title}
                    poster={movie.poster_path}
                    rating={movie.vote_average}
                    similarResult={movie.similarResult}
                    similar={() => this.loadNewMovies("similar", 1, movie.id)}
                />
            }
        })


        return (
            <section className="main__content">

                <button onClick={this.handleSessionId}>Create List</button>
                <header className="main__header">
                    <div className="main__title">{this.state.type === "similar" ? 'Similar' : 'Browse Available'} Movies</div>
                    <div className="main__actions-bar">
                        <ul className="main__filters">
                            <li className="active">All Movies</li>
                            <li>Most Recent</li>
                            <li>Most Popular</li>
                            <li>Free Movies</li>
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