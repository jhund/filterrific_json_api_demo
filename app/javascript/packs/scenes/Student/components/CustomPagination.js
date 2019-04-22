import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Pagination} from 'react-bootstrap';

import {Form} from 'react-bootstrap';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.css';

@inject('studentStore', 'countryStore', 'paginationStore')
@observer class CustomPagination extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickPrevious = this
      .handleClickPrevious
      .bind(this);
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleClickNext = this
      .handleClickNext
      .bind(this);
  }

  handleClickPrevious() {
    let previousPage = 0;
    let currentPage = parseInt(this.props.current_page);
    if (currentPage <= 1) {
      previousPage = currentPage;
    } else {
      previousPage = currentPage - 1;
    }
    this
      .props
      .studentStore
      .download(this.props.paginationStore.current_query, previousPage);
  }

  handleClick(event) {
    const page = event.currentTarget.textContent;
    this
      .props
      .studentStore
      .download(this.props.paginationStore.current_query, page);
  }

  handleClickNext() {
    let nextPage = 0;
    let currentPage = parseInt(this.props.paginationStore.current_page);
    if (currentPage >= this.props.paginationStore.number_of_pages) {
      nextPage = currentPage;
    } else {
      nextPage = currentPage + 1;
    }
    this
      .props
      .studentStore
      .download(this.props.paginationStore.current_query, nextPage);
  }

  componentDidMount() {}

  render() {
    let previous = null;
    let next = null;

    if (this.props.paginationStore.previous_page == true) {
      previous = <Pagination.Prev onClick={this.handleClickPrevious}/>
    }
    if (this.props.paginationStore.next_page == true) {
      next = <Pagination.Next onClick={this.handleClickNext}/>
    }

    return (
      <div>
        <Pagination>
          {previous}
          {this
            .props
            .paginationStore
            .pages
            .map((page) =>
            page.visible && <Pagination.Item
                key={page.index}
                active={page.active === true}
                onClick={this.handleClick}>
                {page.index}
              </Pagination.Item>
            )}
          {next}
        </Pagination>
      </div >
    );
  }
}

export default CustomPagination;