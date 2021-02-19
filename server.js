const express = require("express");
const app = express();

//Environment Variables
require("dotenv").config();
const MONGO_URI = process.env.URI;

//Connecting MongoDB
const mongoose = require("mongoose");
mongoose.connect(MONGO_URI, {
  useNewUrlParser: !0,
  useUnifiedTopology: !0,
  useCreateIndex: 1,
});

//View Engine & Static File Routing
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));

//Parsing Body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Express-Session Config
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 },
  })
);

app.use("/", require("./routes/Home.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));
