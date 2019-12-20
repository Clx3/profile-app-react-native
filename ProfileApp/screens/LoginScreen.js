import React, { Component, useEffect, useState } from 'react';

import { 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';

import {
  Button
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  authorizeAsync,
  getAuthAsync
} from '../auth/Auth';
import { getProfile } from '../api/Api';

export default function LoginScreen(props) {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    componentDidMount();
  },[]);

  /**
   * Components mount function for the effect hook
   */
  async function componentDidMount() {
    const authObj = await getAuthAsync();

    if(authObj)
      redirectUser();
  }

  /**
   * Called when sign in btn is pressed
   */
  async function onLoginBtnPress() {
    if(!isAuthenticating) {
      setIsAuthenticating(true);

      await authorizeAsync(() => {
        redirectUser()
      });
      setIsAuthenticating(false);
    }

  }

  /**
   * Redirects the user to profile screen if it has a profile,
   * otherwise it redirects to register stack
   */ 
  async function redirectUser() {
    const { navigation } = props;

    try {
      await getProfile();
      navigation.navigate('App');
    } catch(error) {
      if(error.response.status) {
        switch(error.response.status) {
          case 404:
            navigation.navigate('Regist');
        }
      } else {
        // TODO: error
      }
    }
  }

  return (
    <View style={styles.container}>
      <LoginButton onPress={() => onLoginBtnPress()} />
    </View>
  );
}

function LoginButton(props) {
  return (
    <Button 
      icon={
        <Icon
          name="google"
          size={25}
          color="white"/>
      }
      iconRight
      titleStyle={styles.loginBtnTitle}
      title="Sign in with Google" 
      onPress={() => props.onPress()}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginBtnTitle: {
    marginRight: 10
  }
});
