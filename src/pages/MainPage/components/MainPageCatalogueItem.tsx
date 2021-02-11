import {Dispatch} from "redux";
import {connect} from "react-redux";
import {mapStateToProps} from '../store/selectors';

interface MainPageProps {
    dispatch: Dispatch<any>
    globalStore: object
    pageStore: {
        userData?: {
            name?: string
        }
    }
}

function MainPageCatalogueItem({dispatch, pageStore}: MainPageProps) {
    return (
        <div className="main_page__catalogue_item">
            <div className="main_page__catalogue_item_title">Некий пункт</div>
            <div className="main_page__catalogue_item_icon">
                ₽ {pageStore?.userData?.name}
            </div>
        </div>
    );
}

export default connect(mapStateToProps)(MainPageCatalogueItem);