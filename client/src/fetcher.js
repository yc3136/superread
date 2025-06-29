import config from './config.json'

// Route 1 (handler) - top 5 books
const getTop5Books = async (limitnum) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top5books?limitnum=${limitnum}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 2 (handler) - top 5 authors
const getTop5Authors = async (limitnum) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/top5authors?limitnum=${limitnum}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 3 (handler) - specific book
const getBookByName = async (bookname) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book?bookname=${bookname}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 4 (handler) - specific author
const getAuthorByName= async (authorname) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/author?authorname=${authorname}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 5 (handler) - search books
const getBooksByKeyword = async (keyword, language, author, rating_low, rating_high) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/books?keyword=${keyword}&language=${language}&author=${author}&RatingLow=${rating_low}&RatingHigh=${rating_high}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 6 (handler) - search authors by keywords
const getAuthorsByKeyword = async (keyword, rating_low, rating_high) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/authors?keyword=${keyword}&RatingLow=${rating_low}&RatingHigh=${rating_high}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 7 - register as GET
const getBookPageInfo = async (book_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/books/basic_info?book_id=${book_id}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 8
const getBookReviews = async (book_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/books/reviews?book_id=${book_id}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 9
const getAuthorPageInfo = async (author_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/authors/basic_info?author_id=${author_id}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 10
const getAuthorTopBooks = async (author_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/authors/top_books?author_id=${author_id}`, {
        method: 'GET',
    })
    return res.json()
}

// Route 11
const getBookCatalogs = async () => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/book_cateloge`, {
        method: 'GET',
    })
    return res.json()
}

// Route 12
const getSimilarBooks = async (book_id) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/search/books/similarbooks?book_id=${book_id}`, {
        method: 'GET',
    })
    return res.json()
}


export {
    getTop5Books,
    getTop5Authors,
    getBookByName,
    getAuthorByName,
    getBooksByKeyword,
    getAuthorsByKeyword,
    getBookPageInfo,
    getBookReviews,
    getAuthorPageInfo,
    getAuthorTopBooks,
    getBookCatalogs,
    getSimilarBooks
}