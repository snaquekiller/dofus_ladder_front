import { ConfigUriUtil } from '../config/index.jsx';

const endpoints = {
  compare: ConfigUriUtil.getEndpoint('/player/compare/graph')
};

export default {
  compare(_name) {
    return ConfigUriUtil.get(`${endpoints.compare}?name=${_name}`);
  }
};
