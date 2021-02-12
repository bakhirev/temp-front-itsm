export default {
  getAccessToken() {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        access_token: 'ERTYUIOIYTREWERTYUIUYTRERTYUIOIUYTR',
      }), 5000);
    });
  },
  getGwtToken() {
    return new Promise((resolve) => {
      setTimeout(() => resolve('jwt_token'), 5000);
    });
  },
  login() {
    const epaURL = 'https://yandex.ru';
    const backURL = window.location.href;
    window.location.href = `${epaURL}?backUrl=${backURL}`;
  },
};
