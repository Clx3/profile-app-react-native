import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { RegisterModel } from '../../model/RegisterModel';

export default function RegisterConfirmationScreen(props) {

  async function onRegisterBtnPressAsync() {
    console.log(RegisterModel.username);
    console.log(RegisterModel.description);
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