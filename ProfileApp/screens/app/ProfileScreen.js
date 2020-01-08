import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';


export default function ProfileScreen(props) {
  const { navigation } = props;
  const profile = navigation.getParam('profile');

  return (
    <View style={styles.container}>
      <ProfilePicture
        containerStyle={styles.avatarContainer}
        size="xlarge"
        rounded />
      <Text h4 style={styles.profileText}>{profile.username}</Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Description</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
    alignItems: 'center'
  },
  avatarContainer: {
    marginTop: 25,
    marginBottom: 15
  },
  profileText: {
    color: '#00F3B2'
  },
  descriptionContainer: {
    margin: 10
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 3
  },
  textContainer: {
    backgroundColor: '#5C5C5C',
    borderRadius: 2,
    padding: 5,
    opacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  text: {
    color:'white'
  }
})