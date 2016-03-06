const initialState = {
  entities: {},
  collections: {
    trending: [],
    searchResult: []
  }
};

if (window.__posts) {
  window.__posts.forEach(post => {
    initialState.entities[post.id] = post;
  });

  initialState.collections.trending = window.__posts.map(p => p.id);
}

export default function (state = initialState, action) {
  switch (action.type) {

  case '@@post/GET':
    if (action.asyncState === '@@asyncState/SUCCESS') {
      const { postCollectionId = 'trending', posts } = action;

      posts.forEach(post => {
        state.entities[post.id] = post;
      });

      // Hmm.. should use Immutable.js in the future
      state = {
        ...state,
        collections: {
          ...state.collections,
          [postCollectionId]: posts.map(p => p.id)
        }
      };
    }

    break;

  case '@@post/UPDATE':
    if (action.asyncState === '@@asyncState/SUCCESS') {
      const { post } = action;

      state = {
        ...state,
        entities: {
          ...state.entities,
          [post.id]: post
        }
      };
    }

    break;

  case '@@post/DELETE':
    const { postId } = action;

    delete state.entities[postId];

    state = {
      ...state,
      collections: {
        trending: state.collections.trending.filter(id => id !== postId),
        searchResult: state.collections.searchResult.filter(id => id !== postId)
      }
    };
  }
  return state;
}
