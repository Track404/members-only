const { Router } = require('express');
const dbController = require('../controllers/dbController');
const dbRouter = Router();

dbRouter.get('/', dbController.getSignUp);
dbRouter.post('/', dbController.validateUser, dbController.postSignUp);
module.exports = dbRouter;
