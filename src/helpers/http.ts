class HttpClient {
  authToken: string = '';

  // eslint-disable-next-line class-methods-use-this
  mock(data?: any, delay?: number) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(data), delay || 1000);
    });
  }

  get(url: string, data: any) {
    const query = HttpClient.getLikeString(data) || '';
    const urlWithData = url.includes('?')
      ? `${url}&${query}`
      : `${url}${query}`;

    return this.sendRequest('get', urlWithData, data);
  }

  post(url: string, body: any) {
    return this.sendRequest('get', url, body);
  }

  put(url: string, body: any) {
    return this.sendRequest('get', url, body);
  }

  delete(url: string) {
    return this.sendRequest('delete', url);
  }

  sendRequest(method: string, url: string, data?: any) {
    const options = HttpClient.getRequestOptions(method);
    const optionsWithBody = HttpClient.getOptionsWithBody(options, data);
    const optionsWithAuth = this.getOptionsWithAuth(optionsWithBody);
    return fetch(url, optionsWithAuth).then((d) => d.json());
  }

  static getRequestOptions(method: string) {
    return {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  }

  static getOptionsWithBody(options: object, data: any) {
    return data
      ? { ...options, body: HttpClient.getLikeString(data) }
      : options;
  }

  getOptionsWithAuth(options: object) {
    return this.authToken
      ? { ...options, Authorization: `Bearer ${this.authToken}` }
      : options;
  }

  static getLikeString(data: any) {
    if (!data) return data;
    if (typeof data === 'object') return JSON.stringify(data);
    if (typeof data.toString === 'function') return data.toString();
    return data;
  }
}

const http = new HttpClient();

export default http;
