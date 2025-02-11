const { Router } = require('express');
const dbController = require('../controllers/dbController');
const passport = require('passport');
const dbRouter = Router();

dbRouter.get('/', dbController.getSignUp);
dbRouter.post('/', dbController.validateUser, dbController.postSignUp);

dbRouter.get('/member', dbController.getMemberPage);
dbRouter.post(
  '/member',
  dbController.validateMember,
  dbController.postMemberPage
);
dbRouter.get('/login', dbController.getlogIn);
dbRouter.post(
  '/login',
  dbController.validateMember,
  passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/login',
  })
);

dbRouter.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

dbRouter.get('/message', dbController.getMessage);

dbRouter.get('/newMessage', dbController.getNewMessage);
dbRouter.post('/newMessage', dbController.postNewMessage);

dbRouter.post('/:id/delete', dbController.deleteMessage);
module.exports = dbRouter;
