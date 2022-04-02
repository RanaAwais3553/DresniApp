import {
  REGISTER_TUTOR_COACH,
  GET_TUTOR_ACCOUNT,
  GET_TUTOR_DETAIL,
  UPDATE_TUTOR_ACCOUNT,
  GET_TUTOR_LIST,
  SAVE_TUTOR_SCHEDULE,
  DELETE_SUBJECT,
  UPDATE_SUBJECT_LANGUAGE,
  GET_TUTOR_SCHEDULE,
  SAVE_TUTOR_SUBJECT,
  SAVE_REQUESTED_SUBJECT,
  GET_TUTOR_SUBJECTS,
  SAVE_BANK_DETAIL,
  GET_BANK_DETAIL,
  TUTOR_COACH_REQUEST_FAILED,
} from '../types';

const initialState = {
  user: null,
  userId: null,
  isAuthenticated: false,
  isOTPVerified: false,
  tutorAccount: null,
  tutorDetail: null,
  bankDetail: null,
  tutorSchedule: null,
  tutorSubjects: null,
  loading: false,
  error: null,
  tutorList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TUTOR_LIST:
      return {
        ...state,
        tutorList: action.payload,
      };
    case REGISTER_TUTOR_COACH:
      return {
        ...state,
        loading: false,
      };

    case GET_TUTOR_ACCOUNT:
      return {
        ...state,
        tutorAccount: action.payload.data,
        loading: false,
      };

    case GET_TUTOR_DETAIL:
      return {
        ...state,
        tutorDetail: action.payload.data,
        loading: false,
      };

    case UPDATE_TUTOR_ACCOUNT:
      return {
        ...state,
        loading: false,
      };

    case SAVE_BANK_DETAIL:
      return {
        ...state,
        loading: false,
      };

    case GET_BANK_DETAIL:
      return {
        ...state,
        bankDetail: action.payload.data,
        loading: false,
      };

    case SAVE_TUTOR_SCHEDULE:
      return {
        ...state,
        loading: false,
      };

    case GET_TUTOR_SCHEDULE:
      return {
        ...state,
        tutorSchedule: action.payload.data,
        loading: false,
      };

    case SAVE_TUTOR_SUBJECT:
      return {
        ...state,
        loading: false,
      };

    case SAVE_TUTOR_SUBJECT:
      return {
        ...state,
        loading: false,
      };

    case GET_TUTOR_SUBJECTS:
      return {
        ...state,
        tutorSubjects: action.payload.data,
        loading: false,
      };

    case UPDATE_SUBJECT_LANGUAGE:
      return {
        ...state,
        loading: false,
      };

    case DELETE_SUBJECT:
      return {
        ...state,
        loading: false,
      };

    case TUTOR_COACH_REQUEST_FAILED:
      return {
        ...state,
        // error: action.error,
        loading: false,
      };

    default:
      return state;
  }
};
