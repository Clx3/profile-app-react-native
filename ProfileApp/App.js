import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AuthStack = createStackNavigator({ 
  Login: LoginScreen 
});

const RegisterStack = createStackNavigator({
  Register: RegisterScreen
})

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