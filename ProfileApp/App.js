import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/app/ProfileScreen';
import CameraScreen from './screens/app/profile/CameraScreen';
import RegisterUsernameScreen from './screens/register/RegisterUsernameSceen';
import RegisterUserDetailsScreen from './screens/register/RegisterUserDetailsScreen';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import RegisterConfirmationScreen from './screens/register/RegisterConfirmationScreen';
import { createDrawerNavigator } from 'react-navigation-drawer';
import AddFriendScreen from './screens/app/friends/AddFriendScreen';
import FriendsScreen from './screens/app/friends/FriendsScreen';
import HomeScreen from './screens/home/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import PictureReviewScreen from './screens/app/profile/PictureReviewScreen';

const defaultNavigationOptions = (navigation, title) => {
  return {
    title: title,
    headerStyle: {
      backgroundColor: '#061620'
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 23,
    },
    headerLeftContainerStyle: {
      marginLeft: 10
    },
    headerLeft: (
      <Icon 
        name='align-justify' 
        raised
        size={27} 
        color='white' 
        onPress={() => navigation.openDrawer()}/>
    ),
    headerRight: (
      <Image 
        resizeMode='contain'
        source={require('./assets/logo_small.png')} 
        style={{width: 60, height: 60}} />
    )
  };
}

const defaultBottomTabNavigationOptions = () => {
  return {
    keyboardHidesTabBar: true,
    activeTintColor: '#00f3b2',
    inactiveTintColor: '#009970',
    inactiveBackgroundColor: '#061620',
    activeBackgroundColor: '#0c2c40'
  }
}

const tapBarIcon = (icon, tintColor) => {
  return (
    <Icon name={icon} size={27} color={tintColor}/>
  );
}

const AuthStack = createStackNavigator({ 
  Login: LoginScreen 
});

const RegisterStack = createBottomTabNavigator(
  {
    Username: {
      screen: RegisterUsernameScreen,
      navigationOptions: {
        title: 'Username',
        tabBarIcon: ({focused, tintColor}) => tapBarIcon('user', tintColor)
      }
    },
    UserDetails: {
      screen: RegisterUserDetailsScreen,
      navigationOptions: {
        title: 'Details',
        tabBarIcon: ({focused, tintColor}) => tapBarIcon('address-card', tintColor)
      }
    },
    Confirmation: {
      screen: RegisterConfirmationScreen,
      navigationOptions: {
        title: 'Confirm',
        tabBarIcon: ({focused, tintColor}) => tapBarIcon('check', tintColor)
      }
    }
  },
  {
    initialRouteName: 'Username',
    tabBarOptions: defaultBottomTabNavigationOptions()
  }
);

const FriendsTabs = createBottomTabNavigator(
  {
    Friends: {
      screen: FriendsScreen,
      navigationOptions: {
        title: 'My Friends',
        tabBarIcon: ({focused, tintColor}) => tapBarIcon('users', tintColor)
      }
    },
    AddFriend: {
      screen: AddFriendScreen,
      navigationOptions: {
        title: 'Add Friends',
        tabBarIcon: ({focused, tintColor}) => tapBarIcon('address-book', tintColor)
      }
    }
  },
  {
    initialRouteName: 'Friends',
    tabBarOptions: defaultBottomTabNavigationOptions()
  }
);

const HomeStack = createStackNavigator({
  HomeScr: {
    screen: HomeScreen,
    navigationOptions: ({navigation}) => (defaultNavigationOptions(navigation, 'Home'))
  }
});

const ProfileStack = createStackNavigator({
  ProfileScr: {
    screen: ProfileScreen,
    navigationOptions: ({navigation}) => (defaultNavigationOptions(navigation, 'Profile'))
  },
  CameraScr: {
    screen: CameraScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#061620'
      },
      headerTintColor: '#FFFFFF'
    })
  },
  PictureReviewScr: {
    screen: PictureReviewScreen,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#061620'
      },
      headerTintColor: '#FFFFFF'
    })
  }
});

const FriendsStack = createStackNavigator({
  FriendsScr: {
    screen: FriendsTabs,
    navigationOptions: ({navigation}) => (defaultNavigationOptions(navigation, 'Friends'))
  }
})

const AppDrawerStack = createDrawerNavigator(
  {
    Home: HomeStack,
    Profile: ProfileStack,
    Friends: FriendsStack
  },
  {
    drawerPosition: 'left'
  }
);

/**
 * 'Main' App navigation. Contains a single DrawerNavigation which contains
 * nested StackNavigators. Reasoning for this is that we need to nest our screens
 * inside StackNavigators so we can include the header bar and modify them invidually
 * inside our screens.
 */
const AppStack = createStackNavigator(
  { 
    AppDrawer: AppDrawerStack
  },
  {
    headerMode: 'none'
  }
);

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