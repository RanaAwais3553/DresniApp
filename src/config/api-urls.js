// const baseUrl = `http://192.168.1.100:3015`;
const baseUrl = ` https://backend.daresni.net/public`;

// images base url
// const imagesUrl = `http://192.168.1.100:3015`;
const imagesUrl = `http://18.190.50.198:5573`;

export default ApiUrls = {
  baseUrl,
  imagesUrl,
  countryflags: `${imagesUrl}/country-flags/`,

  // auth
  login: `/api/authenticateUser`,
  sendOTP: `/api/v1/auth/sendOTP`,
  verifyOTP: `/api/v1/auth/verifyOTP`,
  resendOTP: `/api/v1/auth/resendOTP`,

  // tutor
  getTutorLists: `/api/tutors/?page_id=`,
  tutorRegister: `/api/v1/tutor-coaches/register`,
  getTutorAccount: `/api/v1/tutor-coaches/getTutorAccount`,
  getTutorDetail: `/api/v1/tutor-coaches/getTutorDetail`,
  onTutorAccountUpdate: `/api/v1/tutor-coaches/onTutorAccountUpdate`,
  saveBankDetail: `/api/v1/tutor-coaches/saveBankDetail`,
  getBankDetail: `/api/v1/tutor-coaches/getBankDetail`,
  saveTutorSchedule: `/api/v1/tutor-coaches/saveTutorSchedule`,
  getTutorSchedule: `/api/v1/tutor-coaches/getTutorSchedule`,
  saveTeachingSubjects: `/api/v1/tutor-coaches/saveTeachingSubjects`,
  getTeachingSubjects: `/api/v1/tutor-coaches/getTeachingSubjects`,
  saveRequestedSubject: `/api/v1/tutor-coaches/saveRequestedSubject`,
  updateSubjectAndLanguage: `/api/v1/tutor-coaches/updateSubjectAndLanguage`,
  deleteSubject: `/api/v1/tutor-coaches/deleteSubject`,

  // student
  studentRegister: `/api/v1/student/register`,

  // public
  getCountryCodes: `/api/v1/public/get-country-codes`,
  getCountryDialCodes: `/api/v1/public/getCountryDialCodes`,
  searchCountryCodes: `/api/v1/public/searchCountryCodes`,

  // payment gateway routes
  tappayment: `/api/v1/tpayment`,
  paypal: `/api/v1/paypal`,
};
