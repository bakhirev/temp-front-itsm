import React from "react";
import {Dispatch} from 'redux';
import {connect} from 'react-redux'

import './index.scss';
import MainPageHeader from "./components/MainPageHeader";
import MainPageSearch from "./components/MainPageSearch";
import MainPageCatalogue from "./components/MainPageCatalogue";
import {mapStateToProps} from './store/selectors';
import {reposLoaded} from './store/actions';

interface MainPageProps {
    dispatch: Dispatch<any>
    globalStore: object
    pageStore: object
}

function MainPage({dispatch, pageStore}: MainPageProps) {
    console.dir(pageStore);
    return (
        <div className="main_page" onClick={() => {
            console.log('a');
            dispatch(reposLoaded({name: 'n'}));
        }}>
            <MainPageHeader/>
            <MainPageSearch/>
            <MainPageCatalogue/>
        </div>
    );
}

export default connect(mapStateToProps)(MainPage);
