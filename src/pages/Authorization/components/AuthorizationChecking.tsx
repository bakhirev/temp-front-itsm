import React from 'react';
import { observer } from 'mobx-react-lite';
import AUTH_STATE from '../store/constants';
import authorizationStore from '../store/AuthorizationStore';

const AuthorizationChecking = observer(() => {
  const { state } = authorizationStore;
  const description = {
    [AUTH_STATE.WAITING_ACCESS_TOKEN]: '(получение access токена)',
    [AUTH_STATE.WAITING_GWT_TOKEN]: '(получение GWT токена)',
  }[state] || '';

  return (
    <div className="authorization_processing">
      <div className="authorization_processing_container">
        <p className="authorization_processing__title">
          проверка авторизации...
        </p>
        <p className="authorization_processing__description">
          {description}
        </p>
      </div>
    </div>
  );
});

export default AuthorizationChecking;
