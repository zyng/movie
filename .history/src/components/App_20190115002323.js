import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';

let divStyle = {
  backgroundColor: 'red',
  width: '100%'
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
