//create web server
const express = require('express');
const router = express.Router();
// import the comments controller
const commentsCtrl = require('../controllers/comments');
// import the middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// Routes
// create a comment
router.post('/create', auth, multer, commentsCtrl.createComment);
// get all comments
router.get('/', auth, commentsCtrl.getAllComments);
// get one comment
router.get('/:id', auth, commentsCtrl.getOneComment);
// modify a comment
router.put('/:id', auth, multer, commentsCtrl.modifyComment);
// delete a comment
router.delete('/:id', auth, commentsCtrl.deleteComment);

module.exports = router;