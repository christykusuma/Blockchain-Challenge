import axios from 'axios';
import { data } from './data'

export const fetchAddress = () => async (dispatch) => {

    const res = await axios.get(`/api/fetch_data`);
    console.log('dummy data', res.data);

};

// to connect to the backend
// const res = await axios.post('/api/fetch_address')
// console.log('christy results', res)