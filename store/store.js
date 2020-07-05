import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const defaultState = {
  count: 0,
};

const userDefaultState = {
  name: 'jocker',
};

const ADD = {
  type: 'ADD',
};

function addAsync(num) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(ADD);
    }, 2000);
  };
}

function countReducer(state = defaultState, action) {
  // console.log(state, action);
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

const UPDATE = {
  type: 'UPDATE',
  name: 'jack lili',
};

function userReducer(state = userDefaultState, action) {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}

const reducer = combineReducers({
  count: countReducer,
  user: userReducer,
});

// const store = createStore(reducer,
//   composeWithDevTools(applyMiddleware(thunk)));

// console.log(store.getState());
// store.dispatch(ADD);
// store.dispatch(UPDATE);
// store.dispatch(addAsync());
// console.log(store.getState());

// store.subscribe(() => {
//   console.log(store.getState());
// });

// export default store;

export default (state) => createStore(
  reducer,
  {
    count: defaultState,
    user: userDefaultState,
    ...state,
  },
  composeWithDevTools(applyMiddleware(thunk)),
);
