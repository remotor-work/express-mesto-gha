const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: "Server error." }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res
        .status(404)
        .send({ message: "Пользователь c таким id не найден." });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(400)
          .send({ message: "Введен некорректный id для поиска пользователя." });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.addUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при создании пользователя.",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.patchUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res
        .status(404)
        .send({ message: "Пользователь c указанным _id не найден." });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении пользователя.",
        });
      }
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Пользователь c указанным _id не найден." });
      }
      return res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};

module.exports.patchAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (user) {
        return res.status(200).send(user);
      }
      return res
        .status(404)
        .send({ message: "Пользователь c указанным _id не найден." });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные при обновлении аватара.",
        });
      }
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Пользователь c указанным _id не найден." });
      }
      return res.status(500).send({ message: "Ошибка по умолчанию." });
    });
};
