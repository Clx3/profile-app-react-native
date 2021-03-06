import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Image, SocialIcon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { authorizeAsync, getAuthAsync } from '../auth/Auth';
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
    console.log(authObj)

    if(authObj)
      await redirectUser();
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
      const response = await getProfile();

      navigation.navigate('ProfileScr', { profile: response.data });
    } catch(error) {
      console.log(error)
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
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/logo.png')}
          style={{width: 300, height: 300}}
        />
      </View>
      <View style={styles.loginBtnContainer}>
        <Text style={styles.welcomeText}>Welcome! Please use one of the providers below to sign in.</Text>
        <SocialIcon
          title='Sign In With Google'
          button
          type='google'
          onPress={async() => await onLoginBtnPress()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#061620',
    alignItems: 'center'
  },
  logoStyle: {
    width: 300,
    height: 300,
    resizeMode: 'contain'
  },
  welcomeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 10
  },
  loginBtnContainer: {
    flex: 2,   
    justifyContent: 'center',
    paddingBottom: 50
  }
});
