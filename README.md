
# SuperRead 📚

SuperRead is a full-stack web application for exploring, analyzing, and discovering comic books and their authors. It allows users to search for comic books and authors, read reviews, discover similar works, and receive surprising recommendations that encourage stepping outside their reading comfort zone.

---

## 🚀 Features

- 🔎 **Book & Author Search**: Filter by title, author, language, rating, and more
- 🌟 **Top-Rated & Most Popular**: View top books and authors based on real user interactions
- 🤖 **Surprise Me**: Break out of your algorithmic bubble with randomized, high-quality recommendations
- 📖 **Book Details**: Access detailed info, reviews, and similar titles for each book
- ✍️ **Author Pages**: View author bios and their most popular works

---

## 🧱 Tech Stack

**Frontend**
- React.js
- Shards React & Ant Design
- JavaScript, HTML, CSS

**Backend**
- Node.js + Express.js
- RESTful APIs with custom query logic
- MySQL (hosted on AWS RDS)

**Data Processing**
- Python + Pandas
- Preprocessing of large-scale book and author datasets

---

## 🧠 Architecture

Two-tier client-server model:

1. **Client (React)** handles user interface, search input, and rendering book/author information
2. **Server (Node/Express)** receives requests, queries the MySQL database, and returns filtered and processed results

---

## 📊 Data Sources

- UCSD BookGraph (comics & graphic subset): metadata, reviews, user interaction
- Goodreads Author Dataset (via Kaggle): author bios and stats

Over 1.4 million rows of interaction data and 100,000+ books were processed, cleaned, and imported into MySQL.

---

## 🔍 Example Use Cases

- **Search for “Batman” comics by highly rated authors**
- **View top 5 authors from Canada**
- **Discover similar books to your childhood favorite**
- **Read the most upvoted reviews on a book before buying**
- **Get a “Surprise Me” pick that’s random but curated**

---

## ⚙️ Performance Optimization

We implemented:
- Query rewriting to push down filters and reduce join sizes
- Indexing and composite indexes for high-traffic queries
- Refactoring of outer joins into inner joins to improve MySQL optimization

---

## 🧪 Example API Endpoints

```http
GET /top5books
GET /search/books?keyWord=batman&RatingLow=4&RatingHigh=5
GET /search/authors?country=Canada
GET /search/books/similarbooks?book_id=2879
```

Each endpoint returns clean JSON arrays for dynamic frontend rendering.

---

## 👩‍💻 My Role

This project was originally developed as a team effort. I contributed to:
- Data pipeline design and data cleaning (Python, Pandas)
- Backend API logic and query optimization (Express + MySQL)
- Frontend debugging and UI cleanup (React, CSS)
- Final styling, responsive design, and troubleshooting cross-browser issues

---

## 🛠 Improvements in Progress (2025)

- Migrating backend to Flask for personal deployment and ownership
- Dockerizing the application for reproducible builds
- Adding unit tests for backend and frontend
- Improving responsiveness and accessibility
- Deploying a live demo with a subset of the database

---

## 🤝 Acknowledgments

Originally developed in collaboration with a small team of student engineers. This fork represents my continued work on the project and its modernization.

