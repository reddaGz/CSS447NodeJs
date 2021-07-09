const express = require('express');
const router = express.Router();
const controller=require('../controllers/bookController')

router.get('/',controller.getAllBook)
router.get('/:id',controller.getById)
router.post('/',controller.save)
router.put('/:id',controller.update)
router.delete('/:id',controller.delete)
module.exports = router;