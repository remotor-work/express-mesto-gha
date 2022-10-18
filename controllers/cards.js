const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (card) {
        return res.status(200).send({ card });
      }
      return res
        .status(404)
        .send({ message: 'Карточка c таким id не найдена.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Введен некорректный id для поиска карточки.' });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return null;
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные при создании карточки.',
        });
      }
      return res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId, { runValidators: true })
    .then((card) => {
      if (card) {
        return res.status(200).send({ message: 'DELETED' });
      }
      return res
        .status(404)
        .send({ message: 'Карточка c указанным _id не найдена.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res
          .status(400)
          .send({ message: 'Некорректный _id для поиска карточки.' });
      }
      return res.status(500).send({ message: 'Server error.' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card.likes);
      }
      return res
        .status(404)
        .send({ message: 'Передан несуществующий _id карточки.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятия лайка.',
        });
      }
      return res.status(500).send({ message: 'Server error.' });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card.likes);
      }
      return res
        .status(404)
        .send({ message: 'Передан несуществующий _id карточки.' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(400).send({
          message: 'Переданы некорректные данные для постановки/снятия лайка.',
        });
      }
      return res.status(500).send({ message: 'Server error.' });
    });
};
