import { makeAutoObservable } from 'mobx';
import api from '../api';
import AUTH_STATE from './constants';

class AuthorizationStore {
  state: string = '';

  accessToken: any = '';

  gwtToken: any = '';

  constructor() {
    makeAutoObservable(this);
    this.beginAuthorization();
  }

  async beginAuthorization() {
    this.state = AUTH_STATE.WAITING_ACCESS_TOKEN;
    try {
      this.accessToken = await api.getAccessToken();
      this.state = AUTH_STATE.WAITING_GWT_TOKEN;
      this.gwtToken = await api.getGwtToken(this.accessToken.access_token);
    } catch (e) {
      api.login();
    }
    this.state = AUTH_STATE.SUCCESS;
  }
}

const authorizationStore = new AuthorizationStore();

export default authorizationStore;
