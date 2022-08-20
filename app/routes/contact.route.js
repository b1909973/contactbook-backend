const express = require('express')
const contacts = require("../controllers/contact.controller")

const router = express.Router()
router.route("/").delete(contacts.deleteAll)

router.route("/").post(contacts.create)
router.route("/").get(contacts.findAll)


router.route("/:id").get(contacts.findOne)

router.route("/:id").put(contacts.update)

router.route("/:id").delete(contacts.delete)

router.route("/favorite").get(contacts.findAllFavorite)







// router.route("/favorite")
// .get(contacts.findAllFavorite)

// router.route("/:id").get(contacts.findOne)
// .put(contacts.update)
// .delete(contacts.delete)

module.exports = router