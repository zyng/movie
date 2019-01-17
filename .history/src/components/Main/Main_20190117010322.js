import React, { Component } from 'react';
import avatar from '../../img/movie1.png';


class MainContent extends Component {



    render() {
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
                        <label htmlFor="search-movi">
                            <input type="text" id="search-movie" placeholder="Enter keywords..." />
                            <i className="fa fa-search"></i>
                        </label>
                    </div>
                </header>

                <section className="">

                    <div className="movies">

                        <div className="movie">
                            <img src={avatar} alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">Jewels of Nizam</div>
                                    <div className="movie__category">Comedy</div>
                                </div>
                                <div className="movie_rating">7.4</div>
                            </div>
                        </div>

                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title">1</div>
                                    <div className="movie__category">1</div>
                                </div>
                                <div className="movie_rating"></div>
                            </div>
                        </div>
                    </div>

                </section>

            </section>

        );
    }
}

export default MainContent;