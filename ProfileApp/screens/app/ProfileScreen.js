import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import IconText from '../../components/IconText';
import { Permissions } from 'react-native-unimodules';


export default function ProfileScreen(props) {
  const { navigation } = props;
  const profile = navigation.getParam('profile');

  return (
    <View style={styles.container}>
      <Text h4 style={styles.profileText}>{profile.username}</Text>
      <ProfilePictureEditor
        navigation={navigation}/>
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Description</Text>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.Liirum laarum lopsum lapsum lipsum.</Text>
        </View>
      </View>
    </View>
  );
}

/**
 * This component renders the profile picture and
 * its edit buttons.
 * 
 * @param {*} props 
 */
function ProfilePictureEditor(props) {
  const { navigation } = props;

  async function onCameraBtnPressAsync() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    if(status === 'granted') {
      navigation.navigate('CameraScr');
    } else {
      //TODO: handle this
    }
  }

  return (
    <View style={styles.profilePictureEditorContainer}>
      <ProfilePicture
        containerStyle={styles.avatarContainer}
        size="xlarge"
        rounded />
      <View style={styles.photoIconsContainer}>
        <IconText 
          containerStyle={{marginRight: 10}} 
          name='camera' 
          text={'Take photo'} 
          onPress={async() => await onCameraBtnPressAsync()}/>
        <IconText 
          containerStyle={{marginLeft: 10}} 
          name='image' 
          text={'Select photo'}
          onPress={() => alert('TODO')} />
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
  profilePictureEditorContainer: {
    marginTop: 25,
    marginBottom: 15
  },
  photoIconsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15
  },
  profileText: {
    marginTop: 15,
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