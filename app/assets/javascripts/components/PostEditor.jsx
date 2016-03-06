import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import request from 'superagent';

import {
  Button,
  Glyphicon,
  Modal
} from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';

import { styles as postListItemStyles } from './PostListItem';

export default class PostEditor extends React.Component {

  static propTypes = {
    post: PropTypes.object.isRequired,
    newPost: PropTypes.bool,
    onCreate: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func
    })
  };

  static defaultProps = {
    post: {
      title: '',
      body: ''
    }
  };

  constructor() {
    super(...arguments);

    this.handleTitleFieldChange = ::this.handleTitleFieldChange;
    this.handleBodyFieldChange = ::this.handleBodyFieldChange;
    this.handleDeleteButtonClick = ::this.handleDeleteButtonClick;
    this.handleCancelButtonClick = ::this.handleCancelButtonClick;
    this.handleOkButtonClick = ::this.handleOkButtonClick;

    this.cancelDelete = ::this.cancelDelete;
    this.confirmDelete = ::this.confirmDelete;

    this.state = {
      post: this.props.post,
      processing: false,
      confirmDeleteModalShow: false
    };
  }

  render() {
    const { newPost } = this.props;
    const { post, processing, confirmDeleteModalShow } = this.state;

    return (
      <div>
        <section style={processing ? styles.fieldsProcessing : null}>
          <Textarea
            placeholder="Title"
            value={post.title}
            onChange={this.handleTitleFieldChange}
            style={{
              ...postListItemStyles.postTitle,
              ...styles.titleField
            }}
          />
          <Textarea
            placeholder="Content"
            value={post.body}
            onChange={this.handleBodyFieldChange}
            style={styles.bodyField}
          />
        </section>
        <section style={postListItemStyles.actionButtons}>
          {!newPost &&
            <Button
              onClick={this.toggleEditMode}
              bsStyle="danger"
              bsSize="small"
              style={{ marginRight: 'auto' }}
              disabled={processing}
              onClick={this.handleDeleteButtonClick}
            >
              <Glyphicon glyph="remove" /> Delete
            </Button>
          }

          <Button
            bsSize="small"
            onClick={this.handleCancelButtonClick}
            disabled={processing}
            style={{ marginRight: 8 }}
          >
            Cancel
          </Button>

          <Button
            bsSize="small"
            bsStyle="success"
            disabled={processing}
            onClick={this.handleOkButtonClick}
          >
            <Glyphicon glyph="ok" />
              {' '}
              {newPost ? 'Post' : 'Update'}
          </Button>
        </section>
        <Modal show={confirmDeleteModalShow} onHide={this.cancelDelete }>
          <Modal.Body>
            <h4>Are you sure want to delete this post?</h4>
            <p>You can't undo this</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.confirmDelete}>Delete</Button>
            <Button onClick={this.cancelDelete} bsStyle="primary">Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

  componentDidMount() {
    findDOMNode(this).querySelectorAll('textarea')[this.props.newPost ? 0 : 1].focus();
  }

  handleTitleFieldChange(e) {
    const { post } = this.state;

    this.setState({
      post: {
        ...post,
        title: e.target.value
      }
    });
  }

  handleBodyFieldChange(e) {
    const { post } = this.state;

    this.setState({
      post: {
        ...post,
        body: e.target.value
      }
    });
  }

  handleDeleteButtonClick() {
    this.setState({
      confirmDeleteModalShow: true
    });
  }

  confirmDelete() {
    const { post } = this.state;

    this.setState({ processing: true });

    request.delete(`/posts/${post.id}.json`)
      .send(post)
      .end(() => {
        this.setState({ processing: false });
        this.context.store.dispatch({
          type: '@@post/DELETE',
          postId: post.id
        });
        // this.props.onDelete();
      });
  }

  cancelDelete() {
    this.setState({
      confirmDeleteModalShow: false
    });
  }

  handleCancelButtonClick() {
    this.props.onCancel();
  }

  handleOkButtonClick() {
    const { newPost } = this.props;
    const { post } = this.state;

    const requestMethod = newPost ? 'post' : 'patch';
    const apiPath = newPost ? '/posts.json' : `/posts/${post.id}.json`;
    const actionType = newPost ? '@@post/CREATE' : '@@post/UPDATE';

    this.setState({ processing: true });

    request[requestMethod](apiPath)
      .send(post)
      .end((err, res) => {
        const post = res.body;
        this.setState({ processing: false });
        this.context.store.dispatch({
          type: actionType,
          asyncState: '@@asyncState/SUCCESS',
          post
        });
        this.props[newPost ? 'onCreate' : 'onUpdate'](post);
      });
  }
}

const styles = {
  fieldsProcessing: {
    pointerEvents: 'none',
    opacity: 0.5
  },

  titleField: {
    display: 'block',
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    border: 'none',
    padding: 0,
    width: '100%'
  },

  bodyField: {
    display: 'block',
    margin: 0,
    border: 'none',
    padding: 0,
    width: '100%'
  }
};
