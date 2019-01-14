import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';


class App extends Component {


  render() {
    return (
      <>
        <Header />

        <div className="container-fluid">
          <Navigation />
          <p>asdjaklskdas</p>
        </div>

      </>
    );
  }
}

export default App;
