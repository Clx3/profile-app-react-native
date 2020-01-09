import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, RefreshControl } from 'react-native';
import { getAllProfilesByUsernameSearch } from '../../../api/Api';
import ProfileListItem from '../../../components/ProfileListItem';

export default function HomeScreen(props) {
  const[loading, setLoading] = useState(false);
  const[listData, setListData] = useState([]);

  useEffect(() => {
    updateListData();
  }, []);

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
            profile={item} />
        }/>
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
    color: '#FFFFFF',
    fontSize: 20
  }
});