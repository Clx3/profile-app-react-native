import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Text } from 'react-native-elements';
import { RegisterModel } from '../../model/RegisterModel';

export default function RegisterUserDetailsScreen(props) {
  const [description, setDescription] = useState(RegisterModel.description);

  /**
   * Called when the description input changes.
   * 
   * @param {*} value 
   */
  function onDescriptionInputChange(value) {
    RegisterModel.description = value;
    setDescription(RegisterModel.description);
  }

  return (
    <View style={styles.container}>
      <View style={styles.descriptionContainer}>
        <View style={styles.descriptionHeaderContainer}>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={styles.label}>Give a little description about yourself</Text>
          </View>
        </View>
        <View style={styles.descriptionTextContainer}>
          <Input 
            style={styles.descriptionText} 
            value={description}
            inputStyle={styles.descriptionText}
            placeholder='Type something...'
            placeholderTextColor='#00b383'
            maxLength={499}
            multiline
            onChangeText={(value) => onDescriptionInputChange(value)}
            inputContainerStyle={{ borderBottomWidth: 0 }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
    justifyContent: 'center'
  },
  descriptionContainer: {
    flex: 0.3,
    margin: 10
  },
  descriptionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 3
  },
  descriptionTextContainer: {
    flex: 1,
    bottom: 0,
    backgroundColor: '#081e2b'
  },
  descriptionText: {
    fontSize: 12,
    color: '#00e6a8'
  }
});