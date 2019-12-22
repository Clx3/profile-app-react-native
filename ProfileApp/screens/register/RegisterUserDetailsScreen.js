import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { RegisterModel } from '../../model/RegisterModel';

export default function RegisterUserDetailsScreen(props) {
  const [description, setDescription] = useState(RegisterModel.description);

  // Called when the description input changes
  function onDescriptionInputChange(value) {
    RegisterModel.description = value;
    setDescription(RegisterModel.description);
  }

  return (
    <View style={styles.container}>
      <Input
        label='Description'
        multiline
        lines={5}
        value={RegisterModel.description}
        onChangeText={(value) => onDescriptionInputChange(value)}
        labelStyle={styles.labelStyle}
        inputStyle={styles.inputStyle}
        placeholder='Please give a little description about yourself...' />
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