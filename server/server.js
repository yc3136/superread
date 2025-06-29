const express = require('express');
const mysql      = require('mysql');
var cors = require('cors')


const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

// Route 1 - register as GET 
app.get('/top5books', routes.top_5_books)

// Route 2 - register as GET 
app.get('/top5authors', routes.top_5_authors)

// Route 3 - register as GET 
app.get('/book', routes.book)

// Route 4 - register as GET 
app.get('/author', routes.author)

// Route 5 - register as GET 
app.get('/search/books', routes.search_books)

// Route 6 - register as GET 
app.get('/search/authors', routes.search_authors)

// Route 7 - register as GET
app.get('/search/books/basic_info', routes.book_basic_info)

// Route 8
app.get('/search/books/reviews', routes.book_top_reviews)

// Route 9 - register as GET
app.get('/search/authors/basic_info', routes.author_basic_info)

// Route 10 - register as GET
app.get('/search/authors/top_books', routes.author_top_books)

// Route 11 - register as POST
app.get('/book_cateloge', routes.book_cateloge)

// Route 12
app.get('/search/books/similarbooks', routes.similar_books)

app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;
