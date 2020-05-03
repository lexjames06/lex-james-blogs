import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Blogs.css';

export default function Blogs({ toggleCardWidth }) {
    const [blogs, setBlogs] = useState([]);
    const [tagsData, setTagsData] = useState([]);

    useEffect(() => {
        async function getBlogs() {
            fetch('/blogs/all-blogs')
                .then(res => res.json())
                .then(data => {
                    const allBlogs = data;
                    setBlogs(allBlogs);
                })
                .catch(err => console.log('Error: ' + err));
        }
        async function getTags() {
            fetch('/tags')
                .then(res => res.json())
                .then(data => {
                    const allTags = data;
                    setTagsData(allTags);
                })
                .catch(err => console.log('Error: ' + err));
        }
        getBlogs();
        getTags();
        toggleCardWidth();
    }, []);

    function displayTags(blog) {
        return blog.tags.map(tag => {
            let tagToDisplay = tag;
            let tagColor = '';

            tagsData.find(tagToMatch => {
                if (tagToMatch.name === tag.toLowerCase()) {
                    tagToDisplay = tag.toLowerCase();
                    tagColor = tagToMatch.color;
                }
            });

            if (tagColor === '') {
                tagColor = '#000000';
            }

            return (
                <div
                    className='blog-tag'
                    style={{ backgroundColor: `${tagColor}` }}
                >
                    <h4>{tagToDisplay}</h4>
                </div>
            );
        });
    }

    function setBlogUrl(blog) {
        let blogUrl = blog.title.toLowerCase().split(' ').join('-');
        return blogUrl;
    }

    function formatTitle(title) {
        return title
            ?.split(' ')
            .reduce((wordArray, word) => {
                let letters = word.split('')
                let letterToCapitalise = letters.shift();
                let capitalLetter = letterToCapitalise.toUpperCase();
                let formattedWord = [capitalLetter, ...letters].join('')
                wordArray.push(formattedWord)
                return wordArray;
            }, []).join(' ');
    }

    function displayBlogs() {
        let blogsToDisplay = blogs.sort((a, b) =>
            a.createdAt > b.createdAt ? -1 : 1
        );
        return blogsToDisplay.map(blog => {
            return (
                <Link to={`/blogs/${setBlogUrl(blog)}`}>
                    <div className='blog-container' key={blog.id}>
                        <div className='blog-thumbnail'></div>
                        <div className='blog-info'>
                            <div className='blog-tags'>{displayTags(blog)}</div>
                            <div className='blog-title'>
                                <h2>{formatTitle(blog.title)}</h2>
                            </div>
                            <div className='blog-body'>
                                {displayBlogBodyPreview(blog.body)}
                            </div>
                            <div className='blog-share-bar'><h4>Social Media Shar Buttons</h4></div>
                        </div>
                    </div>
                </Link>
            );
        });
    }

    function displayBlogBodyPreview(body) {
        return `${body
            .split('')
            .filter((char, index) => index < 200)
            .join('')}${body.length > 200 ? '...' : ''}`;
    }

    return (
        <>
            <h1>Blogs</h1>
            {displayBlogs()}
        </>
    );
}
