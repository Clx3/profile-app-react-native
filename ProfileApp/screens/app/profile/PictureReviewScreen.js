import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import IconText from '../../../components/IconText';
import { postImage } from '../../../api/Api';
import * as ImageManipulator from 'expo-image-manipulator';

/**
 * This screen component is used to preview the image 
 * before accepting it for the API. This screen handles the profile
 * pictures manipulation and sending for the API.
 * 
 * @param {*} props 
 */
export default function PictureReviewScreen(props) {
  const { navigation } = props;
  const picture = navigation.getParam('picture');

  /**
   * Called when accept button is pressed. Sends the
   * image to the API where it will be stored. After that
   * navigates back to ProfileScreen.
   */
  async function onAcceptBtnPress() {

    // We manipulate the image to reduce its size and make its format into jpg
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      picture.uri,
      [{ resize: { width: 500 } }],
      { format: ImageManipulator.SaveFormat.JPEG }
    );

    try {
      const response = postImage(manipulatedImage.uri);

      navigation.navigate('ProfileScr');
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Image 
        style={styles.image}
        source={{uri: picture.uri}}
        resizeMode='stretch' />
      <View style={styles.buttonsContainer}>
        <IconText 
          name='check' 
          size={60} 
          text='Accept image'
          onPress={async() => await onAcceptBtnPress()}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    flex: 1
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    height: 130,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  }
})