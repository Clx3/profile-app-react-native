import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, ButtonGroup, Text } from 'react-native-elements';
import { RegisterModel } from '../../model/RegisterModel';
import CustomInputNew from '../../components/CustomInputNew';

export default function RegisterUserDetailsScreen(props) {
  const [description, setDescription] = useState(RegisterModel.description);

  // Called when the description input changes
  function onDescriptionInputChange(value) {
    RegisterModel.description = value;
    setDescription(RegisterModel.description);
  }

  return (
    <View style={styles.container}>
      <CustomInputNew 
        icon='user'
        label='Tell a little about yourself'
        placeholder='...'
        multiline
        numberOfLines={3}
        onChangeText={(value) => onDescriptionInputChange(value)} />
    </View>
  );
}

/**
 * TODO: Implement my functionality
 * @param {*} props 
 */
function GenderPicker(props) {
  const buttons = ['Male', 'Female', 'Other'];
 
  return (
    <View style={styles.genderPickerContainer}>
      <Text>VITTU</Text>
      <ButtonGroup
        onPress={() => null}
        selectedIndex={1}
        buttons={buttons}
         />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#061620',
  },
  genderPickerContainer: {
    width: '100%'
  }
});