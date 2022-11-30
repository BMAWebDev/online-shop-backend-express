const { Router } = require('express');
const { users } = require('./routes');

const router = Router();
module.exports = router;

// use the router instances defined
router.use(users);
