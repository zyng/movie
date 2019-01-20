import React from 'react';
import StarRatings from 'react-star-ratings';

const Movie = ({ title, poster, rating, homepage, genres }) => {

    const genresFormatted = genres.join(`, `);
    return (
        <div className="movie">
            <div className="movie__content">
                <img src={`https://image.tmdb.org/t/p/original${poster}`} alt="" />
                <div className="movie__actions">
                    <div className="movie__add">
                        <div className="movie__action"><a href="/" > </a><span>Add to Must watch</span></div>
                        <div className="movie__action"><a href="/" > </a><span>Add to Best of</span></div>
                        <div className="movie__action"><a href="/" > </a><span>Add to Classic</span></div>
                        <div className="movie__action"><a href="/" > </a><span>Add to Black list</span></div>
                </div>
                <a href={homepage} className='movie__goto'>Check Movie</a>
                <div className="movie__rate">
                    <span>Your rating:</span>
                    <StarRatings
                        rating={0}
                        starDimension="20px"
                        starSpacing="3px"
                        numberOfStars={10}
                        starRatedColor='rgb(255,206,0)'
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

export default Movie;