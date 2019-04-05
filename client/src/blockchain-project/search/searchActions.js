import {
    SearchActionTypes
} from './searchConstants';

export const searchAddress = () => {
  return {
    type: SearchActionTypes.SEARCH_ADDRESS
  }
};
