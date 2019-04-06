import axios from 'axios';

export const fetchAddress = () => async (dispatch) => {
    const res = await axios.get(`/api/fetch_data`);
    console.log('dummy data', res.data);
};