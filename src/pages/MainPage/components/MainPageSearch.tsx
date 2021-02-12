import React from 'react';
import { observer } from 'mobx-react-lite';
import catalogueListStore from '../store/CatalogueListStore';

const MainPageSearch = observer(() => {
  const { isLoading } = catalogueListStore;
  const title = isLoading
    ? 'идет загрузка'
    : 'введите ключевое слово или номер заявки';

  return (
    <div className="main_page__search">
      <input
        disabled={isLoading}
        className="main_page__search_input"
        type="text"
        placeholder={title}
      />
      <button
        type="button"
        disabled={isLoading}
        className="main_page__search_button"
        onClick={() => {
          catalogueListStore.getList();
        }}
      >
        Найти
      </button>
    </div>
  );
});

export default MainPageSearch;
