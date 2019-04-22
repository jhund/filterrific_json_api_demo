import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

@inject('studentStore', 'countryStore', 'paginationStore')
@observer class CountryControl extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange( changeEvent) {
    this.props.countryStore.setSelectedCountry(changeEvent.target.value);
    this.props.studentStore.downloadStudents();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="m-5">
        <Form.Label className="font-weight-bold">Country select</Form.Label>
        <Form.Control 
          onChange={this.handleOnChange}  
          as="select" 
          name="filterrific[with_country_id]" 
          id="filterrific_with_country_id"
          value={this.props.countryStore.selectedCountry}
          >
          <option value="">Any</option>
          {this
              .props
              .countryStore
              .countries
              .map((country) => <option key={country[1]} value={country[1]} > {country[0]} </option>
              )}
        </Form.Control>
      </div>
    );
  }
}

export default CountryControl;