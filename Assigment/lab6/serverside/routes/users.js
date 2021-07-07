const express = require('express');
const router = express.Router();
const userController=require('../controllers/userController')

router.post('/login',userController.login)
router.use(userController.authorize)
module.exports = router;