import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import {
  Avatar
} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen(props) {
  return(
    <View style={styles.container}>
      <Avatar
        size="xlarge"
        rounded title="?" />
      <Text>You are signed in. Really epic application 5/5.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})