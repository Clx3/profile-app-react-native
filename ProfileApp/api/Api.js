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

export async function createProfile(username, description) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.post('profile/', {
    username: username,
    description: description
  });
}

export async function getAllProfilesByUsernameSearch(searchText) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.get(`profile/search/?searchText=${searchText}`);
}

export async function getFriends() {
  const apiAxios = await getAxiosAsync();

  return apiAxios.get('friend/');
}

export async function createFriend(friendId) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.post(`friend/add/${friendId}`);
}