import React from 'react';
import { observer } from 'mobx-react-lite';
import './index.scss';
import AUTH_STATE from './store/constants';
import authorizationStore from './store/AuthorizationStore';
import AuthorizationChecking from './components/AuthorizationChecking';
import AuthorizationSuccess from './components/AuthorizationSuccess';

const Authorization = observer(() => {
  const { state } = authorizationStore;
  const content = state === AUTH_STATE.SUCCESS
    ? (<AuthorizationSuccess />)
    : (<AuthorizationChecking />);

  return (
    <div className="authorization">
      {content}
    </div>
  );
});

export default Authorization;
