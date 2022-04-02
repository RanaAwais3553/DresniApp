import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_USER,
  LOGOUT,
  RESEND_OTP,
  SEND_OTP,
  VERIFY_OTP,
  CHANGE_PASSWORD,
  OTP_REQUEST_FAILED,
  PASSWORD_REQUEST_FAILED,
} from '../types';
import apiClient from '../../config/axios';
import ApiUrls from '../../config/api-urls';
import {AsyncStorageService} from '../../services';

export const loginUser = payload => async dispatch => {
  dispatch({type: LOGIN_REQUEST});
  let token = await AsyncStorageService.getString('@auth_token');
  const user = await AsyncStorageService.getObject('@user');

  dispatch({type: LOGIN_USER, payload: {token, userRole: user?.role}});
};

export const loginHandler = payload => async dispatch => {
  console.log('login data is in auth Action is:!..', payload);
  try {
    dispatch({type: LOGIN_REQUEST});
    let response = await apiClient().post(
      ApiUrls.login,
      // JSON.stringify(payload),
      payload,
    );
    console.log('response is:!...', response.data);
    AsyncStorageService.storeObject('@user', response?.data?.data);
    dispatch({type: LOGIN_SUCCESS, payload: response?.data});
  } catch (error) {
    dispatch({type: LOGIN_ERROR, error: error});

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const logoutHandler = () => async dispatch => {
  dispatch({type: LOGIN_REQUEST});
  await AsyncStorageService.removeString('@auth_token');
  await AsyncStorageService.removeString('@user');
  dispatch({type: LOGOUT});
};

export const SendOTP = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.sendOTP,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: SEND_OTP});

      return response.data;
    }
  } catch (error) {
    dispatch({type: OTP_REQUEST_FAILED, error: error});
    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  }
};

export const VerifyOTP = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.verifyOTP,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: VERIFY_OTP, payload: response.data?.data});

      return response.data;
    }
  } catch (error) {
    dispatch({type: OTP_REQUEST_FAILED, error: error});
    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  }
};

export const ResendOTP = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.resendOTP,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: RESEND_OTP});
    }
  } catch (error) {
    dispatch({type: OTP_REQUEST_FAILED, error: error});
    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
      console.log(error);
    }
  }
};

export const ChangePassword = payload => async dispatch => {
  try {
    let response = await apiClient().put(
      ApiUrls.changePassword,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: CHANGE_PASSWORD, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({type: PASSWORD_REQUEST_FAILED, error: error});
    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
    console.log(error);
  }
};
