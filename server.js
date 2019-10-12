const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 8080;
const fs = require("fs");
const sequelize = require("sequelize");
const db = require("./models");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/user-api-routes.js")(app);

db.sequelize
  .sync({ force: true })
  .then(() =>
    app.listen(process.env.PORT || 3000, () =>
      console.log("Listening on port %s", PORT)
    )
  );

module.exports = app;
