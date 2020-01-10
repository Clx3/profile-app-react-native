import React, { Component, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RegisterModel } from '../../model/RegisterModel';
import { createProfile } from '../../api/Api';
import IconText from '../../components/IconText';

export default function RegisterConfirmationScreen(props) {
  const { navigation } = props;
  const [loading, setLoading] = useState(false);

  async function onRegisterBtnPressAsync() {
    setLoading(true);
    const error = await RegisterModel.getUserNameError();

    if(error !== '') {
      alert(error);
      setLoading(false);
      return;
    }

    try {
      const response = await createProfile(RegisterModel.username, RegisterModel.description);

      navigation.navigate('ProfileScr', { profile: response.data });
    } catch(error) {
      console.log(error);
      setLoading(false);
      alert('Error registering! Try again.')
    }
  }

  return (
    <View style={styles.container}>
      {loading ? 
      <ActivityIndicator 
        size={150} 
        color='#00F3B2'
        animating={true} />
      :
      <IconText 
        name='check-circle-o'
        text='Press here to complete registration'
        textStyle={styles.textStyle}
        onPress={async() => await onRegisterBtnPressAsync()}
        size={200} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#061620'
  },
  textStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF'
  }
});