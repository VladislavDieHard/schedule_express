const express = require('express');
const router = express.Router();
const auth = require('../modules/auth_module');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const token = req.cookies.token;
  console.log(token)

  if (token !== undefined && null) {
    const authenticated = await auth.authUser(token);
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
  const token = await auth.auth(user);

  if (token !== null) {
    res.send(token);
  } else {
    res.send(null);
  }
});

module.exports = router;
