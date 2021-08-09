const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const token = req.cookies.token;

  if (token !== undefined) {
    const authenticated = await auth.authToken(token);
    if (authenticated.verify) {
      res.redirect('/schedule');
    } else {
      res.render('index', { title: 'Войдите в систему' });
    }
  } else {
    res.render('index', { title: 'Войдите в систему' });
  }
});

router.post('/', async function(req, res, next) {
  const user = req.body;
  console.log(user)
  const token = await auth.auth(user);
  console.log(token)

  if (token !== null) {
    res.send(token);
  } else {
    res.send(null);
  }
});

module.exports = router;
