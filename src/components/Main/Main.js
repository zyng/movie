import React, { Component } from 'react';
import Movie from './Movie';


class MainContent extends Component {

    state = {
        movies: [],
        page: 1,
        type: this.props.type,
        action: this.props.action,
        currentMovieId: '',
        isLoading: false,
    }


    componentDidMount() {
        this.loadMovies();

        window.onscroll = () => {

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {

                if (!this.state.isLoading) {
                    this.setState({ action: "load" });
                    this.loadNextPage(this.state.type, this.state.page, this.state.currentMovieId);
                }
            }
        };
    }

    loadMovies = (type = "popular", page = 1, id = '', inputValue = '') => {
        const promise = this.loadJson(type, page, id, inputValue);

        promise.then(data => {
            const movies = data.results;
            Promise.all(movies.map(movie => fetch(
                `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
            )))
                .then(resp => Promise.all(resp.map(r => r.json())))
                .then(result => {

                    const moviesWithPageAndGenres = result.map((data, i) => {
                        // const movie = Object.assign(movies[i], {
                        //     genres: data.genres.name,
                        //     homepage: data.homepage
                        // });
                        // return movie;

                        const movie = movies[i];
                        movie.genres = data.genres.map(genre => genre.name)
                        movie.homepage = data.homepage;

                        return movie;
                    });

                    if (this.state.action === "overwrite") {
                        this.setState({
                            movies: moviesWithPageAndGenres,
                            type: type,
                            currentMovieId: id,
                            page: 1,
                            isLoading: false
                        });
                    } else if (this.state.action === "load") {
                        const moviesNewList = this.state.movies.concat(moviesWithPageAndGenres);
                        // console.log(moviesNewList);
                        this.setState((state) => ({
                            movies: moviesNewList,
                            action: this.props.action,
                            type: type,
                            page: state.page + 1,
                            isLoading: false
                        }));
                    }

                })

        }).catch(error => console.log(error));
    }

    loadJson = (type = "popular", page = 1, id = '', inputValue = '') => {
        console.log(type, page, id)

        if (inputValue !== '') {
            console.log('0');
            return fetch(`https://api.themoviedb.org/3/search/movie?api_key=ae60b48c0c9fb756e036cdeb7bc07360&query=${inputValue}`)
                .then(response => response.json())
        }
        else if ((type === "" || type === "single") && id === '') {
            console.log('1');
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`)
                .then(response => response.json())
        }
        else if (id !== '') {
            console.log('2');
            return fetch(`https://api.themoviedb.org/3/movie/${id}/${type}?api_key=ae60b48c0c9fb756e036cdeb7bc07360&page=${page}`)
                .then(response => response.json())
        } else {
            console.log('3');
            return fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ae60b48c0c9fb756e036cdeb7bc07360&page=${page}`)
                .then(response => response.json())
        }
    }

    loadSingleMovie = () => {
        const promise = this.loadJson("single");

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
        this.loadMovies("", 1, "", inputSearchMovie)

    }

    /*   searchMovie = (inputValue) => {
          this.setState({ action: "overwrite" });
          this.loadMovies("", 1, "", inputValue)
      } */

    render() {
        const movies = this.state.movies.map(movie =>
            <Movie
                genres={movie.genres}
                homepage={movie.homepage}
                key={movie.id}
                title={movie.title}
                poster={movie.poster_path}
                rating={movie.vote_average}
                similar={() => this.loadNewMovies("similar", 1, movie.id)}
            />
        )


        return (
            <section className="main__content">


                <header className="main__header">
                    <div className="main__title">{this.state.type === "similar" ? '20 Similar' : 'Browse Available'} Movies</div>
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