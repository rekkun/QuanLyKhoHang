const express = require('express')
const router = express.Router()
const controller = require('../controller/import.controller');

router.post('/shelf', controller.post.shelf)
router.post('/rack', controller.post.rack)
router.post('/case', controller.post.case)
router.post('/component', controller.post.component)
router.post('/componentMapped', controller.post.componentMapped)

module.exports = router