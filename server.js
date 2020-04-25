// Dependencies
const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const port = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes")(app)
require("./routes/htmlRoutes")(app)

app.listen(port, function() {
    console.log(`server is on port: ${port}`)
});