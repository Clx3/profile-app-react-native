import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterUsernameScreen from './screens/register/RegisterUsernameSceen';
import RegisterUserDetailsScreen from './screens/register/RegisterUserDetailsScreen';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import RegisterConfirmationScreen from './screens/register/RegisterConfirmationScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({ 
  Login: LoginScreen 
});

const RegisterStack = createMaterialTopTabNavigator(
  {
    Username: RegisterUsernameScreen,
    UserDetails: RegisterUserDetailsScreen,
    Confirmation: RegisterConfirmationScreen
  },
  {
    initialRouteName: 'Username'
  }
);

const AppStack = createStackNavigator({
  Profile: ProfileScreen
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      Regist: RegisterStack,
      App: AppStack
    },
    {
      initialRouteName: 'Auth',
    }
  )
);