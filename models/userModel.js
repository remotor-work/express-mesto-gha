// Создайте схемы и модели
// В проекте две сущности: пользователь и карточки. Создайте схему и модель для каждого.
// Поля схемы пользователя:
// name — имя пользователя, строка от 2 до 30 символов, обязательное поле;
// about — информация о пользователе, строка от 2 до 30 символов, обязательное поле;
// avatar — ссылка на аватарку, строка, обязательное поле. В следующем спринте вы напишите собственное решение для валидации этого поля.

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
});

// создаём модель и экспортируем её
module.exports = mongoose.model("user", userSchema);
