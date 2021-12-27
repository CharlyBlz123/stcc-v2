const router = require('express').Router();
const authorization = require('../middleware/authorize');
const userController = require('../controllers/userController');
const validInfo = require('../middleware/validInfo'); 

router.post("/", authorization, validInfo, userController.create);
router.get('/', authorization, userController.getAll);
router.get('/information', authorization, userController.getOne);
router.patch('/reset', authorization, userController.resetPassword);
router.patch('/', authorization, userController.updateInformation);
router.patch('/credentials', authorization, userController.updateCredentials);
router.patch('/deleted-user', authorization, userController.undelete);
router.delete('/', authorization, userController.delete);


module.exports = router;
