const JobsController = require('../controllers/jobs_controller.js');

const express = require('express');
const router = express.Router();

router.get('/page', JobsController.page);
router.get('/expander', JobsController.expander);

module.exports = router;