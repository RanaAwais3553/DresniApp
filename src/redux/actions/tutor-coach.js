import apiClient from '../../config/axios';
import ApiUrls from '../../config/api-urls';
import {
  REGISTER_TUTOR_COACH,
  GET_TUTOR_ACCOUNT,
  SAVE_TUTOR_SUBJECT,
  DELETE_SUBJECT,
  SAVE_REQUESTED_SUBJECT,
  GET_TUTOR_SUBJECTS,
  SAVE_TUTOR_SCHEDULE,
  GET_TUTOR_SCHEDULE,
  SAVE_BANK_DETAIL,
  GET_BANK_DETAIL,
  TUTOR_COACH_REQUEST_FAILED,
  UPDATE_SUBJECT_LANGUAGE,
  UPDATE_TUTOR_ACCOUNT,
  GET_TUTOR_DETAIL,
  GET_TUTOR_LIST,
} from '../types';

export const getTutorAndCoachList = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      `${ApiUrls.getTutorLists}${payload}`,
      //  (data = null),
    );
    console.log('action tutor list is', response.data.status);
    if (response?.data?.status) {
      dispatch({type: GET_TUTOR_LIST, payload: response.data});

      return response.data;
    }
  } catch (error) {
    console.log('action tutor list is', error);
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const RegisterTutorAndCoach = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.tutorRegister,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: REGISTER_TUTOR_COACH, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const GetTutorAccount = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getTutorAccount,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: GET_TUTOR_ACCOUNT, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const GetTutorDetail = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getTutorDetail,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: GET_TUTOR_DETAIL, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const UpdateTutorAccount = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.onTutorAccountUpdate,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: UPDATE_TUTOR_ACCOUNT, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const SaveBankDetail = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.saveBankDetail,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: SAVE_BANK_DETAIL, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const GetBankDetail = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getBankDetail,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: GET_BANK_DETAIL, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const SaveTutorSchedule = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.saveTutorSchedule,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: SAVE_TUTOR_SCHEDULE, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const GetTutorSchedule = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getTutorSchedule,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: GET_TUTOR_SCHEDULE, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const SaveTutorSubject = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.saveTeachingSubjects,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: SAVE_TUTOR_SUBJECT, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const GetTutorSubjects = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.getTeachingSubjects,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: GET_TUTOR_SUBJECTS, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const SaveRequestedSubject = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.saveRequestedSubject,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: SAVE_REQUESTED_SUBJECT, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const UpdateSubjectAndLanguage = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.updateSubjectAndLanguage,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: UPDATE_SUBJECT_LANGUAGE, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};

export const DeleteSubject = payload => async dispatch => {
  try {
    let response = await apiClient().post(
      ApiUrls.deleteSubject,
      JSON.stringify(payload),
    );

    if (response?.data?.statusCode == 200) {
      dispatch({type: DELETE_SUBJECT, payload: response.data});

      return response.data;
    }
  } catch (error) {
    dispatch({
      type: TUTOR_COACH_REQUEST_FAILED,
      error: error?.response?.data?.message,
    });

    if (error?.response?.data?.message) {
      alert(error?.response?.data?.message);
    }
  }
};
