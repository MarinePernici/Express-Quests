// const validateMovie = (req, res, next) => {
//   // validate req.body then call next() if everything is ok
//   const { title, director, year, color, duration } = req.body;
//   const errors = [];

//   if (title == null) {
//     errors.push({ field: "title", message: "The field 'title' is required" });
//   } else if (title.length > 50) {
//     errors.push({
//       field: "title",
//       message: "The field 'title' must be less than 50 characters",
//     });
//   }
//   if (director == null) {
//     errors.push({
//       field: "director",
//       message: "The field 'director' is required",
//     });
//   }
//   if (year == null) {
//     errors.push({ field: "year", message: "The field 'year' is required" });
//   }
//   if (color == null) {
//     errors.push({ field: "color", message: "The field 'color' is required" });
//   }
//   if (duration == null) {
//     errors.push({
//       field: "duration",
//       message: "The field 'duration' is required",
//     });
//   }

//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string().email().max(255).required(),
  firstname: Joi.string().min(3).max(30).required(),
  lastname: Joi.string().min(3).max(30).required(),
  city: Joi.string().min(3).max(30).required(),
  language: Joi.string().min(3).max(30).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

const movieSchema = Joi.object({
  title: Joi.string().max(255).required(),
  director: Joi.string().max(100).required(),
  year: Joi.string().max(4).min(4).required(),
  color: Joi.string().length(1).required(),
  duration: Joi.number().integer().positive().max(1000).required(),
});

const validateMovie = (req, res, next) => {
  const { title, director, year, color, duration } = req.body;

  const { error } = movieSchema.validate(
    { title, director, year, color, duration },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = {
  validateMovie,
  validateUser,
};
