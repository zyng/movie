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
                            <input type="text" id="search-movie" placeholder="Enter keywords" />
                            <i class="fa fa-search"></i>
                        </label>
                    </div>
                </header>

                <section className="">

                    <div className="main__movies">

                        ss
                    </div>

                </section>
            </section>



        );
    }
}

export default MainContent;