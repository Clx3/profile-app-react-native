import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Modal, Text, RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getFriends, deleteFriend } from '../../../api/Api';
import ProfileListItem from '../../../components/ProfileListItem';
import MessageModal from '../../../components/MessageModal';
import IconText from '../../../components/IconText';

/**
 * This screen component renders a list of users friends.
 * User can remove friends and also remove friends from this
 * screen.
 * 
 * @param {*} props 
 */
export default function FriendsScreen(props) {
  const [listData, setListData] = useState([]); // Contains list of users friends
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProfile, setModalProfile] = useState(null);

  useEffect(() => {
    updateListData();
  }, []);

  useEffect(() => {
    if(modalProfile !== null) {
      setModalVisible(true);
    }
  }, [modalProfile]);

  const onListRefresh = React.useCallback(() => {
    setLoading(true);
    updateListData();
  }, [loading]);

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
    } finally {
      setLoading(false);
    }
  }

  function onMsgButtonPress(profile) {
    setModalProfile(profile);
  }

  function onModalClosePress() {
    setModalProfile(null);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      <FlatList 
        contentContainerStyle={{flex: 1}}
        data={listData}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => 
          <ProfileListItem 
            profile={item}
            RightIcon={
              <RightIcons 
                profile={item}
                onMsgButtonPress={() => onMsgButtonPress(item)}
                friendRemoveCallBack={async() => await updateListData()}/>
            }/>}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onListRefresh} />}
        ListEmptyComponent={<EmptyList />}
      />
      <MessageModal 
        visible={modalVisible}
        profile={modalProfile}
        onClosePress={() => onModalClosePress()}/>
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
function RightIcons(props) {
  const { profile, onMsgButtonPress, friendRemoveCallBack } = props;

  /**
   * Called when the remove button is pressed.
   */
  async function onRemoveFriendPressAsync() {
    // TODO: add confirmation
    try {
      const response = await deleteFriend(profile.id);

      alert('Friend removed!');
      friendRemoveCallBack(); // We need to use callback so we can refresh friend list after the friend removal
    } catch(error) {
      alert('Error removing friend! Try again.')
      console.log(error);
    }
  }

  return (
    <View style={styles.rightIconsContainer}>
      <IconText containerStyle={styles.iconContainer} name='comment' size={30} color='#00F3B2' onPress={() => onMsgButtonPress()} />
      <IconText containerStyle={styles.iconContainer} name='minus-circle' size={30} color='#993333' onPress={() => onRemoveFriendPressAsync()} />
    </View>
  );
}

/**
 * This will be rendered if the Friend list data
 * is empty.
 * 
 * @param {*} props 
 */
function EmptyList(props) {
  return (
    <View style={styles.emptyListContainer}>
      <IconText name='frown-o' size={130} text="You don't have any friends. Head to Add friends section." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  },
  emptyListContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
  },
  iconContainer: {
    margin: 8
  }
});