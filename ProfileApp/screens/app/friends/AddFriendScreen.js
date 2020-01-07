import React, { Component, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Input, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomInput from '../../../components/CustomInput';
import { getAllProfilesByUsernameSearch, createFriend } from '../../../api/Api';

export default function AddFriendScreen(props) {
  const [newFriendText, setNewFriendText] = useState('');
  const [listData, setListData] = useState([]); // Results of the friend search

  /**
   * Callback for FriendSearch component for when the response
   * is received from the API.
   * 
   * @param {*} data 
   */
  function afterFriendSearchResponse(data) {
    setListData(data);
  }

  async function onAddFriendBtnPressAsync(profile) {
    try {
      const response = await createFriend(profile.id);

      console.log(response.data);
    } catch(error) {
      // TODO: handle error 409 conflict (Already a friend)
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FriendSearch 
        value={newFriendText}
        onChangeText={(value) => setNewFriendText(value)}
        afterResponse={(data) => afterFriendSearchResponse(data)}
      />
      <Text style={styles.header}>Results</Text>
      <FlatList 
        data={listData}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => 
          <FriendItem 
            profile={item}
            onAddFriendBtnPress={async(profile) => await onAddFriendBtnPressAsync(profile)} />
        }
      />
    </View>
  );
}

/**
 * Renders the friend search input.
 * 
 * @param {*} props 
 */
function FriendSearch(props) {

  let usernameTimeoutId = null;

  async function onChangeTextAsync(value) {
    props.onChangeText(value);

    try {
      const response = await getAllProfilesByUsernameSearch(value);

      props.afterResponse(response.data);
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

/**
 * Renders an item to the friends search result list.
 * Basically a list item.
 * 
 * @param {*} props 
 */
function FriendItem(props) {
  const { profile, onAddFriendBtnPress } = props;

  return (
    <ListItem
      title={profile.username}
      leftIcon={<Icon name={'address-card'} size={27} color='#00F3B2' />}
      rightIcon={<Icon name='plus-circle' size={27} color='#00F3B2' onPress={() => onAddFriendBtnPress(profile)} />}
      subtitle={'hehe'}
      bottomDivider />
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
    //alignItems: 'center'
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  }
});