import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import MainContent from './Main/Main';


class App extends Component {


  render() {
    return (
      <>
        <Header />

        <main>
          <Navigation />
          <MainContent />
        </main>

      </>
    );
  }
}

export default App;
