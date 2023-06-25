import React from 'react';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Ravan from './Components/Ravan';
import Data from './Components/Data.json';

const initialState = {
  name: Data,
};

// Reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'AddName':
      return { ...state, name: action.data };
    case 'AddData':
      return { ...state, name: action.data };

    default:
      return state;
  }
}

const store = createStore(reducer);
function App() {
  return (
    <Provider store={store}>
      <Ravan />
    </Provider>
  );
}

export default App;
