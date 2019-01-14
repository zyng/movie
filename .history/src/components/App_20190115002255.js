import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';

let divStyle = {
  margin: '40px',
  border: '5px solid pink'
};

class App extends Component {


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
