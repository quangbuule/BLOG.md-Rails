import React, { PropTypes } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';

import Profile from './Profile';
import PostList from './PostList';


export default connect(({ Post }) => {
  return {
    posts: Post.collections.trending.map(id => Post.entities[id])
  };
})(class PostIndexPage extends React.Component {

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func
    })
  };

  render() {
    const { posts } = this.props;

    return (
      <div>
        <Profile />
        <div className="container" style={styles.postListContainer}>
          <PostList title="Trending" posts={posts} />
        </div>
      </div>
    );
  }

  componentDidMount() {
    request('/posts.json')
      .end((err, res) => {
        const posts = res.body;

        this.context.store.dispatch({
          type: '@@post/GET',
          asyncState: '@@asyncState/SUCCESS',
          posts
        });
      });
  }
});

const styles = {
  postListContainer: {
    marginTop: 20,
    maxWidth: 640
  }
};
