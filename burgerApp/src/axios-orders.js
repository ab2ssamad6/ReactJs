import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-1c1cd.firebaseio.com/'
});

export default instance;