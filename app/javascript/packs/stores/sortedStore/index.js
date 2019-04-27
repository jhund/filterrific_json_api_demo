
import {observable, action} from "mobx";


class SortedStore {
  @observable selectOptions;
  @observable selectedSort;

  constructor() {
    this.options = [
      {"id": 1, "value": "name_asc", "label": "Name (a-z)" },
      {"id": 2, "value": "name_desc", "label": "Name (z-a)" },
      {"id": 3, "value": "email_asc", "label": "Email (a-z)" },
      {"id": 4, "value": "email_desc", "label": "Email (z-a)" },
      {"id": 5, "value": "country_name_asc", "label": "Country (a-z)" },
      {"id": 6, "value": "country_name_desc", "label": "Country (z-a)" },
      {"id": 7, "value": "created_at_desc", "label": "Registration Date (newest first)" },
      {"id": 8, "value": "created_at_asc", "label": "Registration Date (oldest first)" },
    ];
    this.selectOptions = this.options ;
  }
   
  @action setSortedStore(chosenSort) {
    this.selectedSort = chosenSort;
    console.log("SortedStore - setSortedStore: chosenStore = " + chosenSort);
  }

  @action resetSortedStore() {
    this.selectedSort = "name_asc";
  }

}

const sortedStore = new SortedStore();

export default sortedStore;
export {SortedStore};