import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';
import IconText from './IconText';
import ProfilePicture from './ProfilePicture';
import { cutString } from '../Util';

export default function ProfileListItem(props) {
  const { profile, containerStyle, titleStyle, subtitleStyle, RightIcon, onListItemPress } = props;

  return (
    <ListItem
      title={profile.username}
      containerStyle={containerStyle}
      titleStyle={titleStyle}
      onPress={onListItemPress}
      leftIcon={ <ProfilePicture profileId={profile.id} size="medium" rounded /> }
      rightIcon={ RightIcon }
      subtitle={cutString(profile.description, 40)} 
      subtitleStyle={subtitleStyle} />
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    margin: 5,
    borderRadius: 2,
    backgroundColor: '#0c2c40'
  },
  titleStyle: {
    color: '#00F3B2',
    textShadowColor: "#000",
    textShadowOffset: {
      width: 0,
      height: 1,
    },
    textShadowRadius: 6.27
  },
  subtitleStyle: {
    color: '#8c8c8c'
  }, 
});

ProfileListItem.defaultProps = {
  containerStyle: styles.containerStyle,
  titleStyle: styles.titleStyle,
  subtitleStyle: styles.subtitleStyle,
  RightIcon: () => null,
  onListItemPress: () => null
}