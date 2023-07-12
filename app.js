require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.json());

const port = process.env.PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const { hashPassword, verifyPassword, verifyToken } = require("./auth");
const userHandlers = require("./userHandlers");

// public routes
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

// routes to protect
app.use(verifyToken);

app.post("/api/movies", verifyToken, movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

// app.post("/api/login", (req, res) => {
//   if (
//     req.body.email === "dwight@theoffice.com" &&
//     req.body.password === "123456"
//   ) {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// });

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
