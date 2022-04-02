import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SEND_OTP,
  VERIFY_OTP,
  RESEND_OTP,
  LOGIN_ERROR,
  LOGIN_USER,
  LOGOUT,
} from '../types';

const initialState = {
  token: null,
  user: null,
  userId: null,
  isAuthenticated: false,
  isOTPVerified: false,
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  console.log('reducers called', action.payload);
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        userRole: action.payload.userRole,
        isOTPVerified: true,
        isAuthenticated: true,
        loading: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        userId: action.payload.data.acc_id,
        token: action.payload.token,
        userRole: 'student',
        // userRole: action.payload.role,
        isAuthenticated: true,
        loading: false,
      };

    case SEND_OTP:
      return {
        ...state,
        loading: false,
      };

    case VERIFY_OTP:
      return {
        ...state,
        isOTPVerified: true,
        loading: false,
      };

    case RESEND_OTP:
      return {
        ...state,
        loading: false,
      };

    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
      };

    case LOGIN_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
