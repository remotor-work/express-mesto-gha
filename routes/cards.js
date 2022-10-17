// Создайте контроллеры и роуты для карточек
// Реализуйте три роута:
// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.

const router = require("express").Router(); // создали роутер
const userModel = require("../models/userModel"); // создали роутер
const mongoose = require("mongoose");

const {
  createCard,
  getCards,
  deleteCard,
  deleteLike,
  putLike,
} = require("../controllers/cardController");

router.get("/", getCards);
router.delete("/:cardId", deleteCard);
router.post("/", createCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
// DELETE /cards/:cardId/likes — убрать лайк с карточки

router.delete("/:cardId/likes", deleteLike);
router.put("/:cardId/likes", putLike);

// экспортировали роутер
module.exports = router;
