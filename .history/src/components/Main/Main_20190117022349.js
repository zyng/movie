import React, { Component } from 'react';
import avatar from '../../img/movie1.png';
import StarRatings from 'react-star-ratings';


class MainContent extends Component {



    render() {
        return (


            <section className="main__content">

                <StarRatings
                    rating={4}
                    starDimension="40px"
                    starSpacing="15px"
                    numOfStars='10'
                />
                <header className="main__header">
                    <div className="main__title">Browse Available Books</div>
                    <div className="main__actions-bar">
                        <ul className="main__filters">
                            <li className="active">All Movies</li>
                            <li>Most Recent</li>
                            <li>Most Popular</li>
                            <li>Free Movies</li>
                        </ul>
                        <label htmlFor="search-movi">
                            <input type="text" id="search-movie" placeholder="Enter keywords..." />
                            <i className="fa fa-search"></i>
                        </label>
                    </div>
                </header>

                <section className="">

                    <div className="movies">

                        <div className="movie">
                            <div className="movie__content">
                                <img src={avatar} alt="" />
                                <div className="movie__actions">
                                    <div className="movie__add">
                                        <div className="movie__action"><a href=""></a><span>Add to Must watch</span></div>
                                        <div className="movie__action"><a href=""></a><span>Add to Best of</span></div>
                                        <div className="movie__action"><a href=""></a><span>Add to Classic</span></div>
                                        <div className="movie__action"><a href=""></a><span>Add to Black list</span></div>
                                    </div>
                                    <a href='/' className='movie__goto'>Check Movie</a>
                                </div>
                            </div>
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <span className="movie__title">Jewels of Nizam</span>
                                    <span className="movie__category">Comedy</span>
                                </div>
                                <div className="movie__rating">7.4</div>
                            </div>
                        </div>


                    </div>


                </section>

            </section>

        );
    }
}

export default MainContent;