let express = require('express');
let router = express.Router();
let indexController = require('./controllers/index')

/* GET home page. */
router.get('*', indexController.index);
router.post('*', indexController.index);
router.put('*', indexController.index);
router.patch('*', indexController.index);
router.delete('*', indexController.index);

module.exports = router;
