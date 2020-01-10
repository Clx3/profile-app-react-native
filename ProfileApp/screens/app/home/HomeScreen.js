import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native';
import { getAllProfilesByUsernameSearch } from '../../../api/Api';
import ProfileListItem from '../../../components/ProfileListItem';
import ProfileModal from '../../../components/ProfileModal';

export default function HomeScreen(props) {
  const[loading, setLoading] = useState(false);
  const[listData, setListData] = useState([]);
  const[modalVisible, setModalVisible] = useState(false);
  const[modalData, setModalData] = useState(null);

  useEffect(() => {
    updateListData();
  }, []);

  useEffect(() => {
    if(modalData !== null) {
      setModalVisible(true);
    }
  }, [modalData]);

  function onModalClose() {
    setModalData(null);
    setModalVisible(false);
  }

  const onListRefresh = React.useCallback(() => {
    setLoading(true);
    updateListData();
  }, [loading]);

  async function updateListData() {
    try {
      const response = await getAllProfilesByUsernameSearch('');

      setListData(response.data);
    } catch(error) {
      console.log(error);
      alert('Error while loading profiles! Try again.')
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>All profiles</Text>
      <FlatList 
        data={listData}
        keyExtractor={item => `${item.id}`}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={onListRefresh} />}
        renderItem={({item}) => 
          <ProfileListItem 
            profile={item}
            onListItemPress={() => setModalData(item)} />
        }/>
      <ProfileModal
        visible={modalVisible}
        profile={modalData}
        onClosePress={() => onModalClose(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  },
  headerText: {
    alignSelf: 'center',
    color: '#00F3B2',
    fontSize: 20,
    fontWeight: 'bold'
  }
});