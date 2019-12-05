import { authorize, refresh } from 'react-native-app-auth';
import AsyncStorage from '@react-native-community/async-storage';
import { STORAGE_KEY } from '../Constants';

const AUTH_STORAGE_KEY = `${STORAGE_KEY}:AUTH`;

const config = {
  issuer: 'https://accounts.google.com',
  clientId: 'ADD_ME',
  redirectUrl: 'com.profileapp:/',
  scopes: ['openid', 'profile', 'email']
};

export const authorizeAsync = async() => {
  try {
    const result = await authorize(config);
    await storeTokensAsync(result);

    console.log(result);
  } catch(error) {
    console.log(error)
  }
}

export const getAuthAsync = async() => {
  const authObj = await getTokensAsync();

  if(authObj) {
    const currentTime = Date.now();
    const accessTokenExpireTime = Date.parse(authObj.accessTokenExpirationDate);

    if(currentTime > accessTokenExpireTime) {
      const refreshedAuthObj = await refreshAuthAsync(authObj);

      if(refreshedAuthObj)
        return refreshedAuthObj;
    } else {
      return authObj;
    }
  }
  return null;
}

const refreshAuthAsync = async({ refreshToken }) => {
  try {   
    const authObj = await refresh(config, {
      refreshToken: refreshToken
    });
    
    if(authObj) {
      storeTokensAsync(refreshResult);
      return refreshResult;
    }
  } catch(error) {
    console.log(error);
  }

  return null;
}

const storeTokensAsync = async(authObj) => {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authObj));
  } catch (error) {
    console.log(error);
  }
}

const getTokensAsync = async() => {
  try {
    const authObj = await AsyncStorage.getItem(AUTH_STORAGE_KEY+'asada');
    return JSON.parse(authObj);
  } catch(error) {
    console.log(error);
  }
}

