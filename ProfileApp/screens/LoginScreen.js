import React, { Component, useEffect } from 'react';

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

export default LoginScreen = (props) => {

  console.log()

  useEffect(() => {
    componentDidMount(props);
  }, []);

  return (
    <View style={styles.container}>
      <LoginButton />
    </View>
  );
}

async function componentDidMount(props) {
  const authObj = await getAuthAsync();

  if(authObj)
    props.navigation.navigate('App');
}

function LoginButton(props) {

  const onLoginBtnPress = async() => {
    await authorizeAsync(() => {
      props.navigation.navigate('App');
    })
  }

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
      onPress={() => onLoginBtnPress()}/>
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
