import axios from 'axios';
import qs from 'querystring';
import Cookies from 'js-cookie';

export const configs = {
  dev: {
    domain: 'http://localhost:9665'
  },
  stg: {
    domain: 'http://localhost:9665'
  },
  prd: {
    domain: 'http://localhost:9665'
  }
};
export const env = window.pageEnv || 'dev';

export const langage = 'fr';

class ConfigUri {
  static getHeaders() {
    const bearer = `Bearer ${Cookies.get('token')}`;
    return {
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        Authorization: bearer,
        'Content-Type': 'application/json'
      }
    };
  }

  static getHeadersLogin() {
    return {
      mode: 'no-cors',
      headers: {
        Accept: 'application/json',
        Authorization: 'Basic dGVzdDp0ZXN0Mg==',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  }

  static getEndpoint(_endPoint) {
    return configs[env].domain + _endPoint;
  }

  static get(_url) {
    return axios
      .get(_url, this.getHeaders())
      .then(response => response)
      .catch(error => {
        if (error.response.status === 401) {
          Cookies.remove('token');
        }
        // eslint-disable-next-line no-console
        console.error('error', error);
        return null;
      });
  }

  static hasToken() {
    return Boolean(Cookies.get('token'));
  }

  static post(_url, _data) {
    return axios.post(_url, _data, this.getHeaders());
  }

  static login(_url, _data) {
    return axios.post(_url, qs.stringify(_data), this.getHeadersLogin());
  }

  static logout() {
    return Cookies.remove('token');
  }
}
export const ConfigUriUtil = ConfigUri;

export const config = configs[env];
