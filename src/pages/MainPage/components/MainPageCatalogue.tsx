import MainPageCatalogueItem from "./MainPageCatalogueItem";

function MainPageCatalogue() {
    const items = (new Array(16)).fill(1).map((v, index) => (
        <MainPageCatalogueItem
            key={index}
        />
    ));
    return (
        <div className="main_page__catalogue">
            {items}
        </div>
    );
}

export default MainPageCatalogue;