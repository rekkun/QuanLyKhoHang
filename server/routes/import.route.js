const express = require('express')
const router = express.Router()
const controller = require('../controller/import.controller');

router.get('/shelf', controller.get.shelf)
router.get('/rack', controller.get.rack)
router.get('/case', controller.get.case)

router.post('/shelf', controller.post.shelf)
router.post('/rack', controller.post.rack)
router.post('/case', controller.post.case)
router.post('/component', controller.post.component)

module.exports = router