const Blog = require('../models/blog');
const Comment = require('../models/comment');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve('./public/uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const handleCreateBlog = async (req, res) => {
    try {
        if (!req.user) {
            return res.redirect('/user/signin');
        }

        const { title, content } = req.body;
        
        if (!title || !content) {
            return res.status(400).send('Title and content are required');
        }

        const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '';

        await Blog.create({
            title,
            content,
            coverImageURL,
            createdBy: req.user._id,
        });

        return res.redirect('/blogs');
    } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).send('Error creating blog');
    }
};

const handleGetBlogs = async (req, res) => {
    const blogs = await Blog.find({}).populate('createdBy', 'firstname').sort({ createdAt: -1 });
    return res.render('index', {
        user: req.user,
        blogs,
    });
};

const handleGetBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy', 'firstname');
    if (!blog) return res.status(404).send('Blog not found');

    const comments = await Comment.find({ blog: blog._id })
        .populate('createdBy', 'firstname')
        .sort({ createdAt: 1 });

    return res.render('blog', {
        user: req.user,
        blog,
        comments,
    });
};

const handleAddComment = async (req, res) => {
    if (!req.user) {
        return res.redirect('/user/signin');
    }

    const { comment } = req.body;
    if (!comment || !comment.trim()) {
        return res.redirect(`/blogs/${req.params.id}`);
    }

    await Comment.create({
        text: comment.trim(),
        blog: req.params.id,
        createdBy: req.user._id,
    });

    return res.redirect(`/blogs/${req.params.id}`);
};

module.exports = {
    handleCreateBlog,
    handleGetBlogs,
    handleGetBlog,
    handleAddComment,
    upload,
};