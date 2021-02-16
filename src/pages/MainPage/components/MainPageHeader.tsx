import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Logo from '../../../logo.svg';

function MainPageHeader() {
  const buttons = [
    'Каталог услуг',
    'Избранное',
    'Мои заявки',
    'Мои роли',
    'Согласования',
    'Аварии',
    'Информация',
  ].map((title, index) => (
    <div key={title} className="main-page--header-item">
      <Link to={index ? '/about' : '/'}>{title}</Link>
    </div>
  ));

  return (
    <div className="main-page--header">
      <img className="main-page--header-logo" src={Logo} alt="VTB" />
      {buttons}
    </div>
  );
}

export default MainPageHeader;
