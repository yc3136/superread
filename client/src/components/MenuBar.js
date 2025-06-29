import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Form, FormInput, FormGroup, Button, FormControl
  } from "shards-react";

import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Slider
} from 'antd';

import {getBooksByKeyword,getAuthorsByKeyword} from '../fetcher'

class MenuBar extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          bookQuery: '',
          authorQuery: '',
      }

      this.goToBookCatalog = this.goToBookCatalog.bind(this)
      this.goToAuthorCatalog = this.goToAuthorCatalog.bind(this)
      this.handleBookQueryChange = this.handleBookQueryChange.bind(this)
      this.handleAuthorQueryChange = this.handleAuthorQueryChange.bind(this)
    }

    goToBookCatalog() {
      window.location = `/search/books?keyword=${this.state.bookQuery}`
    }

    goToAuthorCatalog() {
      window.location = `/search/authors?keyword=${this.state.authorQuery}`
    }

    handleBookQueryChange(event) {
      this.setState({ bookQuery: event.target.value })
    }
  
    handleAuthorQueryChange(event) {
      this.setState({ authorQuery: event.target.value })
    }

    render() {
        return(
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">Super Read</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/home">Home <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/search/books">Books <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/search/authors">Authors <span class="sr-only">(current)</span></a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Title of Book" aria-label="Search" value={this.state.bookQuery} onChange={this.handleBookQueryChange}/>
                <button class="btn btn-outline-success my-2 my-sm-0 mr-sm-2" type="button" onClick={this.goToBookCatalog}>Get Book</button>
                <input class="form-control mr-sm-2" type="search" placeholder="Name of Author" aria-label="Search" value={this.state.authorQuery} onChange={this.handleAuthorQueryChange}/>
                <button class="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.goToAuthorCatalog}>Get Author</button>
              </form>
            </div>
          </nav>
        )
    }
}

export default MenuBar
