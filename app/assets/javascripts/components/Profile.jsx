import React, { PropTypes } from 'react';
const { Images } = window;

export default class Profile extends React.Component {

  static propTypes = {}

  render() {
    return (
      <div style={styles.wrapper}>
        <div className="container">
          <div style={styles.innerWrapper}>
            <div style={styles.infoWrapper}>
              <h2 style={styles.profileName}>Quangbuu Le</h2>
              <div style={styles.bref}>
                Software Engineer, Vietnam.
              </div>
            </div>
            <img style={styles.avatar} src={Images.avatar} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#fafafa'
  },

  innerWrapper: {
    paddingTop: 20,
    paddingBottom: 30,
    maxWidth: 640,
    margin: 'auto',
    display: 'flex'
  },

  infoWrapper: {
    flex: 1
  },

  profileName: {
    fontWeight: 100
  },

  bref: {
    opacity: 0.7,
    fontSize: '1.1em'
  },

  avatar: {
    width: 128,
    height: 128,
    borderRadius: 64
  }
};
