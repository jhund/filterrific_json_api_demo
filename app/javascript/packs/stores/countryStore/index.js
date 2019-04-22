import {observable, action} from "mobx";

class CountryStore {
  @observable countries ;
  @observable selectedCountry;

  constructor() {
    this.countries = [];
    this.selectedCountry = "";
  }

  @action setCountries(countries) {
    this.countries = countries;
  }

  @action setSelectedCountry(country) {
    this.selectedCountry = country;
  }

  @action resetSelectedCountry() {
    this.selectedCountry = "";
  }
}

const countryStore = new CountryStore();

export default countryStore;
export {CountryStore};