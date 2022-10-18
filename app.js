const express = require("express");
const mongoose = require("mongoose");
const { PORT = 3000 } = process.env;
const users = require("./routes/users");
const cards = require("./routes/cards");
const app = express();

mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6349e25ea0300e5d282d2201",
  };

  next();
});

app.use("/users", users);
app.use("/cards", cards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
