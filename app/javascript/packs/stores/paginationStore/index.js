import {observable, action} from "mobx";

const MAX_NUMBER_OF_PAGES = 10;
class PaginationStore {
  @observable pages;
  @observable number_of_pages;
  @observable current_page;
  @observable per_page;
  @observable total_num_of_students;
  @observable next_page;
  @observable previous_page;
  @observable first_page;
  @observable last_page;
  @observable currrent_query;

  constructor() {
    this.pages = [];
    this.number_of_pages = 0;
    this.current_page = 0;
    this.per_page = 0;
    this.total_num_of_students = 0;
    this.next_page = false;
    this.previous_page = false;
    this.first_page = 0;
    this.last_page = 0;
    this.currrent_query = {};
  }

  @action setQuery(currrent_query) {
    this.current_query = currrent_query;
  }

  @action setPagination(current_page, per_page, total_num_of_students) {
    this.current_page = current_page;
    this.per_page = per_page;
    this.total_num_of_students = total_num_of_students;
    this.number_of_pages = Math.ceil(this.total_num_of_students / this.per_page);

    this.calculate_first_last_page();
    this.show_pages();
  }

  @action setPages(pages)
  {
    this.pages = pages;
  }

  @action calculate_first_last_page()
  {
    if (MAX_NUMBER_OF_PAGES > this.number_of_pages) {
      this.previous_page = false;
      this.next_page = false;
    } else {
      this.previous_page = true;
      this.next_page = true;
    }
  }

  @action show_pages()
  {
    let visibleHighPage = Math.max(parseInt(this.current_page), MAX_NUMBER_OF_PAGES);
    let visibleLowPage = visibleHighPage - MAX_NUMBER_OF_PAGES + 1;

    let calculated_pages = [];
    for (let counter = 1; counter <= this.number_of_pages; counter++) {
      let page = null;
      if (counter == this.current_page) {
        page = {
          "index": counter,
          "active": true,
          "visible": true
        };
      } else {
        if (visibleLowPage <= counter && counter <= visibleHighPage) {
          page = {
            "index": counter,
            "active": false,
            "visible": true
          };
        } else {
          page = {
            "index": counter,
            "active": false,
            "visible": false
          };
        }
      }
      calculated_pages.push(page);
    }
    this.setPages(calculated_pages);
  }

}

const paginationStore = new PaginationStore();

export default paginationStore;
export {PaginationStore};