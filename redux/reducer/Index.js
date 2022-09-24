import { combineReducers } from 'redux';
import friendsReducer from "./friends/Reducer";

const allReducers = combineReducers({
  friendsReducer
});


const rootReducer = (state, action) => {
  switch (action.type) {
    case 'reset_all_reducer/SIGN_OUT':
      state = undefined;
      break;
      return state;
  }
  return allReducers(state, action);
};

export default rootReducer;