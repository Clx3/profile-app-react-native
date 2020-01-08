import React, { Component, useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Camera } from 'expo-camera';
import IconText from '../../../components/IconText';

/**
 * This screen component renders the devices camera. User
 * can toggle front/back camera and camera flash also.
 * 
 * @param {*} props 
 */
export default function CameraScreen(props) {
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [takingPicture, setTakingPicture] = useState(false);

  let camera = null; // Reference to the camera obj

  // Callback for when takingPicture state changes.
  useEffect(() => {
    if(takingPicture) {
      takePictureAsync();
    }
  }, [takingPicture]);

  /**
   * Called when take picture btn is pressed.
   */
  function onTakePicturePress() {
    if(camera) {
      setTakingPicture(true);
    }
  }

  /**
   * The actual function that takes the picture and navigates to PictureReviewScreen.
   * Reasoning that this is implemented this way is that there might be a delay when taking the photo,
   * so we want to wait for the photo to be taken before we can try to spam the button.
   */
  async function takePictureAsync() {
    const { navigation } = props;

    const photo = await camera.takePictureAsync();
    setTakingPicture(false);
    navigation.navigate('PictureReviewScr', { picture: photo });
  }

  /**
   * Called when flip button is pressed, switches to front/back camera.
   */
  function onFlipBtnPress() {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  }

  /**
   * Called when flash toggle button is pressed, switches flash off/on.
   */
  function onToggleFlashBtnPress() {
    if(flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  }

  return (
    <View style={styles.container}>
      <Camera 
        ref={ref => camera = ref}
        style={styles.cameraStyle}
        type={cameraType}
        flashMode={flashMode}>
        <View style={styles.cameraViewContainer}>
          <View style={styles.buttonContainer}>
            <IconText 
              name='bolt' 
              size={50} 
              text={`Toggle flash ${flashMode === Camera.Constants.FlashMode.off ? '(off)' : '(on)'}`}
              onPress={() => onToggleFlashBtnPress()} />
            <IconText 
              name='circle-thin' 
              size={80} 
              text='Take picture'
              onPress={() => onTakePicturePress()} />
            <IconText 
              name='refresh' 
              size={50} 
              text='Flip camera' 
              onPress={() => onFlipBtnPress()} />
          </View>
        </View>
      </Camera>
    </View>
  );
}

/**
 * Renders an activity indicator whenever photo is being taken.
 * 
 * @param {*} props 
 */
function TakingPhotoIndicator(props) {
  const { takingPicture } = props;
  console.log(takingPicture)

  if(takingPicture) {
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator size='large' animating={takingPicture} />
        <Text style={styles.indicatorText}>{'Taking a picture...'}</Text>
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cameraStyle: {
    flex: 1
  },
  cameraViewContainer: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    height: 130,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicatorText: {
    color: '#FFFFFF'
  },
});