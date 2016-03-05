import React, { PropTypes } from 'react';
import PostListItem from './PostListItem';

export default class PostList extends React.Component {

  static propTypes = {
    title: PropTypes.string,
    posts: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    const { title, posts } = this.props;

    return (
      <div>
        <h4>{title}</h4>
        {posts.map(post =>
          <PostListItem key={post.id} post={post} />
        )}
      </div>
    );
  }
}
