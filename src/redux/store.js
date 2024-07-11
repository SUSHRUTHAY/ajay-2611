import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import fitnessReducer from './reducers/fitnessReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    fitness: fitnessReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;