import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Link, Route } from "react-router-dom";
import History from '../History/History';
import * as movieApi from "../helpers/movieApi";
import Loading from "../Loading/Loading";
import Media from 'react-media';

class Navigation extends Component {

    state = {
        historyList: [],
        isLoading: false,
    }

    browseNavLinks = [
        {
            path: '/'
        },
        {
            path: '/popular'
        },
        {
            path: '/top_rated'
        },
        {
            path: '/now_playing'
        },
        {
            path: '/upcoming'
        },
        {
            path: '/watched'
        },
        {
            path: '/must-watch'
        },
        {
            path: '/favourite'
        },
        {
            path: '/similar'
        },
        {
            path: '/similar/:match'
        },
        {
            path: '/add-movie',
            browseInActive: true
        },
        {
            path: '/maybe-later'
        },
        {
            path: '/history',
            browseInActive: true
        }
    ]
    componentDidMount() {
        this.menuWidth = document.querySelector('.menu').offsetWidth;

        this.setState({ isLoading: true });
        movieApi.getHistory()
            .then(data => this.setState({ historyList: data, isLoading: false }))
    }

    toggleMenu = () => {
        const menu = document.querySelector('.menu');
        const currentWidth = menu.offsetWidth;


        if (menu.classList.contains('active') && currentWidth !== this.menuWidth)
            menu.classList.remove('active')
        else
            menu.classList.add('active')
    }

    toggleMenuOnHover = () => {
        if ("ontouchstart" in document.documentElement)
            this.toggleMenu();
        else
            return false
    }
    render() {
        const lastTwoHistory = this.state.historyList.slice(-2);

        const historyList = lastTwoHistory.map(history => (
            <History key={history.id}
                movieName={history.movie_name}
                collection={history.collection}
                action={history.action}
                createdAt={history.created_at}
                historyIcon
            />
        ))

        return (

            <aside className="menu" onMouseEnter={this.toggleMenu} onMouseLeave={this.toggleMenu}>
                <div className="menu__new-movie">
                    <Link to='/add-movie' className="addMovie"><i className="fa fa-plus"></i><span>Add a movie</span></Link>
                </div>
                <nav className="menu__movie-search">

                    {this.browseNavLinks.map((link, index) => (
                        <Route
                            key={index}
                            path={link.path}
                            exact
                            render={() => (
                                <Link to='/' className={`${link.browseInActive ? '' : 'active'}`}><i className="fa fa-search"></i>Browse</Link>
                            )}
                        />
                    ))}

                    <NavLink to='/history' exact activeClassName="active"><i className="fa fa-history"></i>History</NavLink>
                </nav>

                <div className="menu__personal-categories">
                    <NavLink to='/must-watch' activeClassName="active"><span className="category-icon"></span><span className="category-name">Must watch titles</span></NavLink>
                    <NavLink to='/favourite' activeClassName="active"><span className="category-icon"></span><span className="category-name">Favourites titles</span></NavLink>
                    <NavLink to='/watched' activeClassName="active"><span className="category-icon"></span><span className="category-name">Watched titles</span></NavLink>
                    <NavLink to='/maybe-later' activeClassName="active"><span className="category-icon"></span><span className="category-name">Maybe later titles</span></NavLink>
                </div>
                <Media query="(max-height: 800px)">
                    {matches => matches ? (
                        <button className="hideMenu" onClick={this.toggleMenu}><span className="fa fa-arrow-left" aria-hidden="true"></span></button>
                    )
                        : (
                            <div className="menu__history">
                                {(this.state.isLoading && <Loading isActive page history />) || (historyList.length > 0 ? historyList : "No history of your activity.")}
                            </div>
                        )

                    }
                </Media>

            </aside >

        );
    }
}

export default Navigation;