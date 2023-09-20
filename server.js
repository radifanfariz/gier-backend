const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require("./app/models");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// var corsOptions = {
//   origin: "http://localhost:8080"
// };
let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

//////considered deprecated//////
// parse requests of content-type - application/json
// app.use(express.json());
// app.use(bodyParser.json()); //alternative
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true })); //alternative
///////////////

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

// routes of api GIER SalesActivity
require("./app/routes/salesactivity.route")(app);
// routes of api GIER Favorite Filter
require("./app/routes/favoritefilter.route")(app);

////considered deprecated////
// require("./app/routes/sfo/pm-monthly/pm.otomotif.route")(app);
/////////////////////////////////////

// set port, listen for requests
const PORT = process.argv[2] || 7777;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
