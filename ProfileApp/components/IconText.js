import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

export default function IconText(props) {
  const { 
    name, 
    text, 
    size, 
    color, 
    onPress, 
    textStyle, 
    containerStyle, 
    disabled,
    textPosition
  } = props

  return (
    <View style={containerStyle}>
      {textPosition === 'top' ? <Text style={textStyle}>{text}</Text> : null}
      <Icon 
        type='font-awesome' 
        name={name} 
        text={text}
        size={size}
        color={color}
        underlayColor={'rgba(0,0,0,0)'}
        disabled={disabled}
        onPress={() => onPress()}/>
      {textPosition === 'bottom' ? <Text style={textStyle}>{text}</Text> : null}
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
  textStyle: styles.textStyle,
  textPosition: 'bottom'
};