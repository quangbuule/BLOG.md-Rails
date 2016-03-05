import React, { PropTypes } from 'react';
const { Images } = window;

import {
  Navbar,
  Nav,
  NavItem,
  Glyphicon
  } from 'react-bootstrap';

export default class AppNavBar extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func
    })
  };

  constructor() {
    super(...arguments);

    this.transitionToPostIndexPage = ::this.transitionToPostIndexPage;
    this.transitionToPostNewPage = ::this.transitionToPostNewPage;
  }

  render() {
    return (
      <Navbar style={styles.wrapper}>
        <div style={styles.innerWrapper}>
          <Navbar.Header>
            <Navbar.Brand style={styles.brand}>
              <div style={styles.brand}>
                <img height={32} src={Images.blogger} />
                <h4 style={styles.brandName}>BLOG.md</h4>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem
              eventKey={1}
              href="/posts"
              onClick={this.transitionToPostIndexPage}
            >
              Trending
            </NavItem>
            <NavItem
              eventKey={2}
              href="/posts/new"
              onClick={this.transitionToPostNewPage}
            >
              <Glyphicon glyph="plus" />
              {' '}New blog post
            </NavItem>
          </Nav>
          <Nav style={styles.user}>
            <NavItem eventKey={2} href="#">
              <span>Quangbuu Le</span>
              <img style={styles.avatar} src={Images.avatar} />
            </NavItem>
          </Nav>
        </div>
      </Navbar>
    );
  }

  transitionToPostIndexPage(e) {
    e.preventDefault();
    this.context.router.push('/posts');
  }

  transitionToPostNewPage(e) {
    e.preventDefault();
    this.context.router.push('/posts/new');
  }
}

const styles = {
  wrapper: {
    backgroundColor: 'white',
    border: 'none',
    marginBottom: 0
  },

  innerWrapper: {
    height: 64,
    display: 'flex',
    alignItems: 'center'
  },

  brand: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 14
  },

  brandName: {
    marginLeft: 12,
    fontWeight: 'normal'
  },

  user: {
    marginLeft: 'auto'
  },

  avatar: {
    marginLeft: 12,
    width: 32,
    height: 32,
    borderRadius: 16
  }
};
