import React, { Component, useState } from 'react';
import { View, Modal, Text, StyleSheet, ScrollView } from 'react-native';
import IconText from './IconText';
import ProfilePicture from './ProfilePicture';

export default function ProfileModal(props) {
  const { visible, profile, onClosePress } = props;

  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalHeaderText}>{profile ? profile.username : ''}</Text>
        <View style={styles.modalContentContainer}>
          <View style={styles.pictureContainer}>
            <ProfilePicture 
              profileId={profile ? profile.id : -1}
              size='xlarge'
              rounded />
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={styles.descriptionLabel}>Description</Text>
          </View>
          <View style={styles.modalDescriptionContainer}>
            <ScrollView>
              <Text style={styles.modalInput}>{profile ? profile.description : ''}</Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.modalBottomContainer}>
          <IconText 
            name='times-circle' 
            text='Close'
            color={'#800000'}
            size={50} 
            onPress={onClosePress}/>
        </View>
      </View>
    </Modal>
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
  },
  modalContainer: {
    flex: 1,
    margin: 10,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  modalHeaderText: {
    fontWeight: 'bold',
    color: '#00F3B2',
    textAlign: 'center',
    fontSize: 23
  },
  modalContentContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 2,
  },
  pictureContainer: {
    alignItems: 'center',
  },
  descriptionLabel: {
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 3
  },
  modalDescriptionContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(8, 30, 43, 0.7)'
  },
  modalInput: {
    fontSize: 12,
    color: '#00e6a8'
  },
  modalBottomContainer: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  }
});