import React, { Component } from 'react';

class MainContent extends Component {



    render() {
        return (


            <section className="main">


                <header className="main__header">
                    <div className="main__title">Browse Available Books</div>
                    <div className="main__actions-bar">
                        <ul className="main__filters">
                            <li>All Movies</li>
                            <li>Most Recent</li>
                            <li>Most Popular</li>
                            <li>Free Movies</li>
                        </ul>
                        <input type="text" className="main__movie-search" />
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