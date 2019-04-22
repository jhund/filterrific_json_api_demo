
import {observable, action} from "mobx";


class SortedStore {
  @observable selectOptions;
  @observable selectedSort;

  constructor() {
    this.options = [
      {"id": 1, "value": "name_asc", "label": "Name (a-z)" },
      {"id": 2, "value": "created_at_desc", "label": "Registration Date (newest first)" },
      {"id": 3, "value": "created_at_asc", "label": "Registration Date (oldest first)" },
      {"id": 4, "value": "country_name_asc", "label": "Country (a-z)" },
    ];
    this.selectOptions = this.options ;
  }
   
  @action setSortedStore(chosenSort) {
    this.selectedSort = chosenSort;
  }

  @action resetSortedStore() {
    this.selectedSort = "nam_asc";
  }

}

const sortedStore = new SortedStore();

export default sortedStore;
export {SortedStore};