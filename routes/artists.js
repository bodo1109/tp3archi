const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const commentsController = require('../controllers/commentsController');

// Artist routes
router.get('/', artistController.getArtists);
router.post('/', artistController.createArtist);
router.get('/:id', artistController.getArtist);
router.put('/:id', artistController.updateArtist);
router.delete('/:id', artistController.deleteArtist);

// Comments routes
router.get('/:id/comments', commentsController.getComments);
router.post('/:id/comments', commentsController.addComment);

module.exports = router;