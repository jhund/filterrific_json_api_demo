import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import DatePicker from "react-datepicker";
import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css';

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

import styled from 'styled-components';

const MyDatePicker = styled(DatePicker)`
  color: #495057;
  font-size: 1rem;
  width: 130%;
  height: calc(1.5em + 0.75rem + 2px);
  text-indent: 10px;
`;

@inject('studentStore', 'countryStore', 'paginationStore', 'dateStore')
@observer class RegisteredAfterControl extends Component
{
  constructor(props) {
    super(props);
    this.state = { };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.props.dateStore.setDate(date);
    this.props.studentStore.resetColumnIcons();

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // would a delay with Promise help ? - yes, it is working now
    delay(20).then(() => this.props.studentStore.downloadStudents());
  }

  componentDidMount() {}


  render() {
    return (
      <div className="m-5">
        <Form.Label className="font-weight-bold">Registered after </Form.Label>
        <MyDatePicker 
          size="lg"
          className="rounded"
          selected={this.props.dateStore.date} 
          onChange={this.handleChange}
          name="filterrific[with_created_at_gte]" id="filterrific_with_created_at_gte">
        </MyDatePicker> 
      </div>
    );
  }
}

export default RegisteredAfterControl;