import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList} from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFriends, deleteFriend } from '../../../api/Api';

export default function FriendsScreen(props) {
  const [listData, setListData] = useState([{id: '1', username: 'Mikko'}]); // Contains list of users friends

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

      const formattedData = response.data.map((item) => ({
        id: `${item.id}`,
        username: item.username
      }));

      setListData(formattedData);
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
          <FriendItem 
            friend={item}
            friendRemoveCallback={async() => await updateListData()} />
        }/>
    </View>
  );
}

function FriendItem(props) {
  const { friend, friendRemoveCallback } = props;

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
      const response = await deleteFriend(friend.id);

      alert('deleted!');
      friendRemoveCallback(); // We need to use callback so we can refresh friend list after the friend removal
    } catch(error) {
      console.log(error);
    }
  }

  function RightIcons() {
    return (
      <View style={styles.rightIconsContainer}>
        <Icon name='comment' size={27} color='#00F3B2' onPress={() => onSendMsgPress()} />
        <Icon name='minus-circle' size={27} color='#993333' onPress={() => onRemoveFriendPressAsync()} />
      </View>
    );
  }

  return (
    <ListItem
      title={friend.username}
      leftIcon={<Icon name={'address-card'} size={27} color='#00F3B2' />}
      rightIcon={<RightIcons />}
      subtitle={'hehe'}
      bottomDivider />
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