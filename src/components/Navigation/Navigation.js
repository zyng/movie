import React, { Component } from 'react';


class Navigation extends Component {


    render() {
        return (
            <aside className="menu">
                <div className="menu__new-movie">
                    <button><i className="fa fa-plus"></i>Add a movie</button>
                </div>
                <nav className="menu__movie-search">
                    <a href="/" className="active"><i className="fa fa-search"></i>Browse</a>
                    <a href="/"><i className="fa fa-history"></i>History</a>
                </nav>

                <div className="menu__personal-categories">
                    <a href="/">Must watch titles</a>
                    <a href="/">Favourites titles</a>
                    <a href="/">Watched titles</a>
                    <a href="/">Maybe later titles</a>
                </div>

                <div className="menu__history">
                    <div className="history__notification">
                        <i className="fa fa-history"></i>
                        <div className="notification__description">
                            <div className="notification__text">You added <span>Fight Club</span> to your <span>Must Watch Titles</span>.</div>
                            <div className="notification__time">24 minutes ago</div>
                        </div>
                    </div>
                    <div className="history__notification">
                        <i className="fa fa-history"></i>
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