
import {observable, action} from "mobx";


class SearchStore {
  @observable searchText = "";

  @action setSearchText(searchText) {
    this.searchText = searchText;
  }

  @action resetSearchText() {
    this.searchText = "";
  }
}

const searchStore = new SearchStore();

export default searchStore;
export {SearchStore};