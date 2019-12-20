import axios from 'axios';
import { API_BASE_URL } from '../Constants';
import { getAuthAsync } from '../auth/Auth';

let apiAxios = axios.create({
  baseURL: API_BASE_URL
}); 

async function getAxiosAsync() {
  try {
    const authObj = await getAuthAsync();

    apiAxios.defaults.headers.common['Authorization'] = `Bearer ${authObj.idToken}`;
  } catch(error) {
    apiAxios.defaults.headers.common['Authorization'] = null;
  }
  return apiAxios;
}

export async function getProfile() {
  const apiAxios = await getAxiosAsync();

  console.log(apiAxios.defaults.headers);
  return apiAxios.get('profile/me/');
}

export async function getIsUsernameValid(username) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.get(`profile/isvalid/?username=${username}`);
}