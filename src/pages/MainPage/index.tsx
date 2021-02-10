import './index.scss';
import MainPageHeader from "./components/MainPageHeader";
import MainPageSearch from "./components/MainPageSearch";
import MainPageCatalogue from "./components/MainPageCatalogue";

function MainPage() {
  return (
      <div className="main_page">
          <MainPageHeader/>
          <MainPageSearch/>
          <MainPageCatalogue/>
      </div>
  );
}

export default MainPage;