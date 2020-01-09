import React, {Component, useState, useEffect} from 'react';
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
import { getIsUsernameValid } from '../../api/Api';
import { RegisterModel } from '../../model/RegisterModel';
import CustomInputNew from '../../components/CustomInputNew';

export default function RegisterUsernameScreen(props) {
  const [username, setUsername] = useState(RegisterModel.username);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidUsername, setIsValidUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  let usernameTimeoutId = null;

  useEffect(() => {
      if(this.usernameTimeoutId) {
        clearInterval(this.usernameTimeoutId);
        this.usernameTimeoutId = null;
      }
      
      this.usernameTimeoutId = setTimeout(() => {
        validateUsername();
      }, 1000);
  }, [username]);

  /**
   * Called when the username input changes
   */
  function onUsernameInputChange(value) {
    setIsLoading(true);
    setIsValidUsername(false);

    RegisterModel.username = value;
    setUsername(RegisterModel.username);
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
          setErrorMsg('This username is already taken. Try another one!')
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
        <ActivityIndicator size="small" color="#00F3B2" />
      );
    } else if(isValidUsername !== null && isValidUsername === true) {
      return (
        <Icon name='check' size={27} color='#00FF00' />
      );
    } else if (isValidUsername !== null && isValidUsername === false) {
      return (
        <Icon name='times' size={27} color='#CC0000' />
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
        placeholder='username'
        placeholderTextColor='#bfbfbf'
        errorMessage={errorMsg}
        value={username}
        onChangeText={(value) => onUsernameInputChange(value)}
        rightIcon={ <LeftIcon/> }
        leftIcon={ <Icon style={{marginRight: 5}} name='user' size={27} color='#00F3B2' /> } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelStyle: {
    color: 'white',
    marginLeft: 5
  },
  inputStyle: {
    color: '#00f3b2'
  }
});