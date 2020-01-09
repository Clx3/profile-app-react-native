import React, { Component, useState } from 'react';
import { View, Modal, Text, StyleSheet, KeyboardAvoidingView } from 'react-native';
import IconText from './IconText';
import ProfilePicture from './ProfilePicture';
import { Input } from 'react-native-elements';
import { putMessage } from '../api/Api';

export default function MessageModal(props) {
  const { visible, profile, onClosePress } = props;

  const [message, setMessage] = useState('');

  async function onSendBtnPressAsync() {
    try {
      const response = await putMessage(profile.id, message);

      setMessage('');
      onClosePress();
      alert('Message sent!');
    } catch(error) {
      console.log(error);
    }
  }
  
  /**
   * Renders the close and send icons at the bottom of
   * the modal.
   */
  function BottomIcons() {
    return(
      <View style={styles.modalBottomContainer}>
        <IconText 
          name='times-circle' 
          text='Close'
          color={'#800000'}
          size={50} 
          onPress={onClosePress}/>
        <IconText 
          name='check' 
          text='Send'
          size={50} 
          onPress={async() => await onSendBtnPressAsync()}/>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <Modal 
        animationType="slide"
        transparent={true}
        visible={visible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeaderText}>Send a message</Text>
          <View style={styles.modalContentContainer}>
            <View style={styles.modalReceiverContainer}>
              <Text style={styles.modalToText}>To:</Text>
              <Text style={styles.modalReceiverText}>{profile ? profile.username : ''}</Text>
                <ProfilePicture 
                  profileId={profile ? profile.id : -1}
                  size='medium'
                  rounded />
            </View>
            <View style={styles.modalMessageHeader}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text style={styles.modalMessageLabel}>Message</Text>
              </View>
            </View>
            <View style={styles.modalMessageContainer}>
              <Input 
                  style={styles.modalInput} 
                  inputStyle={styles.modalInput}
                  value={message}
                  onChangeText={(value) => setMessage(value)}
                  placeholder='Type a message...'
                  placeholderTextColor='#00b383'
                  maxLength={499}
                  multiline
                  inputContainerStyle={{ borderBottomWidth: 0 }} />
            </View>
          </View>
          <BottomIcons/>
        </View>
      </Modal>
    </KeyboardAvoidingView>
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
  modalReceiverContainer: {
    //flex: 0.3,
    flexDirection: 'column',
    alignItems: 'center',
  },
  modalToText: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 20
  },
  modalReceiverText: {
    fontWeight: 'bold',
    color: '#00F3B2',
    textAlign: 'center',
    fontSize: 17
  },
  modalMessageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalMessageLabel: {
    fontWeight: 'bold',
    color: '#00F3B2',
    fontSize: 17,
    paddingBottom: 3
  },
  modalMessageContainer: {
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
    justifyContent: 'space-between',
  }
});