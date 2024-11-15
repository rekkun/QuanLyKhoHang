const express = require("express")
const router = express.Router()
const controller = require("../controller/search.controller")

router.get('/component', controller.get.component)
router.get('/componentMapped', controller.get.componentMapped)
router.get('/shelf', controller.get.shelf)
router.get('/rack', controller.get.rack)
router.get('/case', controller.get.case)

router.post('/component', controller.post.component)
router.post('/componentMapped', controller.post.componentMapped)
router.post('/shelf', controller.post.shelf)
router.post('/rack', controller.post.rack)
router.post('/case', controller.post.case)

module.exports = router