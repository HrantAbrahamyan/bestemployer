import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bestemployeroftheworld.firebaseio.com/'
});

export default instance;