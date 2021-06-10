const express = require('express');
const router = express.Router();
const auth = require('../auth_module');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Расписание' });
});

router.post('/', async function(req, res, next) {
  const user = req.body;
  const token = await auth.auth(user);

  if (token !== null) {
    res.send(`/schedule?token=${token}`);
  } else {
    res.send('err');
  }
});

module.exports = router;
