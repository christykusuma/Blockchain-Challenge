import axios from 'axios';
import { data } from './data'

export const fetchAddress = () => async (dispatch) => {
    let address = '1AJbsFZ64EpEfS5UAjAfcUG8pH8Jn3rn1F'
    const res = await axios.get(`https://blockchain.info/rawaddr/${address}`)
    console.log('dummy data', res)
};

// to connect to the backend
// const res = await axios.post('/api/fetch_address')
// console.log('christy results', res)