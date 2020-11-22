const express = require("express");
const { postgraphile } = require("postgraphile");
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const path = require("path");
const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL, {
    watchPg: process.env.NODE_ENV !== "production",
    graphiql: process.env.NODE_ENV !== "production",
    enhanceGraphiql: process.env.NODE_ENV !== "production",
  })
);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
);
app.listen(process.env.PORT || 5000);
