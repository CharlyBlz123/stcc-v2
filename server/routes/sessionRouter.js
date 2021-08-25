const router = require('express').Router();
const sessionController = require('../controllers/sessionController');
const validInfo = require('../middleware/validInfo'); 
const authorization = require('../middleware/authorize'); 

router.post("/sign-up", validInfo, sessionController.create);
router.post("/sign-in", validInfo, sessionController.new);
router.get('/is-verify', authorization, sessionController.authorizeAccess);

module.exports = router;

