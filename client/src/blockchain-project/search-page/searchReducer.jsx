import {
    SearchActionTypes
} from './searchConstants';

const INITIAL_STATE = {
  address: ''
};

const searchReducer = function (state = INITIAL_STATE, action) {
    switch (action.type) {
      case (SearchActionTypes.SEARCH_ADDRESS):
        return action.address;
      default:
          return state;
    }

}

export default searchReducer;