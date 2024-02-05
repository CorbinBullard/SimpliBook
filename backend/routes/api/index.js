const router = require("express").Router();

const {restoreUser} = require("../../utils/auth");

router.use(restoreUser);

router.post("/test", function (req, res) {
    return res.json({ requestBody: req.body });
});


module.exports = router;
