import {observable, action} from "mobx";
import axios from "axios";
import paginationStore from "../paginationStore"
import countryStore from "../countryStore"
//import serialize from "form-serialize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp  } from '@fortawesome/free-solid-svg-icons'

const SIZE = 6;
class StudentStore {
  @observable students;
  @observable total;
  @observable per_page;
  @observable columnSortOrder;
  @observable columnIcon;

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
    this.columnIcon = {
      "name": faSort,
      "email": faSort,
      "country": faSort,
      "created_at": faSort
    };
  }

  @action setStudents(students) {
    this.students = students;
  }

  @action.bound download(query, pageNumber = 1) {
    console.log("StudentStore - download: query  = " + query);
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    //let apiHost = 'http://' + (process.env.API_HOST || 'localhost') + ':3000';
    const apiHost = protocol + '//' + hostname + ':' + port; 
    console.log("StudentStore - download: document.referrert  = " + document.referrer);
    console.log("StudentStore - download: window.location.hostname  = " + window.location.hostname);
    console.log("StudentStore - download: window.location.protocol  = " + window.location.protocol);
    console.log("StudentStore - download: window.location.port  = " + window.location.port);
    console.log("StudentStore - download: window.location.href  = " + window.location.href);
    //apiHost = 'https://agile-falls-98686.herokuapp.com';
    console.log("StudentStore - download: apiHost  = " + apiHost);
    console.log("StudentStore - download: process.env.API_HOST  = " + process.env.API_HOST);
    paginationStore.setQuery(query);
    query["page"] = pageNumber;

    // create the query string using only JavaScript
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
    //this.columnSortOrder["name"] = this.columnSortOrder["name"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.columnSortOrder["name"] == "asc")
    {
      this.columnSortOrder["name"] =  "desc";
      this.columnIcon["name"] = faSortAlphaDown;
    }
    else if (this.columnSortOrder["name"] == "desc")
    {
      this.columnSortOrder["name"] = "asc";
      this.columnIcon["name"] = faSortAlphaUp;
    }

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
    //this.columnSortOrder["email"] = this.columnSortOrder["email"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.columnSortOrder["email"] == "asc")
    {
      this.columnSortOrder["email"] =  "desc";
      this.columnIcon["email"] = faSortAlphaDown;
    }
    else if (this.columnSortOrder["email"] == "desc")
    {
      this.columnSortOrder["email"] = "asc";
      this.columnIcon["email"] = faSortAlphaUp;
    }
    this.download(query, 1);

    // let copies = this .students .slice(0, this.students.length);
    // this.sortByKey(copies, "email");
    // this.students = copies;
  }

  @action sortByCountry() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'country_name_' + this.columnSortOrder["country"];
    //this.columnSortOrder["country"] = this.columnSortOrder["country"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.columnSortOrder["country"] == "asc")
    {
      this.columnSortOrder["country"] = "desc";
      this.columnIcon["country"] = faSortAlphaDown;
    }
    else if (this.columnSortOrder["country"] == "desc")
    {
      this.columnSortOrder["country"] = "asc";
      this.columnIcon["country"] = faSortAlphaUp;
    }
    this.download(query, 1);
  }

  @action sortByRegisteredAt() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'created_at_' + this.columnSortOrder["created_at"];
    //this.columnSortOrder["created_at"] = this.columnSortOrder["created_at"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.columnSortOrder["created_at"] == "asc")
    {
      this.columnSortOrder["created_at"] = "desc";
      this.columnIcon["created_at"] = faSortNumericDown;
    }
    else if (this.columnSortOrder["created_at"] == "desc")
    {
      this.columnSortOrder["created_at"] = "asc";
      this.columnIcon["created_at"] = faSortNumericUp;
    }
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

  @action resetColumnIcons() {
    this.columnIcon["name"] = faSort;
    this.columnIcon["email"] = faSort;
    this.columnIcon["country"] = faSort;
    this.columnIcon["created_at"] = faSort;
  }
  
}

const studentStore = new StudentStore();

export default studentStore;
export {StudentStore};