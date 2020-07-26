const path = require("path");
const express = require("express");
const app = express();
const port = process.abort.env.PORT || 3000;
const buildPath = path.join(__dirname, "build");

// Tell Express which files to serve
app.use(express.static(buildPath));

// Tell it to use index.html
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
  console.log("Port: ", port);
});
