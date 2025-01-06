const express = require('express');
const router = express.Router();
const artistRoutes = require('./artists');
const authRoutes = require('./auth');

router.use('/auth', authRoutes);
router.use('/artists', artistRoutes);

module.exports = router;