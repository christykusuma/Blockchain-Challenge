import { combineReducers } from 'redux';
import { searchReducer } from '../search-page'

export default combineReducers({
    search: searchReducer
});
