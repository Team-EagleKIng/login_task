const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const loginController = require('../Controllers/loginController');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// SignIn

router.post('/login', (req, res) => {
    return new loginController().login(req, res)
});

module.exports = router;