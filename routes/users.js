const express = require('express');
const router = express.Router();

const users = [];
/* Add a new cat object to the users array */
router.get('/', function(req, res, next) {
  res.send(users);
});

router.post('/', function(req, res, next) {
  users.push({'cat':"cats"});
   res.status(201).send();
});

module.exports = router;
