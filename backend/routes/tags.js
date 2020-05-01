const router = require('express').Router();
let Tag = require('../models/tag.model');

router.route('/').get((req, res) => {
    Tag.find()
        .then(tag => res.json(tag))
        .catch(err => res.status(400).json('Error: ', err));
});

router.route('/:id').get((req, res) => {
    Tag.find({ name: req.params.id })
        .then(tag => res.json(tag))
        .catch(err => res.status(400).json('Error: ', err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const color = req.body.color;

    const newTag = new Tag({
        name,
        color,
    });

    newTag
        .save()
        .then(() => res.json('Tag added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
