import {observable, action} from "mobx";
import axios from "axios";
import paginationStore from "../paginationStore"
import countryStore from "../countryStore"
import sortedStore from "../sortedStore"
//import serialize from "form-serialize";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp  } from '@fortawesome/free-solid-svg-icons'

const SIZE = 6;
class StudentStore {
  @observable students;
  @observable total;
  @observable per_page;
  @observable nextStateColumnSortOrder;
  @observable columnIcon;

  constructor() {
    this.students = [];
    this.total = 0;
    this.per_page = 0;
    this.nextStateColumnSortOrder = {
      "name": "desc",
      "email": "asc",
      "country": "asc",
      "created_at": "asc"
    };
    this.columnIcon = {
      "name": faSortAlphaDown,
      "email": faSort,
      "country": faSort,
      "created_at": faSort
    };
  }

  @action setStudents(students) {
    this.students = students;
  }

  @action setColumnIcon(columnName, icon) {
    this.columnIcon[columnName] = icon;
  }

  @action.bound download(query, pageNumber = 1) {
    console.log("StudentStore - download: query  = " + query);
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    const port = window.location.port;
    const apiHost = protocol + '//' + hostname + ':' + port; 
    console.log("StudentStore - download: apiHost  = " + apiHost);

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

  
    
  createQueryObject() {
    const search_control = document.getElementById("filterrific_search_query");
    console.log("StudentStore - createQueryObject:  search_control = " +  search_control);
    console.log("StudentStore - createQueryObject:  search_control.name = " +  search_control.name);
    console.log("StudentStore - createQueryObject:  search_control.value = " +  search_control.value);

    const country_control = document.getElementById("filterrific_with_country_id");
    console.log("StudentStore - createQueryObject:  country_control = " +  country_control);
    console.log("StudentStore - createQueryObject:  country_control.name = " +  country_control.name);
    console.log("StudentStore - createQueryObject:  country_control.value = " +  country_control.value);
    if (country_control.value == "")
    {
      console.log("Country Control Value is EMPTY STRING");
    } else {
      console.log("Country Control Value is SOMETHING ELSE");
    }

    const registered_after_control = document.getElementById("filterrific_with_created_at_gte");
    console.log("StudentStore - createQueryObject:  registered_after_control = " +  registered_after_control);
    console.log("StudentStore - createQueryObject:  registered_after_control.name = " +  registered_after_control.name);
    console.log("StudentStore - createQueryObject:  registered_after_control.value = " +  registered_after_control.value);

    const sort_control = document.getElementById("filterrific_sorted_by");
    console.log("StudentStore - createQueryObject:  sort_control = " +  sort_control);
    console.log("StudentStore - createQueryObject:  sort_control.name = " +  sort_control.name);
    console.log("StudentStore - createQueryObject:  sort_control.value = " +  sort_control.value);

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

  @action sortByName() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'name_' + this.nextStateColumnSortOrder["name"];
    console.log("StudentStore - sortByName:  sort_control.value = " +  sort_control.value);
    //this.nextStateColumnSortOrder["name"] = this.nextStateColumnSortOrder["name"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.nextStateColumnSortOrder["name"] == "asc")
    {
      this.nextStateColumnSortOrder["name"] =  "desc";   // next sort order
      this.columnIcon["name"] = faSortAlphaDown;
      sortedStore.setSortedStore("name_asc");
      console.log("StudentStore - sortByName - asc:  sort_control.value = " +  sort_control.value);
    }
    else if (this.nextStateColumnSortOrder["name"] == "desc")
    {
      this.nextStateColumnSortOrder["name"] = "asc";
      this.columnIcon["name"] = faSortAlphaUp;
      sortedStore.setSortedStore("name_desc");
      console.log("StudentStore - sortByName - desc:  sort_control.value = " +  sort_control.value);
    }

    this.download(query, 1);
  }

  @action sortByEmail() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'email_' + this.nextStateColumnSortOrder["email"];
    //this.nextStateColumnSortOrder["email"] = this.nextStateColumnSortOrder["email"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.nextStateColumnSortOrder["email"] == "asc")
    {
      this.nextStateColumnSortOrder["email"] =  "desc";
      this.columnIcon["email"] = faSortAlphaDown;
      sortedStore.setSortedStore("email_asc");
    }
    else if (this.nextStateColumnSortOrder["email"] == "desc")
    {
      this.nextStateColumnSortOrder["email"] = "asc";
      this.columnIcon["email"] = faSortAlphaUp;
      sortedStore.setSortedStore("email_desc");
    }
    this.download(query, 1);

    // let copies = this .students .slice(0, this.students.length);
    // this.sortByKey(copies, "email");
    // this.students = copies;
  }

  @action sortByCountry() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'country_name_' + this.nextStateColumnSortOrder["country"];
    //this.nextStateColumnSortOrder["country"] = this.nextStateColumnSortOrder["country"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.nextStateColumnSortOrder["country"] == "asc")
    {
      this.nextStateColumnSortOrder["country"] = "desc";
      this.columnIcon["country"] = faSortAlphaDown;
      sortedStore.setSortedStore("country_name_asc");
    }
    else if (this.nextStateColumnSortOrder["country"] == "desc")
    {
      this.nextStateColumnSortOrder["country"] = "asc";
      this.columnIcon["country"] = faSortAlphaUp;
      sortedStore.setSortedStore("country_name_desc");
    }
    this.download(query, 1);
  }

  @action sortByRegisteredAt() {
    let query = this.createQueryObject();
    const sort_control = document.getElementById("filterrific_sorted_by");
    query[sort_control.name] = 'created_at_' + this.nextStateColumnSortOrder["created_at"];
    //this.nextStateColumnSortOrder["created_at"] = this.nextStateColumnSortOrder["created_at"] == "asc" ? "desc" : "asc";
    this.resetColumnIcons();
    if (this.nextStateColumnSortOrder["created_at"] == "asc")
    {
      this.nextStateColumnSortOrder["created_at"] = "desc";
      this.columnIcon["created_at"] = faSortNumericDown;
      sortedStore.setSortedStore("created_at_asc");
    }
    else if (this.nextStateColumnSortOrder["created_at"] == "desc")
    {
      this.nextStateColumnSortOrder["created_at"] = "asc";
      this.columnIcon["created_at"] = faSortNumericUp;
      sortedStore.setSortedStore("created_at_desc");
    }
    this.download(query, 1);
  }

  sortByKey(array, key) {
    array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    if (this.nextStateColumnSortOrder[key] == "desc") {
      array.reverse();
    }
    this.nextStateColumnSortOrder[key] = (this.nextStateColumnSortOrder[key] == "desc") ? "asc" : "desc";
  }

  @action resetColumnIcons() {
    // reset icons
    this.columnIcon["name"] = faSort;
    this.columnIcon["email"] = faSort;
    this.columnIcon["country"] = faSort;
    this.columnIcon["created_at"] = faSort;

    // reset column next sort order
    // this.nextStateColumnSortOrder["name"] =  "asc"; 
    // this.nextStateColumnSortOrder["email"] =  "asc"; 
    // this.nextStateColumnSortOrder["country"] =  "asc"; 
    // this.nextStateColumnSortOrder["created_at"] =  "asc"; 
  }
}

const studentStore = new StudentStore();

export default studentStore;
export {StudentStore};