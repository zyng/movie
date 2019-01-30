import React, { Component } from 'react';
import Movies from './Movies';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

const routes = [
    {
        path: "/",
    },
    {
        path: "/:id",
    },
];

class MainContent extends Component {

    state = {
        type: 'popular'
    }

    changeTypeMovies = (type) => {
        this.setState({ type: type });
    }

    render() {
        return (
            <section className="main__content">
                <Router>
                    <>
                        <header className="main__header">
                            <div className="main__title">{this.state.type === "similar" ? 'Similar' : 'Browse Available'} Movies</div>
                            <div className="main__actions-bar">

                                <ul className="main__filters">
                                    <li onClick={() => this.changeTypeMovies('popular')} >
                                        <NavLink exact to="/popular" activeClassName="active"><span>Popular Movies</span></NavLink>
                                    </li>
                                    <li onClick={() => this.changeTypeMovies('top_rated')} >
                                        <NavLink exact to="/top_rated" activeClassName="active"><span>Top Rated Movies</span></NavLink>
                                    </li>
                                    <li onClick={() => this.changeTypeMovies('now_playing')}  >
                                        <NavLink exact to="/now_playing" activeClassName="active"><span >Now Playing Movies</span></NavLink>
                                    </li>
                                    <li onClick={() => this.changeTypeMovies('upcoming')} >
                                        <NavLink exact to="/upcoming" activeClassName="active"><span>Upcoming Movies</span></NavLink>
                                    </li>
                                    <li onClick={() => this.changeTypeMovies('must-watch')} >
                                        <NavLink exact to="/must-watch" activeClassName="active"><span>Must-watch</span></NavLink>
                                    </li>
                                </ul>

                                <label htmlFor="search-movie">
                                    <input onChange={this.handleInput} type="text" id="search-movie" placeholder="Enter keywords..." />
                                    <i className="fa fa-search"></i>
                                </label>
                            </div>
                        </header>

                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={true}
                                component={(props) => <Movies {...props} type={this.state.type} />}
                            />
                        ))}
                    </>
                </Router>
            </section>

        );
    }
}

export default MainContent;