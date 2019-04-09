import axios from 'axios';
import { SearchActionTypes } from './searchConstants'

export const fetchAddress = (address) => async (dispatch) => {
    console.log('search address', address)
    const res = await axios.post(`/api/fetch_data`, {address: address});
    console.log('dummy data', res.data);
    dispatch({ type: SearchActionTypes.SEARCH_ADDRESS, address: res.data })
};