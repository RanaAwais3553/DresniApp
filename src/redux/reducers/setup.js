import {
  COUNTRY_CODES,
  CHECK_WALKTHROUGH,
  DONE_WALKTHROUGH,
  SETUP_REQUEST_FAILED,
} from '../types';

const initialState = {
  countryCodes: null,
  loadings: false,
  wScreens: null,
  data: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHECK_WALKTHROUGH:
      return {
        ...state,
        loadings: true,
      };

    case DONE_WALKTHROUGH:
      return {
        ...state,
        wScreens: action.wScreens,
        loadings: false,
      };

    case COUNTRY_CODES:
      return {
        ...state,
        countryCodes: action.payload.data,
        loadings: false,
      };

    case SETUP_REQUEST_FAILED:
      return {
        ...state,
        // error: action.payload.error,
        loadings: false,
        // getSetupFailed: [],
        // error: action.error
      };

    default:
      return state;
  }
};
