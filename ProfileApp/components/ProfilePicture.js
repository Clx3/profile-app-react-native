import React, { Component, useState, useEffect } from 'react';
import {  Avatar } from 'react-native-elements';
import { API_BASE_URL } from '../Constants';
import { ActivityIndicator, Image } from 'react-native';
import { getAuthAsync } from '../auth/Auth';

/**
 * A profile image component which renders the given profile(profileId)'s
 * profile image that is fetched from the API. If the fetching fails, will render
 * a placeholder icon. If no profileId is provided as props, this will fetch the users
 * profile.
 * 
 * @param {*} props 
 */
export default function ProfilePicture(props) {
  const [imgSource, setImgSource] = useState({ uri: '', headers: { 'Authorization': ''}});
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    updateImgSource();
  }, []);

  async function updateImgSource() {
    const { profileId } = props; // if set to -1, will indicate users own profile

    const authObj = await getAuthAsync();

    if(profileId === -1) {
      setImgSource({uri: `${API_BASE_URL}profile/image/me/?${new Date()}`, headers: {'Authorization': `Bearer ${authObj.idToken}`}});
    } else {
      setImgSource({uri: `${API_BASE_URL}profile/image/${profileId}/?${new Date()}`, headers: {'Authorization': `Bearer ${authObj.idToken}`}})
    }
  }

  if(loadError) {
    return (
      <Avatar 
        icon={loadError ? {name: 'user', type: 'font-awesome'} : null}
        {...props}/>
    );
  } else {
    return (
      imgSource.uri === '' ? null :
        <Avatar 
          source={imgSource}
          imageProps={{
            PlaceholderContent: <ActivityIndicator/>,
            onError: ({ nativeEvent: {error} }) => setLoadError(true)
          }}
          icon={loadError ? {name: 'user', type: 'font-awesome'} : null}
          {...props}/>
    );
  }
}

ProfilePicture.defaultProps = {
  profileId: -1
}