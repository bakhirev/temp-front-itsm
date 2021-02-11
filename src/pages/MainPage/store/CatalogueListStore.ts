import {makeObservable, observable, action} from 'mobx';
import api from '../api';

class CatalogueListStore {
    isLoading: boolean = false
    list: any = []

    constructor() {
        makeObservable(this, {
            isLoading: observable,
            list: observable,
            getList: action
        })
    }

    async getList() {
        this.isLoading = true
        this.list = await api.getPosts()
        this.isLoading = false
    }
}

const catalogueListStore = new CatalogueListStore()

export default catalogueListStore;