import {observable, action} from "mobx";


class DateStore {
  @observable date;

  constructor() {
    this.date = null
  }

  @action setDate(date) {
    this.date = date;
  }

  @action resetDate() {
    this.date = null
  }
}

const dateStore = new DateStore();

export default dateStore;
export {DateStore};