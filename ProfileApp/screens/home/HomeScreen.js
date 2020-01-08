import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text> TODO </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061620',
  }
});