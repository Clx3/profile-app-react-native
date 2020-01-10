import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function CustomInput(props) {

  function renderIcon() {
    if(props.icon) {
      return <Icon name={props.icon} size={27} color='#00F3B2' />
    } else {
      return null;
    }
  }

  return (
    <Input
      placeholder={props.placeholder}
      placeholderTextColor='#00b383'
      inputStyle={{color: '#00e6a8'}}
      label={props.label}
      labelStyle={styles.label}
      rightIcon={renderIcon()}
      {...props}/>
  );
}

CustomInput.defaultProps = {
  label: 'Label',
  placeholder: 'placeholder'
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  },
});