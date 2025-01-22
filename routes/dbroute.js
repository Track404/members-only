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
  passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/',
  })
);

dbRouter.get('/message', (req, res) => {
  if (req.isAuthenticated()) {
    // User is authenticated, so pass the user data to the view
    console.log(req.user); // Logs the authenticated user object
    res.render('message', { user: req.user }); // Renders the message view with user data
  } else {
    // User is not authenticated, redirect to login page or show an error
    res.redirect('/login');
  }
});
module.exports = dbRouter;
