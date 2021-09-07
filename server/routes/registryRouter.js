const router = require('express').Router();
const authorization = require('../middleware/authorize');
const registryController = require('../controllers/registryController');

router.get('/', authorization, registryController.getAll);
router.get('/filter-by-date', authorization, registryController.getByRange);
router.post('/', registryController.create);


module.exports = router;
