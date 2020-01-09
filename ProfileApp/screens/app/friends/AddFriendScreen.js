import React, { Component, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { Text, Input, ListItem } from 'react-native-elements';
import CustomInput from '../../../components/CustomInput';
import { getAllProfilesByUsernameSearch, createFriend } from '../../../api/Api';
import ProfilePicture from '../../../components/ProfilePicture';
import IconText from '../../../components/IconText';
import { cutString } from '../../../Util';

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

      console.log(response.data);
    } catch(error) {
      // TODO: handle error 409 conflict (Already a friend)
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
            <FriendItem 
              friend={item}
              onAddFriendBtnPress={async(profile) => await onAddFriendBtnPressAsync(profile)} />
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
 * Renders an item to the friends search result list.
 * Basically a list item.
 * 
 * @param {*} props 
 */
function FriendItem(props) {
  const { friend, onAddFriendBtnPress } = props;

  return (
    <ListItem
      title={friend.username}
      containerStyle={styles.listItemContainer}
      titleStyle={styles.listItemTitle}
      leftIcon={<ProfilePicture profileId={friend.id} size="medium" rounded />}
      rightIcon={<IconText name='plus-circle' text='Add friend' onPress={() => onAddFriendBtnPress(friend)} />}
      subtitle={cutString(friend.description, 40)} 
      subtitleStyle={styles.listItemSubtitle} />
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
  listItemContainer: {
    margin: 5,
    borderRadius: 2,
    backgroundColor: '#0c2c40'
  },
  listItemTitle: {
    color: '#00F3B2',
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 6.27
  },
  listItemSubtitle: {
    color: '#8c8c8c'
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