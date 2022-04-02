import apiClient from '../../config/axios';
import ApiUrls from '../../config/api-urls';
import {
  COUNTRY_CODES,
  CHECK_WALKTHROUGH,
  DONE_WALKTHROUGH,
  SEARCH_COUNTRY_CODES,
  SETUP_REQUEST_FAILED,
} from '../types';
import {AsyncStorageService} from '../../services';

export const CheckWalkthrough = payload => async dispatch => {
  dispatch({type: CHECK_WALKTHROUGH});
  const wScreens = await AsyncStorageService.getString('@walkthrough');
  dispatch({type: DONE_WALKTHROUGH, wScreens});
};

export const SetupWalkthrough = payload => async dispatch => {
  dispatch({type: CHECK_WALKTHROUGH});
  await AsyncStorageService.storeString('@walkthrough', 'showed');
  dispatch({type: DONE_WALKTHROUGH, wScreens: 'showed'});
};

export const GetCountryCodes = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getCountryDialCodes,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      console.log('Get country data is:', response.data);
      dispatch({type: COUNTRY_CODES, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: SETUP_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });
    console.log(error.response.data);
  }
};

export const SearchCountryCodes = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.searchCountryCodes,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      return response.data;
    }
  } catch (error) {
    dispatch({
      type: SETUP_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });
    console.log(error.response.data);
  }
};

// export const GetFieldValues = payload => async dispatch => {
//     try {
//         let response = await apiClient().post(ApiUrls.getFieldValues, JSON.stringify(payload));

//         if (response?.data?.statusCode == 200) {
//             dispatch({ type: GET_FIELD_VALUES, payload: response.data });

//             return response.data;
//         }
//     } catch (error) {
//         dispatch({ type: SETUP_REQUEST_FAILED, error: error?.response?.data?.message });
//         console.log(error);
//     }
// }
