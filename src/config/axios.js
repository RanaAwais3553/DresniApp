import axios from 'axios';
import {AsyncStorageService} from '../services';
import ApiUrls from './api-urls';

const apiClient = (baseURL, timeout, payload) => {
  const defaultOptions = {
    // baseURL: process.env.REACT_APP_API_PATH,
    baseURL: baseURL || ApiUrls.baseUrl,
    method: 'post',
    timeout: timeout || 30000,
    headers: {
      'Content-Type': 'form-data',
    },
    data: payload && payload,
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  // Set the Access token for any request
  instance.interceptors.request.use(
    async config => {
      const token = await AsyncStorageService.getString('@auth_token');
      config.headers['auth-token'] = token ? `${token}` : '';

      return config;
    },
    error => {
      // Do something with request error

      return Promise.reject(error);
    },
  );

  // response interceptor
  instance.interceptors.response.use(
    response => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      const authToken = response.headers['auth-token'];
      if (authToken) AsyncStorageService.storeString('@auth_token', authToken);

      return response;
    },
    async error => {
      const originalRequest = error.config;
      // var authToken = await AsyncStorageService.getString('auth_token');

      // if (error?.response?.status === 401 && !originalRequest._retry) {
      //     originalRequest._retry = true;
      //     return instance.post(ApiUrls.refreshToken, JSON.stringify({ authToken, refreshToken }))
      //         .then(res => {
      //             if (res.status === 200) {
      //                 authToken = res.headers['Auth-token']
      //                 // // 2) Change Authorization header
      //                 // axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorageService.getAccessToken();

      //                 originalRequest.headers['Auth-token'] = `Bearer ${authToken}`;
      //                 // 3) return originalRequest object with Axios.
      //                 return axios(originalRequest);
      //             }
      //         })
      // }

      return Promise.reject(error);
    },
  );

  return instance;
};

export default apiClient;
