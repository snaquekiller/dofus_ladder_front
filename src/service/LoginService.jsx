import Cookies from 'js-cookie';
import { ConfigUriUtil } from '../config/index.jsx';

const endpoints = {
  login: ConfigUriUtil.getEndpoint('/oauth/token')
};

export default {
  login(_email, _password) {
    const loginPromise = ConfigUriUtil.login(endpoints.login, {
      grant_type: 'password',
      username: _email,
      password: _password
    });

    return loginPromise.then(_response => {
      if (_response.data) {
        const token = _response.data.access_token;
        Cookies.set('token', token, { expires: 1 });
      }
      return true;
    });
  },

  logout() {
    ConfigUriUtil.logout();
  }
};
