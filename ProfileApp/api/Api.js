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

export async function putProfile(profile) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.put('profile/me/', profile);
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

export async function deleteFriend(friendId) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.delete(`friend/delete/${friendId}`);
}

export async function postImage(uri) {
  const apiAxios = await getAxiosAsync();

  let formData = new FormData();
  formData.append('file', {
    uri: uri,
    name: 'tempimg.jpg',
    type: 'image/jpeg'
  });

  return apiAxios.post('profile/image/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export async function putMessage(receiverId, msg) {
  const apiAxios = await getAxiosAsync();

  return apiAxios.put('message/', {
    receiverId: receiverId,
    content: msg
  });
}