import http from '../../helpers/http';

export default {
  getPosts() {
    return http.mock([1, 2, 3], 1000);
  },
};
