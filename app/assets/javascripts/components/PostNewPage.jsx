import React, { PropTypes } from 'react';
import Profile from './Profile';
import PostEditor from './PostEditor';

export default class PostNewPage extends React.Component {

  static contextTypes = {
    router: PropTypes.shape({
      push: PropTypes.func
    })
  };

  constructor() {
    super(...arguments);
    this.handlePostEditorCreate = ::this.handlePostEditorCreate;
  }

  render() {

    return (
      <div>
        <Profile />
        <div className="container" style={styles.postListContainer}>
          <h4>
            Create new blog post
          </h4>
          <PostEditor newPost onCreate={this.handlePostEditorCreate} />
        </div>
      </div>
    );
  }

  handlePostEditorCreate(post) {
    this.context.router.push(`/posts`);
  }
}

const styles = {
  postListContainer: {
    marginTop: 20,
    maxWidth: 640
  }
};
