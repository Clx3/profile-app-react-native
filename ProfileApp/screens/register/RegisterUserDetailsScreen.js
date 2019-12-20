import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';

export default function RegisterUserDetailsScreen(props) {
  return (
    <View style={styles.container}>
      <Input
        label='Description'
        multiline
        lines={5}
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