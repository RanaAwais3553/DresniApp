import {combineReducers} from 'redux';
import auth from './auth';
import setup from './setup';
import tutorAndCoach from './tutor_coach';
import student from './student';
import appLocal from './app-local';

const rootReducer = combineReducers({
  auth,
  setup,
  tutorAndCoach,
  student,
  appLocal,
});

export default (state, action) =>
  rootReducer(action.type === 'LOGOUT' ? undefined : state, action);

// export default rootReducer;
