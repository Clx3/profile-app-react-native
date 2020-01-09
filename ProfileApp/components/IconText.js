import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

export default function IconText(props) {
  const { name, text, size, color, onPress, textStyle, containerStyle, disabled } = props

  return (
    <View style={containerStyle}>
      <Icon 
        type='font-awesome' 
        name={name} 
        text={text}
        size={size}
        color={color}
        underlayColor={'rgba(0,0,0,0)'}
        disabled={disabled}
        onPress={() => onPress()}/>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
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
  disabled: false,
  onPress: () => null,
  containerStyle: styles.container,
  textStyle: styles.textStyle
};