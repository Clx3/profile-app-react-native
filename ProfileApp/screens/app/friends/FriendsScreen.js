import React, { Component, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../../components/CustomInput';
import { getAllProfilesByUsernameSearch } from '../../../api/Api';

export default function FriendsScreen(props) {
  const [newFriendText, setNewFriendText] = useState('');

  return (
    <View style={styles.container}>
      <FriendSearch 
        value={newFriendText}
        onChangeText={(value) => setNewFriendText(value)}
      />
      <Text style={styles.header}>Your friends</Text>
    </View>
  );
}

function FriendSearch(props) {

  let usernameTimeoutId = null;

  async function onChangeTextAsync(value) {
    props.onChangeText(value);

    try {
      const response = await getAllProfilesByUsernameSearch(value);

      console.log(response.data)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <CustomInput
      placeholder='Type a profile name...'
      label='Search for friends'
      icon='search'
      value={props.value}
      onChangeText={async(value) => await onChangeTextAsync(value)}/>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
    alignItems: 'center'
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  }
});