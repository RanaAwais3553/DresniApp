import apiClient from '../../config/axios'
import ApiUrls from '../../config/api-urls'
import { REGISTER_STUDENT_USER, STUDENT_USER_REQUEST_FAILED } from '../types'


export const RegisterStudent = payload => async dispatch => {
    try {
        let response = await apiClient().post(ApiUrls.studentRegister, JSON.stringify(payload));

        if (response?.data?.statusCode == 200) {
            dispatch({ type: REGISTER_STUDENT_USER, payload: response.data });

            return response.data;
        }
    } catch (error) {
        dispatch({ type: STUDENT_USER_REQUEST_FAILED, error: error?.response?.data?.message });

        if (error?.response?.data?.message) {
            alert(error?.response?.data?.message);
        }
    }
}
