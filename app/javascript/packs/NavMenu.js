import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Navbar, NavDropdown, Nav} from "react-bootstrap";
import {Button, Form, FormControl} from "react-bootstrap";

@inject('studentStore', 'countryStore', 'paginationStore')
@observer class NavMenu extends Component
{
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div >
        <Navbar bg="light" expand="lg" className="m-5">
          <Navbar.Brand href="#home">Filterrific JSON</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#students">Students</Nav.Link>
              <Nav.Link href="http://filterrific.clearcove.ca/">Documentation</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default NavMenu;