# Digital Library Management System

## Description
This is a simple project where we created a digital library system. In this, users can register, login, add books, view available books and also borrow and return books.

## Features
- User registration and login
- Add new books
- View all books
- Borrow books
- Return books
- Fine calculation if book is returned late

## Technologies Used
- Node.js
- Express.js
- HTML
- JavaScript
- Postman

## API Endpoints
- POST /auth/register → for user registration  
- POST /auth/login → for login  
- POST /books → to add books  
- GET /books → to view books  
- POST /borrow → to borrow a book  
- POST /borrow/return → to return book  

## Fine Logic
If the book is returned after the due date, a fine of ₹10 per day is charged.

## How to Run
1. Install dependencies using npm install  
2. Run the server using node server.js  
3. Open index.html in browser

Note: Data is stored in-memory, so it resets when the server restarts.
