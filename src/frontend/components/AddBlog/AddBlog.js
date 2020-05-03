import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tag from '../Tag/Tag';
import Blog from '../Blog/Blog';

import './AddBlog.css';

export default function AddBlog({ flipPreviewCard, previewMode, toggleCardWidth }) {
    const [title, setTitle] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState('');
    const [readTime, setReadTime] = useState('');

    function updateTag(e) {
        let typedTag = e.target.value;
        if (typedTag[typedTag.length - 1] === ',') {
            setCurrentTag('');
            setTags([...tags, typedTag.split(',')[0].toLowerCase()]);
        } else {
            setCurrentTag(typedTag);
        }
    }

    function updateTitle(e) {
        setTitle(e.target.value);
    }

    function updateBody(e) {
        setBody(e.target.value);
    }

    async function handleForm(e) {
        e.preventDefault();

        const blogLength = body.split(' ').length;
        setReadTime(Math.ceil(blogLength / 200));

        const blog = {
            title: title.toLowerCase(),
            tags: tags,
            body: body,
            readTime: Number(readTime),
        };

        axios
            .post('/blogs/all-blogs/add', blog)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ', err));

        setCurrentTag('');
        setTags([]);
        setTitle('');
        setBody('');
    }

    function deleteTag(tag) {
        let tagsDuplicate = tags.filter(arrayTag => arrayTag !== tag);
        setTags(tagsDuplicate);
    }

    function displayTags() {
        return tags?.map(tag => {
            return (
                <div className='blog-tag'>
                    <Tag tagName={tag} />
                    <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        onClick={() => deleteTag(tag)}
                    >
                        <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
                    </svg>
                </div>
            );
        });
    }

    function previewBlog(e) {
        e.preventDefault();
        flipPreviewCard();
        let blogLength = body.split(' ').length;
        setReadTime(Math.ceil(blogLength / 200));
    }

    function previewOrBlog() {
        if (previewMode) {
            return renderPreview();
        } else {
            return renderForm();
        }
    }

    function renderPreview() {
        return (
            <div className='update-blog-inner-container'>
                <Blog
                    title={title}
                    tags={tags}
                    body={body}
                    readTime={readTime}
                />
            </div>
        );
    }

    function renderForm() {
        return (
            <form>
                <div className='input-title'>
                    <label>
                        <h3>Title</h3>{' '}
                    </label>
                    <input
                        type='text'
                        name='lexBlogTitle'
                        value={title}
                        placeholder='Title...'
                        onChange={e => updateTitle(e)}
                    />
                </div>
                <div className='input-tags'>
                    <label>
                        <h3>Tags</h3>{' '}
                    </label>
                    <div className='tags-container'>
                        <div className='typed-tags'>{displayTags()}</div>
                        <input
                            type='text'
                            name='tags'
                            value={currentTag}
                            placeholder='tags (separated by commas)'
                            onChange={e => updateTag(e)}
                        />
                    </div>
                </div>
                <div className='input-body'>
                    <label>
                        <h3>Body</h3>{' '}
                    </label>
                    <textarea
                        type='text'
                        name='body'
                        value={body}
                        placeholder='Body...'
                        onChange={e => updateBody(e)}
                    />
                </div>
            </form>
        );
    }

    useEffect(() => {
        toggleCardWidth();
    }, [])

    return (
        <>
            {previewOrBlog()}
            <div className='form-buttons'>
                <button id='preview' onClick={e => previewBlog(e)}>
                    {previewMode ? 'Edit' : 'Preview'}
                </button>
                <Link to='/blogs'>
                    <button
                        id='submit'
                        type='submit'
                        onClick={e => handleForm(e)}
                    >
                        Submit
                    </button>
                </Link>
            </div>
        </>
    );
}
