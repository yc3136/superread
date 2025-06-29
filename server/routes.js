const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// TODO: fill in your connection details here
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//               HOME PAGE ROUTES
// ********************************************

// Route 1 (handler) - top 5 books
async function top_5_books(req, res) {
    if (req.query.limitnum) {
        connection.query(`
            WITH popular AS (SELECT book_id, count(*) as counts
            FROM Interactions
            GROUP BY book_id
            ORDER BY counts DESC
            LIMIT ${req.query.limitnum})
            SELECT Books.book_id, title, image_url, average_rating FROM Books
            JOIN popular ON Books.book_id = popular.book_id`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        connection.query(`
            WITH popular AS (SELECT book_id, count(*) as counts
            FROM Interactions
            GROUP BY book_id
            ORDER BY counts DESC
            LIMIT 5)
            SELECT Books.book_id, title, image_url, average_rating FROM Books
            JOIN popular ON Books.book_id = popular.book_id`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } 
}

// Route 2 (handler) - top 5 authors
async function top_5_authors(req, res) {
    if (req.query.limitnum) {
        connection.query(`
            SELECT authorId, name, image_url, average_rate
            FROM Authors
            ORDER BY average_rate DESC 
            LIMIT ${req.query.limitnum}`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        connection.query(`
            SELECT authorId, name, image_url, average_rate
            FROM Authors
            ORDER BY average_rate DESC 
            LIMIT 5`, function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } 
}

// Route 3 (handler) - specific book
async function book(req, res) {
    const bookName = req.query.bookname

    if (req.query.bookname) {
        connection.query(`
            SELECT book_id, title, image_url, authors, average_rating 
            FROM Books
            WHERE title = '${bookName}'
            ORDER BY average_rating DESC`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "The book name is invalid or not found"})
    } 
}

// Route 4 (handler) - specific author
async function author(req, res) {
    const authorName = req.query.authorname

    if (req.query.authorname) {
        connection.query(`
            SELECT authorId, name, image_url, average_rate 
            FROM Authors
            WHERE name = '${authorName}'
            ORDER BY average_rate DESC`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "The author name is invalid or not found"})
    } 
}

// Route 5 (handler) - search books by keywords
async function search_books(req, res) {
    const keyWord = req.query.keyword ? req.query.keyword : ''
    const author = req.query.author ? req.query.author : ''
    const language = req.query.language ? req.query.language : ''
    const RatingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const RatingHigh = req.query.RatingHigh ? req.query.RatingHigh : 5

    try {
        connection.query(`
            SELECT Books.book_id, Books.title, Books.image_url, Authors.name, Books.average_rating 
            FROM Books
            LEFT JOIN Authors ON Books.authors = Authors.authorId
            WHERE Books.title LIKE '%${keyWord}%' AND Authors.name LIKE '%${author}%' AND Books.language_code LIKE '%${language}%'
            AND average_rating >= ${RatingLow} AND average_rating <= ${RatingHigh}
            ORDER BY Books.average_rating DESC`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } catch (e) {
        return res.json({error: "The book keyword is invalid or not found"})
    }
}

// Route 6 (handler) - search authors by keywords
async function search_authors(req, res) {
    const keyWord = req.query.keyword ? req.query.keyword : ''
    const RatingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const RatingHigh = req.query.RatingHigh ? req.query.RatingHigh : 5

    try {
        connection.query(`
            SELECT authorId, name, image_url, average_rate 
            FROM Authors
            WHERE name LIKE '%${keyWord}%' AND average_rate >= ${RatingLow} AND average_rate <= ${RatingHigh}
            ORDER BY average_rate DESC`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } catch (e) {
        return res.json({error: "The author keyword is invalid or not found"})
    } 
}

// ********************************************
//               Book PAGE ROUTES
// ********************************************

// Route 7 (handler) - search book’s basic info:
async function book_basic_info(req, res) {
    const book_id = req.query.book_id

    if (req.query.book_id) {
        connection.query(`
            SELECT isbn,
                country_code,
                language_code,
                is_ebook,
                average_rating,
                description,
                format,
                link,
                publisher,
                num_pages,
                publication_year,
                Books.image_url,
                title,
                Authors.name,
                Authors.authorId
            FROM Books
                LEFT JOIN Authors
                    ON Books.authors = Authors.authorId
            WHERE book_id = '${book_id}';`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "book_id is invalid or not found"})
    } 
}


// Route 8 (handler) - search book’s reviews:
async function book_top_reviews(req, res) {
    const book_id = req.query.book_id

    if (req.query.book_id) {
        connection.query(`
            SELECT Reviews.rating, Reviews.review_text, Reviews.date_added
            FROM Books
                    JOIN Reviews ON Books.book_id = Reviews.book_id
            WHERE Books.book_id = '${book_id}'
            ORDER BY Reviews.n_votes DESC
            LIMIT 10;`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "book_id is invalid or not found"})
    } 
}


// Route 12 (handler) - search similar books
async function similar_books(req, res) {
    const book_id = req.query.book_id
    if (req.query.book_id) {
        connection.query(`
            SELECT Books.book_id, Books.title, Books.image_url, Books.average_rating, Authors.name
            FROM Books
                JOIN Authors ON Books.authors = Authors.authorId
            WHERE Books.book_id in (
                SELECT similar_book FROM SimilarBooks WHERE book_id = '${book_id}'
            )
            ORDER BY Books.average_rating DESC
            LIMIT 10;`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "book_id is invalid or not found"})
    } 
}

// ********************************************
//               Author PAGE ROUTES
// ********************************************


// Route 9 (handler) - search Basic info of author:
async function author_basic_info(req, res) {
    const author_id = req.query.author_id
    if (req.query.author_id) {
        connection.query(`
            SELECT name,
                workcount,
                fan_count,
                gender,
                image_url,
                about,
                born,
                died,
                average_rate,
                genre,
                original_hometown,
                country
            FROM Authors
            WHERE authorId = '${author_id}';`, 
            function (error, results, fields) {
                if (error) {
                    console.log(error)
                    res.json({ error: error })
                } else if (results) {
                    res.json({ results: results })
                }
        });
    } else {
        return res.json({error: "author_id is invalid or not found"})
    } 
}

// Route 10 (handler) - Top ten popular books by author:
async function author_top_books(req, res) {
    const author_id = req.query.author_id
    if (req.query.author_id) {
        connection.query(`
        SELECT Books.book_id, Books.title, COUNT(*) AS peopleRead, Books.image_url, Books.average_rating
            FROM Authors
            JOIN Books ON Authors.authorId = Books.authors
            LEFT JOIN Interactions ON Interactions.book_id = Books.book_id
            WHERE Authors.authorId = '${author_id}'
            AND Interactions.is_read = 'True'
            GROUP BY Books.book_id
            ORDER BY peopleRead DESC`, 
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
        });
    } else {
        return res.json({error: "author_id is invalid or not found"})
    } 
}

// ********************************************
//               BookCatalog Page ROUTES
// ********************************************

// Route 11 (handler) - book catelog:
async function book_cateloge(req, res) {
    connection.query(`
        SELECT Books.book_id, Books.image_url, Books.title, Authors.name
        FROM Books
        LEFT JOIN Authors ON Books.authors = Authors.authorId;`, 
        function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })
            }
    });
}

module.exports = {
    top_5_books,
    top_5_authors,
    book,
    author,
    search_books,
    search_authors,
    book_basic_info,
    book_top_reviews,
    author_basic_info,
    author_top_books,
    book_cateloge,
    similar_books
}