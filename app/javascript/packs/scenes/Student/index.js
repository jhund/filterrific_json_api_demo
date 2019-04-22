import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import {Table, Form, Row, Col} from 'react-bootstrap';
import {Button, Pagination} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';
import SearchControl from './components/SearchControl';
import CountryControl from './components/CountryControl';
import RegisteredAfterControl from './components/RegisteredAfterControl';
import SortControl from './components/SortControl';
import CustomPagination from './components/CustomPagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort } from '@fortawesome/free-solid-svg-icons'

@inject('studentStore', 'countryStore', 'paginationStore', 'dateStore', 'searchStore', 'sortedStore')
@observer class Student extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.formHandleOnChange = this.formHandleOnChange.bind(this);
    this.handleResetFilters = this.handleResetFilters.bind(this);
    this.handleSortByName = this.handleSortByName.bind(this);
    this.handleSortByEmail = this.handleSortByEmail.bind(this);
    this.handleSortByCountry = this.handleSortByCountry.bind(this);
    this.handleSortByRegisteredAt = this.handleSortByRegisteredAt.bind(this);
  }

  handleResetFilters()
  {
    this.props.searchStore.resetSearchText("");
    this.props.countryStore.resetSelectedCountry();
    this.props.dateStore.resetDate();
    this.props.sortedStore.resetSortedStore();

    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    delay(10).then(() => this.props.studentStore.downloadStudents());
  }

  formHandleOnChange( changeEvent) {
    this.props.studentStore.downloadStudents();
  }

  handleSortByName(){
    this.props.studentStore.sortByName();
  }

  handleSortByEmail(){
    this.props.studentStore.sortByEmail();
  }

  handleSortByCountry(){
    this.props.studentStore.sortByCountry();
  }

  handleSortByRegisteredAt(){
    this.props.studentStore.sortByRegisteredAt();
  }

  componentDidMount() {
    this.props.studentStore.downloadStudents();
  }

  render() {
    let low = this.props.paginationStore.current_page  *  this.props.paginationStore.per_page  - 9;
    low = (this.props.paginationStore.total_num_of_students <= 0) ? 0 : low;
    let high = Math.min(this.props.paginationStore.total_num_of_students, 
      this.props.paginationStore.per_page * this.props.paginationStore.current_page) ;

    return (
      <div className="m-5">
        <h4> Students</h4>
        <div className="card card-body bg-light m-1 my-5">
          <Form id="filterrific_filter" >
            <Row>
              <Col>
                <Form.Group>
                  <SearchControl formHandleOnChange={this.formHandleOnChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <CountryControl formHandleOnChange={this.formHandleOnChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <RegisteredAfterControl formHandleOnChange={this.formHandleOnChange} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <SortControl formHandleOnChange={this.formHandleOnChange} />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </div>
        <div className="card card-body bg-light m-1 my-5">
          <Row>
            <Col md={{ span: 4 }} className="m-1">
              Displaying students &nbsp;  
              <span className="font-weight-bold">      
                {low} 
              </span>
               - 
              <span className="font-weight-bold"> 
                {high}
              </span> of 
              <span className="font-weight-bold"> {this.props.paginationStore.total_num_of_students} </span> in total
            </Col> 
            <Col md={{ span: 5 }}>
            </Col>
            <Col md={{ span: 2 }}>
              <Button variant="outline-secondary" className="float-right" onClick={this.handleResetFilters} >
                Reset Filters
              </Button>
            </Col>
          </Row>
        </div>
        <Table striped bordered hover className="m-1">
          <thead>
            <tr>
              <th onClick={this.handleSortByName}> <FontAwesomeIcon icon={faSort} /> Name  </th>
              <th onClick={this.handleSortByEmail}> <FontAwesomeIcon icon={faSort} />  Email</th>
              <th onClick={this.handleSortByCountry}> <FontAwesomeIcon icon={faSort} />  Country </th>
              <th onClick={this.handleSortByRegisteredAt}> <FontAwesomeIcon icon={faSort} />  Registered at</th>
            </tr>
          </thead>
          <tbody>
            {this
              .props
              .studentStore
              .students
              .map((student) => <tr key={student.id}>
                <td className="w-25">
                  {student.name}
                </td>
                <td>
                  {student.email}
                </td>
                <td>
                  {student.country}
                </td>
                <td>
                  {new Date(Date.parse(student.created_at)).toLocaleDateString()}
                </td>
              </tr>)}
          </tbody>
        </Table>
        <br/><br/>
        <CustomPagination></CustomPagination>
      </div>
    );
  }
}

export default Student;