import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-burger-builder-23efb.firebaseio.com'
});

export default axiosInstance;