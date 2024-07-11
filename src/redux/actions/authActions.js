import axios from 'axios';
import { toast } from 'react-toastify';

export const registerUser = (userData) => async(dispatch) => {
    try {
        await axios.post('/api/register', userData);
        dispatch({ type: 'REGISTER_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'REGISTER_FAIL', payload: error.response.data });
    }
};

export const loginUser = (userData) => async(dispatch) => {
    try {
        const response = await axios.post('/api/login', userData);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });
    toast.info('Logged out successfully.');
};