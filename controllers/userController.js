// Создайте контроллеры и роуты для пользователей
// Реализуйте три роута:
// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.
const User = require("../models/userModel"); // создали роутер
const mongoose = require("mongoose");

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).send({ message: "Error validation - ", err });
      return;
    }
    return res.status(500).send({ message: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error("NotFound"))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "there is no user" });
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "wrong format id", err });
        return;
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log("!!!!!!!!!!!!!!", name, about, avatar, req.user._id);
  User.findByIdAndUpdate(req.user._id, { name, about, avatar })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "there is no user" });
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "wrong format id", err });
        return;
      }
      return res.status(500).send({ message: err.message });
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(() => {
      throw new ErrorNotFound("Пользователь не найден");
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.message === "NotFound") {
        return res.status(404).send({ message: "there is no user" });
      }
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({ message: "wrong format id", err });
        return;
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
};
