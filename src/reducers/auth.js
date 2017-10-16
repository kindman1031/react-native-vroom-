import { Actions } from 'react-native-router-flux';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS
} = require('../lib/constants').default;

const initialState = {
    user:       null,
};

export default function AuthReducers(state = initialState, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                user:   action.payload.user,
            });
            break;
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                user:   action.payload.user,
            });
            break;
        default:
            return state;
    }
}
