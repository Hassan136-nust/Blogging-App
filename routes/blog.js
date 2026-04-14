const express = require('express');
const router = express.Router();
const { handleCreateBlog, handleGetBlogs, handleGetBlog, handleAddComment, upload } = require('../controllers/blog');
const { ensureAuthenticated } = require('../middlewares/authentication');

router.use(ensureAuthenticated);

router.get('/', handleGetBlogs);
router.post('/', upload.single('coverImage'), handleCreateBlog);
router.get('/:id', handleGetBlog);
router.post('/:id/comments', handleAddComment);

module.exports = router;