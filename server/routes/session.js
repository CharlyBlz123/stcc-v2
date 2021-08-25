const router = require('express').Router();
const sessionController = require('../controllers/sessionController');

router.post("/sign-up", sessionController.create);
router.post("/sign-in", sessionController.new);

module.exports = router;

