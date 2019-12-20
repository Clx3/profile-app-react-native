import React, {Component, useState} from 'react';
import { 
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {
  Text,
  Input,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getIsUsernameValid } from '../api/Api';

export default function RegisterScreen(props) {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  let usernameTimeoutId = null;

  /**
   * Called when the username input changes
   */
  function onUsernameInputChange(value) {
    setUsername(value);
    setIsValidUsername(false);
    setIsLoading(true);

    if(this.usernameTimeoutId) {
      clearInterval(this.usernameTimeoutId);
      this.usernameTimeoutId = null;
    }

    this.usernameTimeoutId = setTimeout(async() => {
      await validateUsername();
    }, 1000);
  }

  async function validateUsername() {
    if(username.length < 4) {
      setErrorMsg('Username must be more than 3 characters long!');
      setIsValidUsername(false);
    } else {
      setErrorMsg('');
      try {
        const response = await getIsUsernameValid(username);

        if(response.data === true) {
          setIsValidUsername(true);
        } else {
          setErrorMsg('This username is already taken! Try another one.')
        }
      } catch(error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  }

  function LeftIcon() {
    if(isLoading === true) {
      return (
        <ActivityIndicator size="small" color="#00ff00" />
      );
    } else if(isValidUsername === true) {
      return (
        <Icon name='check' size={30} color='#00FF00' />
      );
    }

    return null;
  }

  return (
    <View style={styles.container}>
      <Input
        label='Please choose an username'
        labelStyle={styles.labelStyle}
        inputStyle={styles.inputStyle}
        placeholder='username...'
        errorMessage={errorMsg}
        value={username}
        onChangeText={(value) => onUsernameInputChange(value)}
        rightIcon={ <LeftIcon/> }
        leftIcon={ <Icon name='user' size={30} color='#4EDCFF' /> } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelStyle: {
    color: 'white',
    marginLeft: 5
  },
  inputStyle: {
    color: 'white'
  }
});