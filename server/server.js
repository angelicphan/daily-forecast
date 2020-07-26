const path = require("path");
const express = require("express");
const app = express();
const port = process.abort.env.PORT || 3000;
const publicPath = path.join(__dirname, "..", "public");

// Tell Express which files to serve
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log("Port: ", port);
});
