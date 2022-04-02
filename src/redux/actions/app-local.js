import apiClient from '../../config/axios'
import ApiUrls from '../../config/api-urls'
import { SETUP_BOOKING, APP_LOCAL_FAILED } from '../types'
import { AsyncStorageService } from '../../services';


export const SetupBooking = payload => async dispatch => {
    console.log('payload => ', payload)
    dispatch({ type: SETUP_BOOKING, payload: { bookingPayload: payload } });
}
