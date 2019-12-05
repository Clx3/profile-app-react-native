import React, { Component, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {authorizeAsync, getAuthAsync} from '../auth/Auth';

export default LoginScreen = (props) => {

  console.log()

  useEffect(() => {
    componentDidMount(props);
  }, []);

  const onLoginPress = async() => {
    await authorizeAsync();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>LOGIN</Text>
      <Button title="Login with Google account" onPress={async() => await onLoginPress()}/>
    </View>
  );
}

const componentDidMount = async({ navigation }) => {
  const authObj = await getAuthAsync();

  if(authObj)
    navigation.navigate('App');
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
