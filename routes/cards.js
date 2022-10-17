const cards = require("express").Router();
const {
  getCards,
  getCard,
  postCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

cards.get("/", getCards);
cards.get("/:id", getCard);
cards.post("/", postCard);
cards.delete("/:cardId", deleteCard);
cards.put("/:cardId/likes", likeCard);
cards.delete("/:cardId/likes", dislikeCard);

module.exports = cards;
