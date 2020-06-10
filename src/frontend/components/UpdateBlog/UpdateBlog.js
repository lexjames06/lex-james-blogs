import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Tag from '../Tag/Tag';

import './UpdateBlog.css';

export default function UpdateBlog({ blogTitle, blogTags = [], blogBody, updateCardWidth }) {
    const [title, setTitle] = useState(blogTitle);
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState(blogTags);
    const [body, setBody] = useState(blogBody);
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

        const url = window.location.href.split('/');
        const urlId = url[url.length - 1];

        axios
            .post(`/blogs/all-blogs/update/${urlId}`, blog)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ', err));
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

    async function handleDelete() {
        
        const url = window.location.href.split('/');
        const urlId = url[url.length - 1];

        axios
            .delete(`/blogs/all-blogs/${urlId}`)
            .then(res => console.log(res.data))
            .then(updateCardWidth)
            .catch(err => console.log('Error: ', err));
    }

    function submitUpdate() {
        console.log('submitted update')
    }

    return (
        <div className='update-form'>
            <form onSubmit={e => handleForm(e)}>
                <div className='input-title update'>
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
                <div className='update-button'>
                    <button id='update' type='submit' onClick={(e) => handleForm(e)}>
                        Update
                    </button>
                </div>
            </form>
            <Link to='/blogs'>
                <button id='delete' onClick={() => handleDelete()}>
                    <svg width='24' height='24' viewBox='0 0 24 24'>
                        <path d='M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z' />
                    </svg>
                </button>
            </Link>
        </div>
    );
}
