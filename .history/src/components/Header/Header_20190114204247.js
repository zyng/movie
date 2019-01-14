import React, { Component } from 'react';
import avatar from '../../img/avatar-01.png';

class Header extends Component {




    render() {
        return (
            <header class='header'>
                <div className="header__logo">
                    <div className="header__logo--red"></div>
                    <div className="header__logo--yellow"></div>
                    <div className="header__logo--green"></div>
                </div>
                <div className="header__title">
                    <i className="fa fa-film"></i>
                    <span>MyMovieApp</span>
                </div>
                <nav className="header__nav">
                    <a href="/">Help Center</a>
                    <a href="/">Our Support</a>
                    <div className="profile">
                        <a href="/">
                            <div className="profile__logo"><img src={avatar} alt="" /></div>
                            <div className="profile__name">Joe Dave</div>
                            <i class="fa fa-chevron-circle-down"></i>
                        </a>
                    </div>
                </nav>

            </header>
        );
    }
}

export default Header;
