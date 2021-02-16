import React from 'react';
import MainPageCatalogueItem from './MainPageCatalogueItem';

function MainPageCatalogue() {
  const items = (new Array(16)).fill(1).map(() => (
    <MainPageCatalogueItem key={Math.random()} />
  ));
  return (
    <div className="main-page--catalogue">
      {items}
    </div>
  );
}

export default MainPageCatalogue;
