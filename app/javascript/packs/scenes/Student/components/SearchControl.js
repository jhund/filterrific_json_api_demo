import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import _ from 'lodash';

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

@inject('studentStore', 'countryStore', 'paginationStore', 'searchStore')
@observer class SearchControl extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
    this.debounceDownloadStudents = _.debounce(this.debounceDownloadStudents, 500);
  }

  handleOnChange( changeEvent) {
    this.props.searchStore.setSearchText(changeEvent.target.value);
    this.debounceDownloadStudents();
  }

  debounceDownloadStudents() {
    this.props.studentStore.downloadStudents();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="m-5">
        <Form.Label className="font-weight-bold">Search</Form.Label>
        <Form.Control 
          onChange={this.handleOnChange} 
          name="filterrific[search_query]" 
          id="filterrific_search_query" 
          type="text" 
          value={this.props.searchStore.searchText} 
          placeholder="Your Search Here">
          </Form.Control>
      </div>
    );
  }
}

export default SearchControl;