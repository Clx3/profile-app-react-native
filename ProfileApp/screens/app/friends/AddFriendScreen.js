import React, { Component, useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { Text, Input } from 'react-native-elements';
import CustomInput from '../../../components/CustomInput';
import { getAllProfilesByUsernameSearch, createFriend } from '../../../api/Api';
import IconText from '../../../components/IconText';
import ProfileListItem from '../../../components/ProfileListItem';

/**
 * This screen component renders a screen where user is
 * able to search for profiles from the API and add found
 * profiles as friends if wanted.
 * 
 * @param {*} props 
 */
export default function AddFriendScreen(props) {
  const [newFriendText, setNewFriendText] = useState('');
  const [listData, setListData] = useState([]); // Results of the friend search

  /**
   * Called when friend search input changes. Performs
   * Profile fetching from the API with the given input value.
   * @param {*} value 
   */
  async function onFriendSearchChangeAsync(value) {
    setNewFriendText(value);

    if(value === '') {
      setListData([]);
      return;
    }

    try {
      const response = await getAllProfilesByUsernameSearch(value);

      afterFriendSearchResponse(response.data);
    } catch(error) {
      console.log(error)
    }
  }

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

      alert('Friend added!');
    } catch(error) {
      alert('Error adding friend, maybe you are already friends! Try again.');
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FriendSearch 
          value={newFriendText}
          onChangeText={async(value) => await onFriendSearchChangeAsync(value)} />
      </View>
      <Text style={styles.header}>Results</Text>
      <KeyboardAvoidingView behavior='height' style={styles.resultContainer}>
        <FlatList
          contentContainerStyle={{flex: 1}}
          data={listData}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => 
            <ProfileListItem 
              profile={item} 
              RightIcon={<IconText name='plus-circle' text='Add friend' onPress={async() => await onAddFriendBtnPressAsync(item)} />}/>
          }
          ListEmptyComponent={<EmptyList/>} />
        </KeyboardAvoidingView>
    </View>
  );
}

/**
 * Renders the friend search input.
 * 
 * @param {*} props 
 */
function FriendSearch(props) {
  const { onChangeText } = props;

  return (
    <CustomInput
      placeholder='Type a profile name...'
      label='Search for friends'
      icon='search'
      value={props.value}
      onChangeText={(value) => onChangeText(value)}/>
  );
}

/**
 * This will be rendered if the Friend Search list data
 * is empty.
 * 
 * @param {*} props 
 */
function EmptyList(props) {
  return (
    <View style={styles.emptyListContainer}>
      <IconText name='frown-o' size={130} text='No profiles found. Please try to use different search terms.' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  },
  searchContainer: {
    paddingTop: 20,
    paddingBottom: 20
  },
  resultContainer: {
    flex: 1,
    margin: 7,
    borderRadius: 3,
    backgroundColor: '#081e2b',
  },
  emptyListContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  }
});