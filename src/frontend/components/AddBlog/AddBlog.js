import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Tag from '../Tag/Tag';
import Blog from '../Blog/Blog';

import './AddBlog.css';

export default function AddBlog({
    flipPreviewCard,
    previewMode,
    toggleCardWidth,
    turnEditOff,
}) {
    const [title, setTitle] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState('');
    const [readTime, setReadTime] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [showTitleError, setShowTitleError] = useState(false);
    const [showBodyError, setShowBodyError] = useState(false);
    const [showSubmitError, setShowSubmitError] = useState(false);

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

    async function handleForm() {
        console.log('Title, ', title)
        console.log('Body, ', body)
        if (title === ''){
            console.log('showTitleError 1, ', showTitleError)
            setShowTitleError(true);
            console.log('showTitleError 2, ', showTitleError)
        }

        if (body === '') {
            console.log('showBodyError 1, ', showBodyError)
            setShowBodyError(true);
            console.log('showBodyError 2, ', showBodyError)
        }
        
        if (showTitleError || showBodyError) {
            console.log('showSubmitError 1, ', showSubmitError)
            setShowSubmitError(true);
            console.log('showSubmitError 2, ', showSubmitError)
        }
        
        if (!showSubmitError) {
            
            console.log('How did we get here, ', showSubmitError)
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
            setSubmitted(true);
            setShowTitleError(false);
            setShowBodyError(false);
            setShowSubmitError(false);
        }
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
                {showSubmitError && showTitleError && <h5>*What's your blog about? Let your readers know with a title :{`)`}</h5>}
                {showSubmitError && showBodyError && <h5>*What's your blog about? Let your readers know with a title :{`)`}</h5>}
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
                    {showTitleError && <h5>*What's your blog about? Let your readers know with a title :{`)`}</h5>}
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
                    {showBodyError && <h5>*We might need a little more detail for the readers ;P</h5>}
                </div>
            </form>
        );
    }

    useEffect(() => {
        toggleCardWidth();
        turnEditOff();
    }, []);

    useEffect(() => {
        function redirect() {
            console.log('this should redirect to ');
            return <Redirect to='/blogs' />;
        }
        submitted && redirect();
    }, [submitted]);

    function changeSubmitted() {
        setSubmitted(true);
    }

    function submitButton() {
        return (
            <button
                id='submit'
                onClick={() => handleForm()}
                // onClick={() => changeSubmitted()}
            >
                <h4>Submit</h4>
            </button>
        );
    }

    return (
        <>
            {previewOrBlog()}
            <div className='form-buttons'>
                <button id='preview' onClick={e => previewBlog(e)}>
                    <h4>{previewMode ? 'Edit' : 'Preview'}</h4>
                </button>
                {title && body && <Link to='/blogs'>{submitButton()}</Link> || submitButton()}
            </div>
        </>
    );
}
