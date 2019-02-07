import React, { Component } from 'react';
import Movies from './Movies';
import HistoryBrowse from '../History/HistoryBrowse';
import SomethingWrong from '../Errors/SomethingWrong';

import { BrowserRouter as Router, Route, NavLink, Switch } from "react-router-dom";


class MainContent extends Component {

    state = {
        type: 'popular',
    }
    movies = React.createRef();
    routes = [
        {
            path: "/",
        },
        {
            path: "/:id",
        },
        {
            path: "/:id/:match"
        },
    ];

    changeTypeMovies = (type) => {
        this.setState({ type: type });
    }

    changeInput = (e) => {
        this.movies.current.handleInput(e);
    }

    render() {
        return (
            <section className="main__content">
                <>

                    <header className="main__header">
                        <div className="main__title">{this.state.type === "similar" ? 'Similar' : 'Browse Available'} Movies</div>
                        <div className="main__actions-bar">
                            <ul className="main__filters">
                                <li onClick={() => this.changeTypeMovies('popular')} >
                                    <NavLink exact strict to="/popular" activeClassName="active"><span>Popular Movies</span></NavLink>
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
                            </ul>
                            <label htmlFor="search-movie">
                                <input onChange={this.changeInput} type="text" id="search-movie" placeholder="Enter keywords..." />
                                <i className="fa fa-search"></i>
                            </label>
                        </div>
                    </header>
                    <Switch>
                        <Route path='/history' exact component={HistoryBrowse} />
                        <Route path='/add-movie' exact component={SomethingWrong} />
                        <Route path='/logout' exact component={SomethingWrong} />
                        {this.routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                strict
                                exact
                                component={(props) => <Movies {...props} ref={this.movies} />}
                            />
                        ))}

                    </Switch>
                </>
            </section>

        );
    }
}

export default MainContent;