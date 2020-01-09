import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFriends, deleteFriend } from '../../../api/Api';
import ProfileListItem from '../../../components/ProfileListItem';

/**
 * This screen component renders a list of users friends.
 * User can remove friends and also remove friends from this
 * screen.
 * 
 * @param {*} props 
 */
export default function FriendsScreen(props) {
  const [listData, setListData] = useState([]); // Contains list of users friends

  useEffect(() => {
    updateListData();
  }, []);

  /**
   * Fetches users friends from the API and sets the
   * response data into the listData.
   */
  async function updateListData() {
    try {
      const response = await getFriends();

      setListData(response.data);
    } catch(response) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={listData}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => 
          <ProfileListItem 
            profile={item}
            RightIcon={<RightIcon profile={item} friendRemoveCallBack={async() => await updateListData()} />} />
        }/>
    </View>
  );
}

/**
 * Renders the message and remove icons to the
 * right of the ProfileListItem. Also contains the functionality
 * of the buttons.
 * 
 * @param {*} props 
 */
function RightIcon(props) {
  const { profile, friendRemoveCallBack } = props;

  /**
   * Called when the message icon is pressed.
   */
  function onSendMsgPress() {
    alert('todo!');
  }

  /**
   * Called when the remove button is pressed.
   */
  async function onRemoveFriendPressAsync() {
    // TODO: add confirmation
    try {
      const response = await deleteFriend(profile.id);

      alert('deleted!');
      friendRemoveCallBack(); // We need to use callback so we can refresh friend list after the friend removal
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.rightIconsContainer}>
      <Icon name='comment' size={27} color='#00F3B2' onPress={() => onSendMsgPress()} />
      <Icon name='minus-circle' size={27} color='#993333' onPress={() => onRemoveFriendPressAsync()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  },
  header: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 17,
    paddingBottom: 3
  },
  rightIconsContainer: {
    flexDirection: 'row'
  }
});