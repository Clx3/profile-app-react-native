import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

export default function IconText(props) {
  const { name, text, size, color, onPress, textStyle, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Icon 
        type='font-awesome' 
        name={name} 
        text={text}
        size={size}
        color={color}
        underlayColor={null}
        onPress={() => onPress()}/>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center'
  }
})

IconText.defaultProps = {
  name: 'user',
  text: '',
  size: 25,
  color: '#00F3B2',
  onPress: () => null,
  containerStyle: styles.container,
  textStyle: styles.textStyle
};