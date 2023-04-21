const express = require('express');
const router = express.Router();
const user=require('../Controller/UserController')
// const book=require('../controllers/bookController')
// const review =require('../controllers/reviewController')
// const auth = require("../Middleware/auth")


//.................test................................. */

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
//.............Api............................

router.post("/register",user.createUser)



router.all("/*", function (req, res) {
    res.status(400).send({ status: false, message: "Invalid path params" });
  });



module.exports = router;
