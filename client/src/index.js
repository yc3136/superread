import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import HomePage from './pages/HomePage';
import AuthorPage from './pages/AuthorPage';
import AuthorSearchPage from './pages/AuthorSearchPage';
import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import BookPage from './pages/BookPage';
import BookSearchPage from './pages/BookSearchPage';
import LandingPage from './pages/LandingPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/home"
							render={() => (
								<HomePage />
							)}/>
		<Route exact
							path="/"
							render={() => (
								<LandingPage />
							)}/>
        <Route exact
							path="/search/authors"
							render={() => (
								<AuthorSearchPage />
							)}/>
        <Route exact
							path="/search/books"
							render={() => (
								<BookSearchPage />
							)}/>
		<Route exact
							path="/books"
							render={() => (
								<BookPage />
							)}/>
		<Route exact
							path="/authors"
							render={() => (
								<AuthorPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

