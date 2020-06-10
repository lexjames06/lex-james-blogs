import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Blog from '../Blog/Blog';
import UpdateBlog from '../UpdateBlog/UpdateBlog';

import './GetBlog.css';

export default function GetBlog({ flipEditCard, editMode, toggleCardWidth }) {
    const [blog, setBlog] = useState('');
    const [fetched, setFetched] = useState(false);

    const url = window.location.href.split('/');
    const urlId = url[url.length - 1];

    function updateCardWidth() {
        console.log('triggered 1');
        toggleCardWidth();
    }

    function renderUpdate() {
        if (blog === 'error') {
            return "It looks like we made a mistake. Try refreshing the page...";
        } else if(fetched === false) {
            return 'Loading...';
        } else if(!blog) {
            return 'It looks like we don\'t have that one in our database';
        } else {
            return (
                // <div className='update-blog-inner-container'>
                    <UpdateBlog
                        blogTitle={blog?.title}
                        blogTags={blog?.tags}
                        blogBody={blog?.body}
                        updateCardWidth={() => updateCardWidth()}
                    />
                // </div> 
            );
        }
    }

    function renderBlog() {
        // console.log('Blog ', blog);
        // console.log('Blog ', fetched);
        if (blog === 'error') {
            return "It looks like we made a mistake. Try refreshing the page...";
        } else if(fetched === false) {
            return 'Loading...';
        } else if(!blog) {
            return 'It looks like we don\'t have that one in our database';
        } else {
            return (
                <div className='blog-inner-container'>
                    <Blog
                        title={blog?.title}
                        tags={blog?.tags}
                        body={blog?.body}
                        readTime={blog?.readTime}
                    />
                </div>
            );
        }
    }

    function updateOrBlog() {
        if (editMode) {
            return renderUpdate();
        } else {
            return renderBlog();
        }
    }

    function getEditButton() {
        if (!editMode) {
            return (
                <>
                    <svg width='24' height='24' viewBox='0 0 24 24'>
                        <path d='M18.31 2.828l2.862 2.862-15.032 15.032-3.583.722.723-3.585 15.03-15.031zm0-2.828l-16.872 16.872-1.438 7.128 7.127-1.437 16.873-16.874-5.69-5.689zm-.021 5.004l-12.728 12.728.707.708 12.728-12.728-.707-.708z' />
                    </svg>
                </>
            );
        } else {
            return (
                <>
                    <svg width='24' height='24' viewBox='0 0 24 24'>
                        <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
                    </svg>
                </>
            );
        }
    }

    useEffect(() => {
        async function getBlog() {
            fetch(`/blogs/all-blogs/${urlId}`)
                .then(res => res.json())
                .then(data => {
                    let blogData = data[0];
                    setBlog(blogData);
                    setFetched(true);
                })
                .catch(err => {
                    setBlog('error');
                    console.log('Error: ' + err);
                });
        }
        getBlog();
        toggleCardWidth();
    }, []);

    return (
        <>
            {updateOrBlog()}
            <button id='edit' onClick={flipEditCard}>
                {getEditButton()}
            </button>
        </>
    );
}
