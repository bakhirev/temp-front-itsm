import http from '../../helpers/http';

export default {
  getAccessToken() {
    return http.mock({
      access_token: 'ERTYUIOIYTREWERTYUIUYTRERTYUIOIUYTR',
    });
  },
  getGwtToken() {
    return http.mock({
      jwt_token: 'ERTYUIOIYTREWERTYUIUYTRERTYUIOIUYTR',
    });
  },
  login() {
    const epaURL = 'https://yandex.ru';
    const backURL = window.location.href;
    window.location.href = `${epaURL}?backUrl=${backURL}`;
  },
};
