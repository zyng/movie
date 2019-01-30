import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink } from "react-router-dom";

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
                    <NavLink to='/must-watch' activeClassName="active">Must watch titles</NavLink>
                    <NavLink to='/favourite' activeClassName="active">Favourites titles</NavLink>
                    <NavLink to='/watched' activeClassName="active">Watched titles</NavLink>
                    <NavLink to='/maybe-later' activeClassName="active">Maybe later titles</NavLink>
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