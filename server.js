const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

const User = require("./models/User");
const Book = require("./models/Book");
const Borrow = require("./models/Borrow");

const app = express();

app.use(express.json());
app.use(cors());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Register
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  await User.create({ name, email, password });

  res.json({ message: "User registered successfully" });
});

// Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email, password }
  });

  if (user) {
    res.json({ message: "Login successful" });
  } else {
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// Add Book
app.post("/books", async (req, res) => {
  const { title, author, category } = req.body;

  await Book.create({ title, author, category });

  res.json({ message: "Book added successfully" });
});

// Get Books
app.get("/books", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

// Borrow
app.post("/borrow", async (req, res) => {
  const { name, bookTitle, issueDate, dueDate } = req.body;

  await Borrow.create({
    name,
    bookTitle,
    issueDate,
    dueDate,
    returnDate: null,
    fine: 0
  });

  res.json({ message: "Book borrowed successfully" });
});

// Return
app.post("/borrow/return", async (req, res) => {
  const { name, bookTitle, returnDate } = req.body;

  const borrow = await Borrow.findOne({
    where: { name, bookTitle, returnDate: null }
  });

  if (!borrow) {
    return res.status(404).json({ message: "Borrow record not found" });
  }

  const due = new Date(borrow.dueDate);
  const ret = new Date(returnDate);

  let fine = 0;

  if (ret > due) {
    const lateDays = Math.ceil((ret - due) / (1000 * 60 * 60 * 24));
    fine = lateDays * 10;
  }

  borrow.returnDate = returnDate;
  borrow.fine = fine;

  await borrow.save();

  res.json({
    message: "Book returned successfully",
    fine
  });
});

sequelize.sync({ force: true }).then(() => {
  console.log("Tables recreated");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});