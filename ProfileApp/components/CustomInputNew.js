import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CustomInputNew(props) {

  function renderIcon() {
    if(props.icon) {
      return <Icon name={props.icon} size={27} color='#00F3B2' />
    } else {
      return null;
    }
  }

  return (
    <Input
      label={props.label}
      labelStyle={styles.label}
      placeholder={props.placeholder}
      placeholderTextColor='#bfbfbf'
      inputStyle={styles.inputStyle}
      rightIcon={renderIcon()}
      {...props}/>
  );
}

CustomInputNew.defaultProps = {
  label: '',
  placeholder: '',
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  },
  inputStyle: {
    color: '#00f3b2'
  }
});