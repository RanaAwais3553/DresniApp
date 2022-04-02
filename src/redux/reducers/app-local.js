import { SETUP_BOOKING, APP_LOCAL_FAILED } from '../types';

const initialState = {
    bookingPayload: {},
    loading: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETUP_BOOKING:
            return {
                ...state,
                bookingPayload: Object.assign(initialState.bookingPayload, action.payload.bookingPayload),
                loading: true,
            };

        case APP_LOCAL_FAILED:
            return {
                ...state,
                // error: action.payload.error,
                loading: false,
            };

        default:
            return state;

    }
}