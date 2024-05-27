const express = require('express')
const router = express.Router();
const commentController = require('../controller/commentController')

router.get('/:id/index',commentController.index)
router.post('/:id/create',commentController.create)

module.exports = router