const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        tags: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],
        body: { type: String, required: true },
        readTime: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
