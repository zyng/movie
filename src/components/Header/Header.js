import React, { Component } from 'react';
import avatar from '../../img/avatar-01.png';
import ModalHelp from '../Support/ModalHelp';
import { Link } from "react-router-dom";

class Header extends Component {

    state = {
        messagePopUp: false
    }
    popModal = (e) => {
        e.preventDefault();
        this.setState({ messagePopUp: true });
    }

    closeModal = () => {
        this.setState({ messagePopUp: false });
    }

    render() {
        return (
            <>
                {this.state.messagePopUp && <ModalHelp closeModal={this.closeModal} />}
                <header className='header'>
                    <Link to="/" className="header__logo">
                        <div className="header__logo--red"></div>
                        <div className="header__logo--yellow"></div>
                        <div className="header__logo--green"></div>
                    </Link>

                    <div className="header__title">
                        <i className="fa fa-film"></i>
                        <span>MyMovieApp</span>
                    </div>
                    <nav className="header__nav">
                        <button type="button" className="hide-mobile" onClick={(e) => this.popModal(e)} >Help Center</button>
                        <div className="profile">
                            <div className="profile__logo"><img src={avatar} alt="user avatar" /></div>
                            <div className="profile__name">Joe Dave</div>
                            <i className="fa fa-chevron-circle-down"></i>
                            <ul className="profile__menu">
                                <li>
                                    <Link to='/logout'>Log out <span className="fa fa-sign-out" aria-hidden="true"></span></Link>
                                </li>
                                <li>
                                    <button type="button" className="show-mobile" onClick={(e) => this.popModal(e)}>Help Center <span className="fa fa-info" aria-hidden="true"></span></button>
                                </li>
                            </ul>

                        </div>
                    </nav>

                </header>
            </>
        );
    }
}

export default Header;
