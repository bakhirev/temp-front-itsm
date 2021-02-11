import Logo from '../../../logo.svg';
import {
    Link
} from "react-router-dom";

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
        <div key={title} className="main_page__header_item">
            <Link to={index ? '/about' : '/'}>{title}</Link>
        </div>
    ));

    return (
        <div className="main_page__header">
            <img className="main_page__header_logo" src={Logo} alt="VTB"/>
            {buttons}
        </div>
    );
}

export default MainPageHeader;