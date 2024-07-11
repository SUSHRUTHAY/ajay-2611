import axios from 'axios';

export const getFitnessRecords = (token) => async(dispatch) => {
    try {
        const response = await axios.get('/api/fitness-records', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'GET_RECORDS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_RECORDS_FAIL', payload: error.response.data });
    }
};

export const addFitnessRecord = (recordData, token) => async(dispatch) => {
    try {
        await axios.post('/api/fitness-records', recordData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'ADD_RECORD_SUCCESS' });
        dispatch(getFitnessRecords(token));
    } catch (error) {
        dispatch({ type: 'ADD_RECORD_FAIL', payload: error.response.data });
    }
};

export const deleteFitnessRecord = (id, token) => async(dispatch) => {
    try {
        await axios.delete(`/api/fitness-records/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'DELETE_RECORD_SUCCESS' });
        dispatch(getFitnessRecords(token));
    } catch (error) {
        dispatch({ type: 'DELETE_RECORD_FAIL', payload: error.response.data });
    }
};

export const updateFitnessRecord = (id, recordData, token) => async(dispatch) => {
    try {
        await axios.put(`/api/fitness-records/${id}`, recordData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'UPDATE_RECORD_SUCCESS' });
        dispatch(getFitnessRecords(token));
    } catch (error) {
        dispatch({ type: 'UPDATE_RECORD_FAIL', payload: error.response.data });
    }
};