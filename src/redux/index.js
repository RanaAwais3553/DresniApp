import {createStore, applyMiddleware, combineReducers} from 'redux';
import ReduxThunk from 'redux-thunk';
// import rootReducer from './reducers'
import auth from './reducers/auth';
import setup from './reducers/setup';
import tutor_coach from './reducers/tutor_coach';
const rootReducer = combineReducers({
  auth: auth,
  setup: setup,
  tutorList: tutor_coach,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// export default function configureStore() {
//     return createStore(
//         rootReducer,
//         undefined,
//         applyMiddleware(thunk)
//     )
// }
