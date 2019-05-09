import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {faSort, faSortAlphaDown, faSortAlphaUp, faSortNumericDown, faSortNumericUp} from '@fortawesome/free-solid-svg-icons'

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

@inject('studentStore', 'countryStore', 'paginationStore', 'sortedStore')
@observer class SortControl extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnChange(changeEvent) {
    this.props.sortedStore.setSortedStore(changeEvent.target.value);
    this.props.studentStore.resetColumnIcons();
    this.props.studentStore.downloadStudents();
    switch (changeEvent.target.value) {
      case "name_asc":
        this.props.studentStore.setColumnIcon("name", faSortAlphaDown)
        break;
      case "name_desc":
        this.props.studentStore.setColumnIcon("name", faSortAlphaUp)
        break;
      case "country_name_asc":
        this.props.studentStore.setColumnIcon("country", faSortAlphaDown)
        break;
      case "country_name_desc":
        this.props.studentStore.setColumnIcon("country", faSortAlphaUp)
        break;
      case "email_asc":
        this.props.studentStore.setColumnIcon("email", faSortAlphaDown)
        break;
      case "email_desc":
        this.props.studentStore.setColumnIcon("email", faSortAlphaUp)
        break;
      case "created_at_asc":
        this.props.studentStore.setColumnIcon("created_at", faSortAlphaDown)
        break;
      case "created_at_desc":
        this.props.studentStore.setColumnIcon("created_at", faSortAlphaUp)
        break;
      default:
        break;
    }
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