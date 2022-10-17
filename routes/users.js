// Создайте контроллеры и роуты для пользователей
// Реализуйте три роута:
// GET /users — возвращает всех пользователей
// GET /users/:userId - возвращает пользователя по _id
// POST /users — создаёт пользователя
// В теле POST-запроса на создание пользователя передайте JSON-объект с тремя полями: name, about и avatar.
const router = require("express").Router(); // создали роутер
const userModel = require("../models/userModel"); // создали роутер
const mongoose = require("mongoose");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require("../controllers/userController");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", createUser);

// PATCH /users/me — обновляет профиль
// PATCH /users/me/avatar — обновляет аватар

router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

// экспортировали роутер
module.exports = router;
