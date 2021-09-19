const router = require('express').Router();
const authorization = require('../middleware/authorize');
const userController = require('../controllers/userController');
const validInfo = require('../middleware/validInfo'); 

router.get('/', authorization, userController.getAll);
router.post("/", authorization, validInfo, userController.create);
router.get('/information', authorization, userController.getOne);
router.patch('/edit-profile', authorization, userController.updateInformation);
router.patch('/edit-email', authorization, userController.updateEmail);
router.patch('/edit-password', authorization, userController.updatePassword);
router.delete('/', authorization, userController.delete);


module.exports = router;
