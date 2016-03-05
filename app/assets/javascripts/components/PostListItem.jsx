import React, { PropTypes } from 'react';
import moment from 'moment';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';

import PostEditor from './PostEditor';

const { Images } = window;

export default class PostListItem extends React.Component {

  static propTypes = {
    post: PropTypes.object.isRequired
  };

  constructor() {
    super(...arguments);

    this.toggleEditMode = ::this.toggleEditMode;
  }

  state = {
    editMode: false
  };

  render() {
    const { post } = this.props;
    const { editMode } = this.state;

    return (
      <div style={styles.wrapper}>
        <section style={styles.postMeta}>
          <img
            style={styles.avatar}
            src={Images.avatar}
          />
          <div style={styles.postSummary}>
            <a href="#" style={styles.posterName}>Quangbuu Le</a>
            <div style={styles.postSupplimental}>
              <span style={styles.moment}>
                {moment(post['created_at']).fromNow()}
              </span>
            </div>
          </div>
        </section>
        {!editMode ?
          <section>
            <div style={styles.postTitle}>{post.title}</div>
            <div style={styles.postBody} dangerouslySetInnerHTML={{
              __html: post['body_html'] || post['body']
            }} />
          </section> :
          <PostEditor
            post={post}
            onCancel={this.toggleEditMode}
            onUpdate={this.toggleEditMode}
            onDelete={this.toggleEditMode}
          />
        }
        <section style={styles.actionButtons}>
          {!editMode &&
            <Button bsSize="small" onClick={this.toggleEditMode}>
              <Glyphicon glyph="edit" /> Edit
            </Button>
          }
        </section>
      </div>
    );
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode
    });
  }
}

export const styles = {
  wrapper: {
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 20,
    borderTop: '1px solid rgba(0, 0, 0, 0.1)'
  },

  postMeta: {
    display: 'flex'
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16
  },

  postSummary: {
    marginLeft: 10
  },

  posterName: {
    display: 'block'
  },

  postSupplimental: {
    fontSize: '0.9em'
  },

  moment: {
    opacity: 0.5
  },

  postTitle: {
    margin: 0,
    marginTop: 20,
    padding: 0,
    fontSize: 24,
    fontWeight: 'bold'
  },

  postBody: {
  },

  actionButtons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 20
  }
};
