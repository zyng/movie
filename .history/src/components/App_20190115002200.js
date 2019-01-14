import React, { Component } from 'react';

import Header from './Header/Header';
import Navigation from './Navigation/Navigation';


class App extends Component {
  const style = {
    width: "100%",
    background: "red'
  }
  render() {
    return (
      <>
        <Header />
        <Navigation />
        <p style={{}}>asdjaklskdas</p>
      </>
    );
  }
}

export default App;
