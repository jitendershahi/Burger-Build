import axios from 'axios'

const instance = axios.create({
    baseURL : "https://burger-builder-8bd98.firebaseio.com/"
});


export default instance;

