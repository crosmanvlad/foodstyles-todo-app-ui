import axios from 'axios';
import { TOKEN } from '../utils/constants';
import { removeCookie } from '../utils/cookie-handler';

const BASE_URL = 'http://localhost:8080';
const LOGIN_PATH = '/login';
const SIGNUP_PATH = '/signup';


const login = (username: string, password: string) => {
  return axios
    .post(`${BASE_URL}${LOGIN_PATH}`, {
      username,
      password
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

const signup = (name: string, username: string, password: string) => {
  return axios
    .post(`${BASE_URL}${SIGNUP_PATH}`, {
      name,
      username,
      password
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

const logout = () => {
  removeCookie(TOKEN);
  window.location.href = '/#/login';
};

const AuthService = {
  login,
  logout,
  signup
};

export default AuthService;
