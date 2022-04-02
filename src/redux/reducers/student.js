import { REGISTER_STUDENT_USER, STUDENT_USER_REQUEST_FAILED } from '../types';

const initialState = {
    user: null,
    userId: null,
    isAuthenticated: false,
    isOTPVerified: false,
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_STUDENT_USER:
            return {
                ...state,
                loading: false
            };

        case STUDENT_USER_REQUEST_FAILED:
            return {
                ...state,
                // error: action.error,
                loading: false
            };

        default:
            return state;

    }
}