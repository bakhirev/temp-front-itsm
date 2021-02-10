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
    ].map((title) => (
        <div className="main_page__header_item">
            {title}
        </div>
    ));

    return (
        <div className="main_page__header">
            <img className="main_page__header_logo" src={Logo} alt="VTB" />
            {buttons}
        </div>
    );
}

export default MainPageHeader;