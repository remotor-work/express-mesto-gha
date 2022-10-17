const Card = require("../models/cardModel"); // создали роутер
const mongoose = require("mongoose");

const createCard = (req, res) => {
  const { name, link } = req.body;
  console.log("_id станет доступен - ", req.user._id); // _id станет доступен
  Card.create({ name, link, likes: req.user._id, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).send({ message: "Error validation - ", err });
        return;
      }
      return res.status(500).send({ message: err.message });
    });
};

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById({ _id: cardId })
    .orFail(() => {
      throw new ErrorNotFound("Такой карточки не существует");
    })
    .then((card) => {
      if (card.owner.toString() !== userId) {
        throw new ErrorForbidden("Вы не можете удалять чужие карточки");
      }
      return Card.findByIdAndRemove(card._id);
    })
    .then((card) => {
      res.send({ message: "Успешно удалена карточка:", data: card });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

const deleteLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => {
      throw new ErrorNotFound("Такой карточки не существует");
    })
    .then((card) => res.send(card))
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => {
      throw new ErrorNotFound("Такой карточки не существует");
    })
    .then((card) => res.send(card))
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

//!!!!!!!!!!!!!!!!!!!

module.exports = {
  createCard,
  getCards,
  deleteCard,
  deleteLike,
  putLike,
};

// const createCard = async (req, res) => {

//     const { name, link } = req.body;

//     Card.create({ name, link, owner: { _id: "6349e25ea0300e5d282d2201" } }) //   console.log(req.user._id); // _id станет доступен
//       .then((card) => res.send(card))
//       .catch((err) => {
//         if (err instanceof mongoose.Error.ValidationError) {
//           res.status(400).send({ message: "Error validation - ", err });
//           return;
//         }
//         return res.status(500).send({ message: err.message });
//       });
//   };

// module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
//     { new: true },
//   )

// module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
//     req.params.cardId,
//     { $pull: { likes: req.user._id } }, // убрать _id из массива
//     { new: true },
//   )

// Создайте контроллеры и роуты для карточек
// Реализуйте три роута:
// GET /cards — возвращает все карточки
// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
// В теле POST-запроса на создание карточки передайте JSON-объект с двумя полями: name и link.

//В файле app.js создайте вот такой мидлвэр:
// Она добавляет в каждый запрос объект user. Берите из него идентификатор
//пользователя в контроллере создания карточки:

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };
