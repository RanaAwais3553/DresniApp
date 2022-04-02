import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../views/login';
import EnterOTP from '../views/OTP/enter-otp';
import EnterMobileNumber from '../views/OTP/enter-mobile-number';
import SelectProfile from '../views/select-profile';

// Student
import StudentRegStep1 from '../views/Student/registration/step1';
import StudentRegSuccess from '../views/Student/registration/reg-success';

// Tutors
import TutorRegStep1 from '../views/Tutors-Coaches/registration/step1';
import TutorRegStep2 from '../views/Tutors-Coaches/registration/step2';
import TutorRegStep3 from '../views/Tutors-Coaches/registration/step3';
import TutorRegStep4 from '../views/Tutors-Coaches/registration/step4';
import TutorRegStep5 from '../views/Tutors-Coaches/registration/step5';
import TutorSearch from '../views/Tutors-Coaches/tutor-search';

// Walkthrough screens
import Walkthrough1 from '../views/Walkthrough/wk1';
import Walkthrough2 from '../views/Walkthrough/wk2';
import Walkthrough3 from '../views/Walkthrough/wk3';
import SelectLocation from '../views/select-location';

const Stack = createStackNavigator();

export default function AuthNavigation() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Tutor" component={Tutor} />
      <Stack.Screen name="Student" component={Student} />
      <Stack.Screen name="EnterMobileNumber" component={EnterMobileNumber} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="SelectProfile" component={SelectProfile} />
    </Stack.Navigator>
  );
}

function Tutor() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TutorRegStep1" component={TutorRegStep1} />
      <Stack.Screen name="TutorRegStep2" component={TutorRegStep2} />
      <Stack.Screen name="TutorRegStep3" component={TutorRegStep3} />
      <Stack.Screen name="TutorRegStep4" component={TutorRegStep4} />
      <Stack.Screen name="TutorRegStep5" component={TutorRegStep5} />
      <Stack.Screen name="TutorSearch" component={TutorSearch} />
    </Stack.Navigator>
  );
}

function Student() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="StudentRegStep1" component={StudentRegStep1} />
      <Stack.Screen name="StudentRegSuccess" component={StudentRegSuccess} />
    </Stack.Navigator>
  );
}

export function Walkthrough() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Walkthrough1" component={Walkthrough1} />
      <Stack.Screen name="Walkthrough2" component={Walkthrough2} />
      <Stack.Screen name="Walkthrough3" component={Walkthrough3} />
      {/* <Stack.Screen name="SelectLocation" component={SelectLocation} /> */}
    </Stack.Navigator>
  );
}
