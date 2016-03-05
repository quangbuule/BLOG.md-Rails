import React, { PropTypes } from 'react';
import NavBar from './NavBar';

export default class Application extends React.Component {

  render() {
    return (
      <div>
        <NavBar />
        {this.props.children}
      </div>
    );
  }
}
