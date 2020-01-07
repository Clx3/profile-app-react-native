import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/app/ProfileScreen';
import RegisterUsernameScreen from './screens/register/RegisterUsernameSceen';
import RegisterUserDetailsScreen from './screens/register/RegisterUserDetailsScreen';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import RegisterConfirmationScreen from './screens/register/RegisterConfirmationScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AddFriendScreen from './screens/app/friends/AddFriendScreen';
import FriendsScreen from './screens/app/friends/FriendsScreen';

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

const FriendsTabs = createMaterialTopTabNavigator(
  {
    Friends: FriendsScreen,
    AddFriend: AddFriendScreen
  },
  {
    initialRouteName: 'Friends',
    tabBarPosition: 'bottom'
  }
);

const AppDrawerStack = createDrawerNavigator(
  {
    Profile: ProfileScreen,
    Friends: FriendsTabs
  },
  {
    drawerPosition: 'left'
  }
);

const AppStack = createStackNavigator({ 
  AppDrawer: AppDrawerStack
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