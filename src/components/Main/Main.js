import React, { Component } from 'react';
import Movie from './Movie';


class MainContent extends Component {

    state = {
        movies: [],
    }



    componentDidMount() {

        fetch('https://api.themoviedb.org/3/movie/popular?api_key=ae60b48c0c9fb756e036cdeb7bc07360&page=1')
            .then(response => response.json())
            .then(data => {
                const movies = data.results;
                // console.log(movies);
                Promise.all(movies.map(movie => fetch(
                    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=ae60b48c0c9fb756e036cdeb7bc07360`
                )))
                    .then(resp => Promise.all(resp.map(r => r.json())))
                    .then(result => {

                        const moviesWithPage = result.map((data, i) => {
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
                        this.setState({
                            movies: moviesWithPage
                        });
                    });
            })
    }


    /*     componentDidMount() {

            const movies = this.fetchMovies();
            console.log(movies);
            movies.then((movies) => { this.setState({ movies }); });

        } */
    /*    async fetchMovies() {
           const response = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=ae60b48c0c9fb756e036cdeb7bc07360&page=1');
           const data = await response.json();

           // const movies = data.results;
           // console.log(movies);

           // return await Promise.all(data.results.map(async function (movie) {
           //     const response = await fetch('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=ae60b48c0c9fb756e036cdeb7bc07360');
           //     const data = await response.json();
           //     movie.genres = data.genres;
           //     movie.homepage = data.homepage;
           //     return data.results;
           // }))

           // for (const movie of movies) {
           //     const response = await fetch('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=ae60b48c0c9fb756e036cdeb7bc07360');
           //     const data = await response.json();
           //     movie.genres = data.genres;
           //     movie.homepage = data.homepage;
           // }
           const movies = data.results;

           movies.map(async function (movie) {
               const response = await fetch('https://api.themoviedb.org/3/movie/' + movie.id + '?api_key=ae60b48c0c9fb756e036cdeb7bc07360');
               const data = await response.json();
               movie.genres = "aada";
               movie.homepage = "sjfsdos";

               return movie;
           })
           // this.setState({ movies });
           // console.log(movies);
           return await Promise.all(movies);
       } */

    /*    moviePageAndGenres(id, element) {
             fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=ae60b48c0c9fb756e036cdeb7bc07360')
                .then(response => response.json())
                .then(data => {
                    element.genres = data.genres;
                    element.homepage = data.homepage;
                });
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
            />
        )

        return (
            <section className="main__content">


                <header className="main__header">
                    <div className="main__title">Browse Available Books</div>
                    <div className="main__actions-bar">
                        <ul className="main__filters">
                            <li className="active">All Movies</li>
                            <li>Most Recent</li>
                            <li>Most Popular</li>
                            <li>Free Movies</li>
                        </ul>
                        <label htmlFor="search-movie">
                            <input type="text" id="search-movie" placeholder="Enter keywords..." />
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