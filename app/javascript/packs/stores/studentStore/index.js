import {observable, action} from "mobx";
import axios from "axios";
import paginationStore from "../paginationStore"
import countryStore from "../countryStore"
import serialize from "form-serialize";

const SIZE = 6;
class StudentStore {
  @observable students;
  @observable total;
  @observable per_page;
  @observable columnSortOrder;

  constructor() {
    this.students = [];
    this.total = 0;
    this.per_page = 0;
    this.columnSortOrder = {
      "name": "asc",
      "email": "asc",
      "country": "asc",
      "created_at": "asc"
    };
  }

  @action setStudents(students) {
    this.students = students;
  }

  @action.bound download(query, pageNumber = 1) {
    console.log("StudentStore - download: query  = " + query);
    let apiHost = 'http://' + (process.env.API_HOST || 'localhost') + ':3000';
    paginationStore.setQuery(query);
    query["page"] = pageNumber;

    let query_string = Object.keys(query).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join('&');
    console.log("StudentStore - download: query_string  = " + query_string);

    axios
    //.get(apiHost + '/students.json/?' + serializedForm + '&page=' + pageNumber)
    .get(apiHost + '/students.json/?' +  query_string)
    .then((response) => {
      this.setStudents(response.data.students);
      countryStore.setCountries(response.data.countries);
      paginationStore.setPagination(response.data.current_page, response.data.per_page, response.data.total_num_of_students);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }

  @action.bound downloadStudents(pageNumber = 1) {
    let query = this.createQueryObject();
    this.download(query, pageNumber );
  }

  @action sortByName() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'name_' + this.columnSortOrder["name"];
    this.columnSortOrder["name"] = this.columnSortOrder["name"] == "asc" ? "desc" : "asc";
    this.download(query, 1);

  }
    
  createQueryObject() {
    const search_control = document.getElementById("filterrific_search_query");
    console.log("StudentStore - sortByName:  search_control = " +  search_control);
    console.log("StudentStore - sortByName:  search_control.name = " +  search_control.name);
    console.log("StudentStore - sortByName:  search_control.value = " +  search_control.value);

    const country_control = document.getElementById("filterrific_with_country_id");
    console.log("StudentStore - sortByName:  country_control = " +  country_control);
    console.log("StudentStore - sortByName:  country_control.name = " +  country_control.name);
    console.log("StudentStore - sortByName:  country_control.value = " +  country_control.value);
    if (country_control.value == "")
    {
      console.log("Country Control Value is EMPTY STRING");
    } else {
      console.log("Country Control Value is SOMETHING ELSE");
    }

    const registered_after_control = document.getElementById("filterrific_with_created_at_gte");
    console.log("StudentStore - sortByName:  registered_after_control = " +  registered_after_control);
    console.log("StudentStore - sortByName:  registered_after_control.name = " +  registered_after_control.name);
    console.log("StudentStore - sortByName:  registered_after_control.value = " +  registered_after_control.value);

    const sort_control = document.getElementById("filterrific_sorted_by");
    console.log("StudentStore - sortByName:  sort_control = " +  sort_control);
    console.log("StudentStore - sortByName:  sort_control.name = " +  sort_control.name);
    console.log("StudentStore - sortByName:  sort_control.value = " +  sort_control.value);

    let query = {};
    if (search_control.value != "") {
      query[search_control.name] = search_control.value;
    }
    if (country_control.value != "") {
      query[country_control.name] = country_control.value;
    }
    if (registered_after_control.value != "") {
      query[registered_after_control.name] = registered_after_control.value;
    }
    if (sort_control.value != "") {
      query[sort_control.name] = sort_control.value;
    }

    return query;
  }

  @action sortByEmail() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'email_' + this.columnSortOrder["email"];
    this.columnSortOrder["email"] = this.columnSortOrder["email"] == "asc" ? "desc" : "asc";
    this.download(query, 1);

    // let copies = this .students .slice(0, this.students.length);
    // this.sortByKey(copies, "email");
    // this.students = copies;
  }

  @action sortByCountry() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'country_name_' + this.columnSortOrder["country"];
    this.columnSortOrder["country"] = this.columnSortOrder["country"] == "asc" ? "desc" : "asc";
    this.download(query, 1);
  }

  @action sortByRegisteredAt() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'created_at_' + this.columnSortOrder["created_at"];
    this.columnSortOrder["created_at"] = this.columnSortOrder["created_at"] == "asc" ? "desc" : "asc";
    this.download(query, 1);
  }

  sortByKey(array, key) {
    array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    if (this.columnSortOrder[key] == "desc") {
      array.reverse();
    }
    this.columnSortOrder[key] = (this.columnSortOrder[key] == "desc") ? "asc" : "desc";
  }
  
}

const studentStore = new StudentStore();

export default studentStore;
export {StudentStore};