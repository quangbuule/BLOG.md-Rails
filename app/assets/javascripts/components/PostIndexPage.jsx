import React, { PropTypes } from 'react';
import request from 'superagent';
import { connect } from 'react-redux';
import qs from 'qs';

import Profile from './Profile';
import PostList from './PostList';

export default connect(({ Post }, props) => {
  const { q } = props.location.query;
  const postCollection = Post.collections[q ? 'searchResult' : 'trending'];

  return {
    posts: postCollection && postCollection.map(id => Post.entities[id])
  };
})(class PostIndexPage extends React.Component {

  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object),
    location: PropTypes.shape({
      query: PropTypes.object
    })
  };

  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func
    })
  };

  render() {
    const { posts = [] } = this.props;

    return (
      <div>
        <Profile />
        <div className="container" style={styles.postListContainer}>
          {posts.length > 0 ?
            <PostList title="Trending" posts={posts} />
            :
            <div style={styles.noPost}>
              No post was found.
            </div>
          }
        </div>
      </div>
    );
  }

  fetchPosts({ q }) {
    request(`/posts.json?${qs.stringify({ q })}`)
      .end((err, res) => {
        const posts = res.body;

        this.context.store.dispatch({
          postCollectionId: q ? 'searchResult' : 'trending',
          type: '@@post/GET',
          asyncState: '@@asyncState/SUCCESS',
          posts
        });
      });
  }

  componentWillReceiveProps(nextProps) {
    const { q } = nextProps.location.query;
    if (q !== this.props.location.query.q) {
      this.fetchPosts({ q });
    }
  }

  componentDidMount() {
    const { q } = this.props.location.query;
    this.fetchPosts({ q });
  }
});

const styles = {
  postListContainer: {
    marginTop: 20,
    maxWidth: 640
  },

  noPost: {
    fontSize: 32,
    fontWeight: 100
  }
};
