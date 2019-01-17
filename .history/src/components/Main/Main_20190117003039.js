import React, { Component } from 'react';

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
                            <i class="fa fa-search"></i>
                        </label>
                    </div>
                </header>

                <section className="">

                    <div className="main__movies">

                        <div className="movie">
                            <img src="" alt="" />
                            <div className="movie__description">
                                <div className="movie__title-category">
                                    <div className="movie__title"></div>
                                    <div className="movie__category"></div>
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