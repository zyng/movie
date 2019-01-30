import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Loading from "../Loading/Loading";
import * as movieApi from "../helpers/movieApi";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Movie extends Component {

    state = {
        savingProccess: false,
        addedToMustWatch: false,
        addedToFavourite: false,
        addedToWatched: false,
        addedToMaybeLater: false,
        rating: 0
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
        }
    ]

    addToCollection = (e, type, id) => {
        e.preventDefault();
        switch (type) {
            case "must-watch":
                if (!this.state.addedToMustWatch) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('must-watch', id)
                        .then(() => this.setState({ savingProccess: false, addedToMustWatch: true }))
                }
                break;
            case "favourite":
                if (!this.state.addedToFavourite) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('favourite', id)
                        .then(() => this.setState({ savingProccess: false, addedToFavourite: true }))
                }
                break;
            case "watched":
                if (!this.state.addedToWatched) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('watched', id)
                        .then(() => this.setState({ savingProccess: false, addedToWatched: true }))
                }
                break;
            case "maybe-later":
                if (!this.state.addedToMaybeLater) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMovieCollection('maybe-later', id)
                        .then(() => this.setState({ savingProccess: false, addedToMaybeLater: true }))
                }
                break;
            default:
                console.log("something wrong");
        }
    }

    changeRating(newRating) {
        this.setState({
            rating: newRating
        });
    }




    render() {
        const { id, title, poster, rating, homepage, genres, similar, similarResult, watched, maybeLater, favourite, mustWatch, actualSearchedCollection, removeMovieFromCollection } = this.props;
        const { savingProccess, addedToMustWatch, addedToFavourite, addedToWatched, addedToMaybeLater } = this.state;
        const genresFormatted = Array.isArray(genres) ? genres.join(`, `) : genres;

        return (
            <div className="movie">

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
                                        <div onClick={() => removeMovieFromCollection(actualSearchedCollection, id)} className="movie__remove"><span class="fa fa-trash"></span></div>
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
                                            <div onClick={(e) => this.addToCollection(e, "must-watch", id)} className={`movie__action ${addedToMustWatch ? 'active' : ''}`}><a href="/" > </a><span>{addedToMustWatch ? "Added to Must Watch" : mustWatch}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "favourite", id)} className={`movie__action ${addedToFavourite ? 'active' : ''}`}><a href="/" > </a><span>{addedToFavourite ? "Added to Favourite" : favourite}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "watched", id)} className={`movie__action ${addedToWatched ? 'active' : ''}`}><a href="/" > </a><span>{addedToWatched ? "Added to Watched" : watched}</span></div>
                                            <div onClick={(e) => this.addToCollection(e, "maybe-later", id)} className={`movie__action ${addedToMaybeLater ? 'active' : ''}`}><a href="/" > </a><span>{addedToMaybeLater ? "Added to Maybe Later" : maybeLater}</span></div>
                                        </div>
                                    )}
                                />
                            ))}
                        </Switch>

                        {homepage && <a href={homepage} className='movie__btn movie__btn--goto'>Check Movie</a>}
                        {similarResult > 0 && <button onClick={similar} className='movie__btn movie__btn--similar'>Show Similar</button>}
                        <div className="movie__rate">
                            <span>Your rating:</span>
                            <StarRatings
                                rating={this.state.rating}
                                starDimension="20px"
                                starSpacing="3px"
                                numberOfStars={10}
                                starHoverColor='#15a4fa'
                                starRatedColor='#ffab00'
                                changeRating={this.changeRating.bind(this)}
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