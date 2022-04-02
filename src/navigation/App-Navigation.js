import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

// Tutor
import TCProfiles from '../views/Tutors-Coaches/tutors-profiles';
import TCProfile from '../views/Tutors-Coaches/tutor-profile';
import TutorSearch from '../views/Tutors-Coaches/tutor-search';

// Student
import StudentProfile from '../views/Student/profile/student-profile';
import StudentBookingHistory from '../views/Student/profile/student-booking-history';
import SelectSubjects from '../views/Student/booking/select-subjects';
import SelectSession from '../views/Student/booking/select-session';
import BookingDate from '../views/Student/booking/booking-date';
import BookingOrderReview from '../views/Student/booking/booking-order-review';
import PaymentMethod from '../views/Student/booking/payment-method';
import PaymentDetails from '../views/Student/booking/payment-details';
import BookingConfirmation from '../views/Student/booking/booking-confirmation';
import TutorDrawer from '../views/Tutors-Coaches/tutor-drawer';
import MyProfile from '../views/Tutors-Coaches/profile/my-profile';
import EditProfile1 from '../views/Tutors-Coaches/profile/edit-profile1';
import EditProfile2 from '../views/Tutors-Coaches/profile/edit-profile2';
import EditProfile3 from '../views/Tutors-Coaches/profile/edit-profile3';
import EditProfile4 from '../views/Tutors-Coaches/profile/edit-profile4';
import BankDetails from '../views/Tutors-Coaches/profile/bank-details';
import AddSchedule from '../views/Tutors-Coaches/profile/add-schedule';
import ViewSchedule from '../views/Tutors-Coaches/profile/view-schedule';
import ViewMyCalendar from '../views/Tutors-Coaches/profile/view-calendar';
import Subjects from '../views/Tutors-Coaches/profile/subjects';
import TapPayment from '../views/Student/booking/tap-payment';
import Paypal from '../views/Student/booking/paypal';
import DrawerScreen from '../views/Student/student-drawer';
const Stack = createStackNavigator();

export default function AppNavigation() {
  const {userRole} = useSelector(state => state.auth);
  console.log('user Profile data is:!...', userRole);
  return (
    <Stack.Navigator headerMode="none">
      {userRole == 'student' ? (
        <Stack.Screen name="StudentSignin" component={Student} />
      ) : (
        <Stack.Screen name="TutorSignin" component={Tutor} />
      )}
    </Stack.Navigator>
  );
}

function Tutor() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="TutorDrawer" component={TutorDrawer} />
      <Stack.Screen name="EditProfile1" component={EditProfile1} />
      <Stack.Screen name="EditProfile2" component={EditProfile2} />
      <Stack.Screen name="EditProfile3" component={EditProfile3} />
      <Stack.Screen name="EditProfile4" component={EditProfile4} />
      <Stack.Screen name="BankDetails" component={BankDetails} />
      <Stack.Screen name="AddSchedule" component={AddSchedule} />
      <Stack.Screen name="ViewSchedule" component={ViewSchedule} />
      <Stack.Screen name="ViewMyCalendar" component={ViewMyCalendar} />
      <Stack.Screen name="Subjects" component={Subjects} />
    </Stack.Navigator>
  );
}

function Student() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="TCProfiles" component={TCProfiles} />
      <Stack.Screen name="TCProfile" component={TCProfile} />
      <Stack.Screen name="TutorSearch" component={TutorSearch} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="StudentProfile" component={StudentProfile} />
      <Stack.Screen
        name="StudentBookingHistory"
        component={StudentBookingHistory}
      />
      <Stack.Screen name="SelectSubjects" component={SelectSubjects} />
      <Stack.Screen name="SelectSession" component={SelectSession} />
      <Stack.Screen name="BookingDate" component={BookingDate} />
      <Stack.Screen name="BookingOrderReview" component={BookingOrderReview} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="PaymentDetails" component={PaymentDetails} />
      <Stack.Screen
        name="BookingConfirmation"
        component={BookingConfirmation}
      />
      <Stack.Screen name="TutorDrawer" component={DrawerScreen} />
      <Stack.Screen name="TapPayment" component={TapPayment} />
      <Stack.Screen name="Paypal" component={Paypal} />
    </Stack.Navigator>
  );
}
