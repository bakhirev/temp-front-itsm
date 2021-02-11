import {LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR} from './constants';
import {actionInterface} from './actions';
import initialState from './state';

export default function reducer(state = initialState, action : actionInterface) {
    switch (action.type) {
        case LOAD_REPOS_SUCCESS:
            return {
                loading: false,
                error: false,
                userData: action.userData,
            };

        case LOAD_REPOS_ERROR:
            return {
                loading: false,
                error: true,
                userData: null,
            };

        default:
            return {
                loading: true,
                error: false,
                userData: null,
            };
    }
}
