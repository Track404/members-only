const db = require('../db/query');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const lengthErr = 'must be between 1 and 20 characters.';
const alphaERR = 'must be only characters';
const emailERR = 'must be a valid email(example: name@gmail.com)';
const emptyERR = 'must not be empty';
const validateUser = [
  body('firstName')
    .trim()
    .isAlpha()
    .withMessage(`Firstname ${alphaERR}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`Firstname ${lengthErr}`),
  body('lastName')
    .trim()
    .isAlpha()
    .withMessage(`lastName ${alphaERR}`)
    .isLength({ min: 1, max: 20 })
    .withMessage(`lastName ${lengthErr}`),
  body('email')
    .trim()
    .notEmpty()
    .withMessage(`Email ${emptyERR}`)
    .isEmail()
    .withMessage(`Email ${emailERR}`)
    .custom(async (value) => {
      console.log('Checking email:', value); // Log the email being checked
      const existingUser = await db.findEmail(value);
      console.log('Existing User:', existingUser); // Log the result from the query
      if (existingUser) {
        console.log('User already exists!');
        throw new Error('A user already exists with this e-mail address');
      }
      return true;
    }),

  body('password')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage(`password ${lengthErr}`),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('password do not match');
    }
    return true;
  }),
];

async function getSignUp(req, res) {
  res.render('signUp');
}

async function postSignUp(req, res) {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signUp', {
      errors: errors.array(),
    });
  }
  await db.insertUser(firstName, lastName, email, hashedPassword);
}
module.exports = {
  validateUser,
  getSignUp,
  postSignUp,
};
