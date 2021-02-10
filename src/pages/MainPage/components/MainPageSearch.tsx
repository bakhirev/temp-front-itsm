
function MainPageSearch() {
  return (
      <div className="main_page__search">
          <input
              className="main_page__search_input" autoFocus={true} type="text"
              placeholder="введите ключевое слово или номер заявки"
          />
          <button  className="main_page__search_button">Найти</button>
      </div>
  );
}

export default MainPageSearch;