const express = require("express");
const cors = require("cors");

const app = express();

// JSON data read karne ke liye
app.use(express.json());

//frontend ko backend access dene ke lie
app.use(cors());

// temporary arrays
let books = [];
let borrows = [];

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// register API
app.post("/auth/register", (req, res) => {
  console.log(req.body);

  res.json({
    message: "User registered successfully",
    data: req.body
  });
});

// login API
app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "mansi6.0097@gmail.com" && password === "123456") {
    res.json({
      message: "Login successful"
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials"
    });
  }
});

// add book API
app.post("/books", (req, res) => {
  const book = req.body;

  books.push(book);

  res.json({
    message: "Book added successfully",
    books: books
  });
});

// get all books API
app.get("/books", (req, res) => {
  res.json(books);
});

// borrow API
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

// return book API
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

// server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});