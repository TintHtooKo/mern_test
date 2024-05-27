const express = require('express')
const {body} = require('express-validator')
const router = express.Router()
const postController = require("../controller/postController")
const handleErrorMessage = require('../helper/handleErrorMessage')
const upload = require('../helper/upload')


router.get('/',postController.index)

router.post('/create',[
    body('title').notEmpty(),
    body('body').notEmpty()
],handleErrorMessage,postController.create)

router.get('/detail/:id',postController.detail)

router.put('/update/:id',postController.update)

router.delete('/delete/:id',postController.delete)

router.post('/:id/upload',upload.single('photo'),postController.upload)

module.exports = router