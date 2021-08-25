const router = require('express').Router();
const authorization = require('../middleware/authorize');
const userController = require('../controllers/userController');

router.get('/', authorization, userController.getAll);
router.get('/show', authorization, userController.getOne);
router.patch('/edit-profile', authorization, userController.updateInformation);
router.patch('/edit-email', authorization, userController.updateEmail);
router.patch('/edit-password', authorization, userController.updatePassword);
router.delete('/delete', authorization, userController.delete);


module.exports = router;
