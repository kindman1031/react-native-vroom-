import { Actions } from 'react-native-router-flux';

const {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP_SUCCESS,
    DEST_SUCCESS,
    WATCH_SUCCESS,
    DRIVER_SUCCESS,
    MUSIC_SUCCESS
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
        case DEST_SUCCESS:
            return Object.assign({}, state, {
                dest:   action.payload.dest,
            });
            break;
        case DRIVER_SUCCESS:
            return Object.assign({}, state, {
                watch:   action.payload.watch,
            });
            break;
        case WATCH_SUCCESS:
            return Object.assign({}, state, {
                music:   action.payload.music,
            });
            break;
        case MUSIC_SUCCESS:
            return Object.assign({}, state, {
                final:   action.payload.final,
            });
            break;
        case SIGNUP_SUCCESS:
            return Object.assign({}, state, {
                user:   action.payload.watch,
            });
            break;
        default:
            return state;
    }
}
