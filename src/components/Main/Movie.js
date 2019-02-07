import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Loading from "../Loading/Loading";
import * as movieApi from "../helpers/movieApi";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

class Movie extends Component {

    state = {
        savingProccess: false,
        addedToMustWatch: false,
        addedToFavourite: false,
        addedToWatched: false,
        addedToMaybeLater: false,
        rating: this.props.userRating,
    }

    static defaultProps = {
        mustWatch: "Add to Must watch",
        favourite: "Add to Favourites",
        watched: "Add to Watched",
        maybeLater: "Add to Maybe Later"
    }

    collectionRoutes = [
        {
            path: '/must-watch'
        },
        {
            path: '/favourite'
        },
        {
            path: '/watched'
        },
        {
            path: '/maybe-later'
        },
    ]

    browseMoviesRoute = [
        {
            path: '/'
        },
        {
            path: '/popular'
        },
        {
            path: '/top_rated'
        },
        {
            path: '/now_playing'
        },
        {
            path: '/upcoming'
        },
        {
            path: '/similar/:match'
        }
    ]

    addToCollection = (e, type, id, title) => {
        e.preventDefault();

        const history = {
            movie_name: title,
            collection: type,
            action: 'add'
        }
        switch (type) {
            case "must-watch":
                if (!this.state.addedToMustWatch) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('must-watch', id)
                        .then(() => this.setState({ savingProccess: false, addedToMustWatch: true }))
                        .then(() => movieApi.saveHistory(history))
                }
                break;
            case "favourite":
                if (!this.state.addedToFavourite) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('favourite', id)
                        .then(() => this.setState({ savingProccess: false, addedToFavourite: true }))
                        .then(() => movieApi.saveHistory(history))
                }
                break;
            case "watched":
                if (!this.state.addedToWatched) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('watched', id)
                        .then(() => this.setState({ savingProccess: false, addedToWatched: true }))
                        .then(() => movieApi.saveHistory(history))
                }
                break;
            case "maybe-later":
                if (!this.state.addedToMaybeLater) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('maybe-later', id)
                        .then(() => this.setState({ savingProccess: false, addedToMaybeLater: true }))
                        .then(() => movieApi.saveHistory(history))
                }
                break;
            default:
                console.log("something wrong");
        }
    }

    changeRating(id, actualPage, newRating) {
        this.setState({
            rating: newRating
        })

        this.setState({ savingProccess: true });
        movieApi.rateMovie(id, newRating)
            .then(() => {
                if (actualPage !== "watched")
                    movieApi.addToMovieCollection('watched', id)
            })
            .then(() => this.setState({ savingProccess: false }))
    }


    render() {
        const { id, title, poster, rating, homepage, genres, similarResult, watched, maybeLater, favourite, mustWatch, actualPage, removeMovieFromCollection, showMovie } = this.props;
        const { savingProccess, addedToMustWatch, addedToFavourite, addedToWatched, addedToMaybeLater } = this.state;
        const genresFormatted = Array.isArray(genres) ? genres.join(`, `) : genres;

        return (

            <div className={`movie ${showMovie ? '' : 'hide'}`}>

                <div className="movie__content">
                    <Loading isActive={savingProccess} />
                    <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" />
                    <div className="movie__actions">

                        <Switch>
                            {this.collectionRoutes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact
                                    strict
                                    render={() => (
                                        <div onClick={() => removeMovieFromCollection(actualPage, id, title)} className="movie__remove"><span className="fa fa-trash"></span></div>
                                    )}

                                />
                            ))}
                            {this.browseMoviesRoute.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact
                                    strict
                                    render={() => (
                                        <div className="movie__add">
                                            <div onClick={(e) => this.addToCollection(e, "must-watch", id, title)} className={`movie__action ${addedToMustWatch ? 'active' : ''}`}><a href="/" > </a><span>{addedToMustWatch ? "Added to Must Watch" : mustWatch}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "favourite", id, title)} className={`movie__action ${addedToFavourite ? 'active' : ''}`}><a href="/" > </a><span>{addedToFavourite ? "Added to Favourite" : favourite}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "watched", id, title)} className={`movie__action ${addedToWatched ? 'active' : ''}`}><a href="/" > </a><span>{addedToWatched ? "Added to Watched" : watched}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "maybe-later", id, title)} className={`movie__action ${addedToMaybeLater ? 'active' : ''}`}><a href="/" > </a><span>{addedToMaybeLater ? "Added to Maybe Later" : maybeLater}</span></div>
                                        </div>
                                    )}
                                />
                            ))}
                        </Switch>

                        {homepage && <a href={homepage} target="_blank" className='movie__btn movie__btn--goto'>Check Movie</a>}
                        {similarResult > 0 && <Link to={`/similar/${id}`} className='movie__btn movie__btn--similar'>Show Similar</Link>}
                        <div className="movie__rate">
                            <span>Your rating:</span>
                            <StarRatings
                                rating={this.state.rating}
                                starDimension="20px"
                                starSpacing="3px"
                                numberOfStars={10}
                                starHoverColor='#15a4fa'
                                starRatedColor='#ffab00'
                                changeRating={this.changeRating.bind(this, id, actualPage)}
                                name='rating'
                            />
                        </div>
                    </div>
                </div>
                <div className="movie__description">
                    <div className="movie__title-category">
                        <span className="movie__title">{title}</span>
                        <span className="movie__category">{genresFormatted}</span>
                    </div>
                    <div className="movie__rating">{rating}</div>
                </div>
            </div >
        );
    }

}

export default Movie;