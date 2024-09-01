const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const port = 3050;
const SECURITY_KEY = "SECURITY_KEY";
const allTodosRoute = require("./operations/allTodo");
const completedTodosRoute = require("./operations/completedTodo");
const failedTodosRoute = require("./operations/faliledTodos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/allTodos", allTodosRoute);
app.use("/completedTodos", completedTodosRoute);
app.use("/failedTodos", failedTodosRoute);

app.post("/newuser", async (req, res) => {
  const credentials = {
    name: req.body.name,
    password: req.body.password,
  };

  jwt.sign(credentials, SECURITY_KEY, { expiresIn: "1h"}, (err, token) => {
    if (err) {
      res.json({ message: "Error in token generation" });
    } else {
      res.json({ message: "Token generated successfully", token });
    }
  });
});

app.post("/login", async (req, res) => {
  const token = req.headers["authorization"];
  const credential = { name: req.body.name, password: req.body.password };
  console.log(token);
  jwt.verify(token.split(" ")[1], SECURITY_KEY, (err, decoded) => {
    if (err) {
      res.json({ invalidmessage: "token verify failed" });
    } else {
      
      if (
        decoded.name !== credential.name ||
        decoded.password !== credential.password
      ) {
        res.json({ invalidmessage: "Invalid username or password" });
      } else {
        res.json({ message: "Successfully login", decoded });
      }
    }
  });
});

app.get("/", (req, res) => {
  res.json({ Response: "App is running successfully" });
});

app.listen(port, () => {
  console.log(`Server is runnning in port ${port}`);
});

