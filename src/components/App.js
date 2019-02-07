import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import MainContent from './Main/Main';
import { BrowserRouter as Router } from "react-router-dom";


class App extends Component {

  componentDidMount() {

    const btnScrollToTop = $('.scrollToTop');

    $(window).scroll(function () {
      if ($(this).scrollTop() > 500) {
        $(btnScrollToTop).fadeIn('slow');
      } else {
        $(btnScrollToTop).fadeOut('slow');
      }
    });

  }

  handleGoToTop = () => {
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  }

  render() {
    return (
      <>
        <Router basename={process.env.PUBLIC_URL}>
          <>
            <Header />
            <main>
              <Navigation />
              <MainContent />
            </main>
          </>
        </Router>

        <button onClick={this.handleGoToTop} className="scrollToTop"><i className="fa fa-angle-double-up"></i></button>
      </>
    );
  }
}

export default App;
