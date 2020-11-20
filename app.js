const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");

const registerPatient = require('./controllers/registerPatient');
const signin = require('./controllers/signin');

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "test",
    database: "the-hams",
  },
});

db.select("*")
  .from("users")
  .then((data) => {
    console.log(data);
  });

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("register");
});

app.get("/signup", (req, res) => {
    res.render("signup");
  });

app.post('/signup', (req, res) => {signin.handleSignin(req, res, db, bcrypt)});

app.post("/register-as-patient", (req, res) => {registerPatient.handlePatient(req, res, db, bcrypt)});

app.listen(3000, function () {
  console.log("Server started at port 3000.");
});
