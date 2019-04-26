import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

@inject('studentStore', 'countryStore', 'paginationStore', 'sortedStore')
@observer class SortControl extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this
      .handleOnChange
      .bind(this);
  }

  handleOnChange(changeEvent) {
    this
      .props
      .sortedStore
      .setSortedStore(changeEvent.target.value);
    console.log("Scene - SortControl.js  changeEvent.target.value : " + changeEvent.target.value);
    this.props.studentStore.resetColumnIcons();
    this
      .props
      .studentStore
      .downloadStudents();
  }

  componentDidMount() {}

  render() {
    return (
      <div className="m-5">
        <Form.Label className="font-weight-bold">Sorted by</Form.Label>
        <Form.Control
          onChange={this.handleOnChange}
          as="select"
          name="filterrific[sorted_by]"
          id="filterrific_sorted_by"
          value={this.props.sortedStore.selectedSort}>
          {this
            .props
            .sortedStore
            .selectOptions
            .map((option) => <option key={option.id} value={option.value}>
              {option.label}
            </option>)
          }
        </Form.Control>
      </div>
    );
  }
}

export default SortControl;