const express=require('express');
const path=require('path')
const router = express.Router();
router.get('/abc', function (req, res) {
    throw new Error() // Express will catch this on its own.
    })
module.exports = router;