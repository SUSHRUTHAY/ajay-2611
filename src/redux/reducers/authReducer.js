const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload);
            return {...state, token: action.payload, isAuthenticated: true, loading: false };
        case 'REGISTER_SUCCESS':
        case 'LOGOUT':
            localStorage.removeItem('token');
            return {...state, token: null, isAuthenticated: false, loading: false };
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {...state, error: action.payload, loading: false };
        default:
            return state;
    }
}