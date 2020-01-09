import React, {Component, useState, useRef, useEffect} from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Text, Input } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import IconText from '../../components/IconText';
import { Permissions } from 'react-native-unimodules';
import { putProfile } from '../../api/Api';

/**
 * This screen renders the users profile screen. From
 * here the user can edit its profile information and picture.
 * 
 * @param {*} props 
 */
export default function ProfileScreen(props) {
  const { navigation } = props;

  const [profile, setProfile] = useState(navigation.getParam('profile', {id: 0, username: '', description: ''}));

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <Text h4 style={styles.profileText}>{profile.username}</Text>
          <ProfilePictureEditor
            navigation={navigation}/>
          <DescriptionEditor 
            profile={profile} />
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
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

/**
 * This component renders the description editor
 * of the profile. Also contains the API functionality
 * to actually save the changes.
 * 
 * @param {*} props 
 */
function DescriptionEditor(props) {
  const { profile } = props;

  const [description, setDescription] = useState(profile.description);
  const [inputDisabled, setInputDisabled] = useState(true);

  const inputRef = useRef(null);

  // Callback for when the inputDisabled is changed. If not disabled we focus the input.
  useEffect(() => {
    if(inputDisabled == false)
      inputRef.current.focus();
  }, [inputDisabled]);

  async function onSaveBtnPressAsync() {
    setInputDisabled(!inputDisabled);

    let newProfile = {...profile};
    profile.description = description;

    try {
      const response = await putProfile(newProfile);

      //TODO: success notification
    } catch(error) {
      console.log(error);
    }
  }

  function RenderRightIcon() {
    if(inputDisabled === true) {
      return (
        <IconText
          name='pencil-square-o'
          size={40}
          textPosition='top'
          text='Edit'
          onPress={() => setInputDisabled(!inputDisabled)} />
      );
    } else {
      return (
        <IconText
          name='check'
          size={40}
          textPosition='top'
          text='Save'
          onPress={async() => await onSaveBtnPressAsync()} />
      );
    }
  }

  return (
    <View style={styles.descriptionContainer}>
      <View style={styles.descriptionHeaderContainer}>
        <View style={{justifyContent: 'flex-end'}}>
          <Text style={styles.label}>Description</Text>
        </View>
        <RenderRightIcon/>
      </View>
      <View style={styles.descriptionTextContainer}>
        <Input 
          ref={inputRef}
          style={styles.descriptionText} 
          value={description}
          disabled={inputDisabled}
          inputStyle={styles.descriptionText}
          multiline
          onChangeText={(value) => setDescription(value)}
          inputContainerStyle={{ borderBottomWidth: 0 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  },
  profilePictureEditorContainer: {
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 15
  },
  photoIconsContainer: {
    flexDirection: 'row',
    marginTop: 15
  },
  profileText: {
    marginTop: 15,
    color: '#00F3B2',
    alignSelf: 'center'
  },
  descriptionContainer: {
    flex: 1,
    margin: 10
  },
  descriptionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    //alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 3
  },
  descriptionTextContainer: {
    flex: 1,
    bottom: 0,
    backgroundColor: '#081e2b'
  },
  descriptionText: {
    fontSize: 12,
    color: '#00e6a8'
  }
})