const express = require("express");

const app = express();

app.use(express.json());

// Data storage (in-memory)
let users = [];
let books = [];
let borrows = [];

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Register API
app.post("/auth/register", (req, res) => {
  const user = req.body;

  users.push(user);

  res.json({
    message: "User registered successfully",
    users: users
  });
});

// Login API (multiple users)
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    res.json({
      message: "Login successful"
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials"
    });
  }
});

// Add Book API
app.post("/books", (req, res) => {
  const book = req.body;

  books.push(book);

  res.json({
    message: "Book added successfully",
    books: books
  });
});

// Get Books API
app.get("/books", (req, res) => {
  res.json(books);
});

// Borrow API
app.post("/borrow", (req, res) => {
  const { name, bookTitle, issueDate, dueDate } = req.body;

  const borrow = {
    name,
    bookTitle,
    issueDate,
    dueDate,
    returnDate: null,
    fine: 0
  };

  borrows.push(borrow);

  res.json({
    message: "Book borrowed successfully",
    borrow
  });
});

// Return API
app.post("/borrow/return", (req, res) => {
  const { name, bookTitle, returnDate } = req.body;

  const borrow = borrows.find(
    b => b.name === name && b.bookTitle === bookTitle && b.returnDate === null
  );

  if (!borrow) {
    return res.status(404).json({
      message: "Borrow record not found"
    });
  }

  borrow.returnDate = returnDate;

  const due = new Date(borrow.dueDate);
  const ret = new Date(returnDate);

  let fine = 0;

  if (ret > due) {
    const lateDays = Math.ceil((ret - due) / (1000 * 60 * 60 * 24));
    fine = lateDays * 10;
  }

  borrow.fine = fine;

  res.json({
    message: "Book returned successfully",
    fine,
    borrow
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});