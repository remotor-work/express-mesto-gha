// Здесь функциональность точки входа
const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3000, MONGO_URL = "mongodb://localhost:27017/mestodb" } =
  process.env;
const app = express();

app.use(express.json()); //insted body parser (req.body) ??????? do i need?!! // Without `express.json()`, `req.body` is undefined.

//подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Здесь роутинг
app.use("/users", (req, res, next) => {
  req.user = {
    _id: "6349e25ea0300e5d282d2201", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log("gdfsgdfhsgjkhdfsjkghdfjksghdfjksgh");
  next();
});

app.use("/users", require("./routes/users"));

app.use("/cards", (req, res, next) => {
  req.user = {
    _id: "6349e25ea0300e5d282d2201", // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  console.log("gdfsgdfhsgjkhdfsjkghdfjksghdfjksgh");
  next();
});

app.use("/cards", require("./routes/cards"));

//!!!!!!!!! В файле app.js создайте вот такой мидлвэр:
//Это временное решение. Мы захардкодили идентификатор пользователя, поэтому кто бы ни создал карточку, в базе у неё будет один и тот же автор. Ничего страшного — исправим это в следующем спринте.
// app.use((req, res, next) => {
//   req.user = {
//     _id: "6349e25ea0300e5d282d2201", // вставьте сюда _id созданного в предыдущем пункте пользователя
//   };

//   next();
// });
//!!!!!!!!!

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
