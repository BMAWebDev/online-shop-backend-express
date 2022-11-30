const { Users } = require('../controllers');

const { Router } = require('express');
const router = Router();
module.exports = router;

router.post('/register', Users.register);
router.post('/verify-user', Users.verify);
