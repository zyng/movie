import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';


class App extends Component {
  const divStyle = {
    margin: '40px',
    border: '5px solid pink'
  };

  render() {
    return (
      <>
        <Header />
        <Navigation />
        <p style={{ divStyle }}>asdjaklskdas</p>
      </>
    );
  }
}

export default App;
