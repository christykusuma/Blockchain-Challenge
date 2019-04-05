import {
    SearchActionTypes
} from './searchConstants';

const INITIAL_STATE = {
  address: ''
};

const searchStateReducer = function (state = INITIAL_STATE, {type, payload}) {
    switch (type) {
      case (SearchActionTypes.SEARCH_ADDRESS):
            return payload;
        default:
            return state;
    }

}

export default searchStateReducer;