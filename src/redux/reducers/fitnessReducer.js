const initialState = {
    records: [],
    error: null,
    loading: true
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'GET_RECORDS_SUCCESS':
            return {...state, records: action.payload, loading: false };
        case 'ADD_RECORD_SUCCESS':
        case 'DELETE_RECORD_SUCCESS':
        case 'UPDATE_RECORD_SUCCESS':
            return {...state, loading: false };
        case 'GET_RECORDS_FAIL':
        case 'ADD_RECORD_FAIL':
        case 'DELETE_RECORD_FAIL':
        case 'UPDATE_RECORD_FAIL':
            return {...state, error: action.payload, loading: false };
        default:
            return state;
    }
}