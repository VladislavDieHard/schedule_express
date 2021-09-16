const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const token = req.cookies.token;

  if (token !== undefined && token !== null) {
    const authenticated = await auth.authUser(token);

    if (authenticated.verify) {
      res.redirect('/redirect');
    } else {
      res.render('index', { title: 'Войдите в систему' });
    }
  } else {
    res.render('index', { title: 'Войдите в систему' });
  }
});

router.post('/', async function(req, res, next) {
  const user = req.body;
  const authObj = await auth.auth(user);

  if (authObj !== null) {
    res.send(authObj);
  } else {
    res.send(null);
  }
});

module.exports = router;
