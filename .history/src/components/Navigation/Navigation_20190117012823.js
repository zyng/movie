import React, { Component } from 'react';


class Navigation extends Component {


    render() {
        return (
            <aside class="menu">
                <div className="menu__new-movie">
                    <button><i class="fa fa-plus"></i>Add a movie</button>
                </div>
                <nav class="menu__movie-search">
                    <a href="/"><i class="fa fa-eye"></i>Now watching</a>
                    <a href="/" class="active"><i class="fa fa-search"></i>Browse</a>
                    <a href="/"><i class="fa fa-shopping-cart"></i>Buy Movie</a>
                    <a href="/"><i class="fa fa-star"></i>Favourite</a>
                    <a href="/"><i class="fa fa-list-ul"></i>Whislist</a>
                    <a href="/"><i class="fa fa-history"></i>History</a>
                </nav>



                <div className="menu__history">
                    <div className="history__notification">
                        <i class="fa fa-history"></i>
                        <div className="notification__description">
                            <div className="notification__text">You added <span>Fight Club</span> to your <span>Must Watch Titles</span>.</div>
                            <div className="notification__time">24 minutes ago</div>
                        </div>
                    </div>
                    <div className="history__notification">
                        <i class="fa fa-history"></i>
                        <div className="notification__description">
                            <div className="notification__text">You added <span>The Trial</span> to your <span>Favourite</span>.</div>
                            <div className="notification__time">24 minutes ago</div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}

export default Navigation;