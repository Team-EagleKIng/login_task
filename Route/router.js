const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const testController = require('../Controllers/testController');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


// Login

router.post('/signin', (req, res) => {
    return new testController().signIn(req, res)
});

// signUp

router.post('/signup', (req, res) => {
    return new testController().signUp(req, res)
});

module.exports = router;