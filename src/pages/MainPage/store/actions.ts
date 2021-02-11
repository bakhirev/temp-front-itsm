import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR } from './constants';

export interface actionInterface {
  type : string
  userData : object | undefined
}

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(userData: object) {
  return {
    type: LOAD_REPOS_SUCCESS,
    userData,
  };
}

export function repoLoadingError(error: object) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}
