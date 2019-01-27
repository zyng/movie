import React, { Component } from 'react';
import $ from 'jquery';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import MainContent from './Main/Main';



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
        <Header />
        <main>
          <Navigation />
          <MainContent action="overwrite" page={1} type="popular" />
        </main>


        <button onClick={this.handleGoToTop} className="scrollToTop"><i class="fa fa-angle-double-up"></i></button>
      </>
    );
  }
}

export default App;
