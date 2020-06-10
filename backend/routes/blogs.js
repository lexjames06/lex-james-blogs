const router = require('express').Router();
let Blog = require('../models/blog.model');

router.route('/').get((req, res) => {
    Blog.find()
        .then(blogs => res.json(blogs))
        .catch(err => res.status(400).json('Error: ', err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const tags = req.body.tags;
    const body = req.body.body;
    const readTime = Number(req.body.readTime);

    const newBlog = new Blog({
        title,
        tags,
        body,
        readTime,
    });

    newBlog
        .save()
        .then(() => res.json('Blog added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    let title = req.params.id.split('-').join(' ');
    Blog.find({ title: title })
        .then(blog => res.json(blog))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    let title = req.params.id.split('-').join(' ');
    Blog.deleteOne({ title: title })
        .then(() => res.json('Blog deleted!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    let title = req.params.id.split('-').join(' ');
    Blog.findOne({ title: title })
        .then(blog => {
            blog.title = req.body.title;
            blog.tags = req.body.tags;
            blog.body = req.body.body;
            blog.readTime = Number(req.body.readTime);

            blog.save()
                .then(() => res.json('Blog updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
