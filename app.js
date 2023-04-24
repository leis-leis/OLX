const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const passport = require("passport");

const app = express();

const port = 3000;

//middleware
//dane z formularzy
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
require("./config/passport")(passport);

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(`COULDN'T CONNECT TO DATABASE ${err}`);
  });

const reports = require("./routes/api/reports");
app.use("/api/reports", reports);

const users = require("./routes/api/users");
app.use("/api/users", users);

const categories = require("./routes/api/categories");
app.use("/api/categories", categories);

const offers = require("./routes/api/offers");
app.use("/api/offers", offers);



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
