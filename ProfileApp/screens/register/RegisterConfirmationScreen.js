import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { RegisterModel } from '../../model/RegisterModel';
import { createProfile } from '../../api/Api';

export default function RegisterConfirmationScreen(props) {

  async function onRegisterBtnPressAsync() {
    console.log(RegisterModel.username);
    console.log(RegisterModel.description);

    try {
      const response = await createProfile(RegisterModel.username, RegisterModel.description);

      console.log(response.status)
      console.log(response.data)
    } catch(error) {
      console.log(error.response);
    }
  }

  return (
    <View style={styles.container}>
      <Button 
        raised
        onPress={async() => await onRegisterBtnPressAsync()}
        title="Register" />
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