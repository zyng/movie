import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import Loading from "../Loading/Loading";
import * as movieApi from "../helpers/movieApi";

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
    addToCollection = (e, type, movie) => {
        e.preventDefault();
        switch (type) {
            case "mustWatch":
                console.log(movie);
                if (!this.state.addedToMustWatch) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMustWatchMovies(movie)
                        .then(() => this.setState({ savingProccess: false, addedToMustWatch: true }))
                }
                break;
            case "favourite":
                console.log(movie);
                if (!this.state.addedToFavourite) {
                    this.setState({ savingProccess: true });
                    movieApi.addToFavouriteMovies(movie)
                        .then(() => this.setState({ savingProccess: false, addedToFavourite: true }))
                }
                break;
            case "watched":
                console.log(movie);
                if (!this.state.addedToWatched) {
                    this.setState({ savingProccess: true });
                    movieApi.addToWatchedMovies(movie)
                        .then(() => this.setState({ savingProccess: false, addedToWatched: true }))
                }
                break;
            case "maybeLater":
                console.log(movie);
                if (!this.state.addedToMaybeLater) {
                    this.setState({ savingProccess: true });
                    movieApi.addToMaybeLaterMovies(movie)
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
        const { id, title, poster, rating, homepage, genres, similar, similarResult, watched, maybeLater, favourite, mustWatch } = this.props;
        const { savingProccess, addedToMustWatch, addedToFavourite, addedToWatched, addedToMaybeLater } = this.state;
        const genresFormatted = genres.join(`, `);
        const movieObj = {
            movie_id: id,
            title: title,
            homepage: homepage,
            poster_path: poster,
            similarResult: similarResult,
            vote_average: rating,
            genres: genresFormatted
        }
        return (
            <div className="movie">

                <div className="movie__content">
                    <Loading isActive={savingProccess} />
                    <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" />
                    <div className="movie__actions">
                        <div className="movie__add">
                            <div onClick={(e) => this.addToCollection(e, "mustWatch", movieObj)} className={`movie__action ${addedToMustWatch ? 'active' : ''}`}><a href="/" > </a><span>{addedToMustWatch ? "Added to Must Watch" : mustWatch}</span></div>
                            <div onClick={(e) => this.addToCollection(e, "favourite", movieObj)} className={`movie__action ${addedToFavourite ? 'active' : ''}`}><a href="/" > </a><span>{addedToFavourite ? "Added to Favourite" : favourite}</span></div>
                            <div onClick={(e) => this.addToCollection(e, "watched", movieObj)} className={`movie__action ${addedToWatched ? 'active' : ''}`}><a href="/" > </a><span>{addedToWatched ? "Added to Watched" : watched}</span></div>
                            <div onClick={(e) => this.addToCollection(e, "maybeLater", movieObj)} className={`movie__action ${addedToMaybeLater ? 'active' : ''}`}><a href="/" > </a><span>{addedToMaybeLater ? "Added to Maybe Later" : maybeLater}</span></div>
                        </div>
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