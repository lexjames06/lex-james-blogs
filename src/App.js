import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Tag from './Tag/Tag';

function App() {
    const [title, setTitle] = useState('');
    const [currentTag, setCurrentTag] = useState('');
    const [tags, setTags] = useState([]);
    const [body, setBody] = useState('');
    const [readTime, setReadTime] = useState('');

    function updateTag(e) {
        let typedTag = e.target.value;
        if (typedTag[typedTag.length - 1] === ',') {
            setCurrentTag('');
            setTags([...tags, typedTag.split(',')[0]]);
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
            title: title,
            tags: tags,
            body: body,
            readTime: readTime,
        };

        axios
            .post('/blogs/add', blog)
            .then(res => console.log(res.data))
            .catch(err => console.log('Error: ', err));

        setCurrentTag('');
        setTags([]);
        setTitle('');
        setBody('');
    }

    function mapTags() {
        return tags.map((tag, index) => (
            <div key={index}>
                <Tag tagName={tag} />
            </div>
        ));
    }

    return (
        <div className='App'>
            <div>
                <form onSubmit={e => handleForm(e)}>
                    <div>
                        <label>Title </label>
                        <input
                            type='text'
                            name='lexBlogTitle'
                            value={title}
                            placeholder='Title...'
                            onChange={e => updateTitle(e)}
                        />
                    </div>
                    <div>
                        <label>Tags </label>
                        <input
                            type='text'
                            name='tags'
                            value={currentTag}
                            placeholder='tags (separated by commas)'
                            onChange={e => updateTag(e)}
                        />
                    </div>
                    <div>
                        <label>Body </label>
                        <input
                            type='text'
                            name='body'
                            value={body}
                            placeholder='Body...'
                            onChange={e => updateBody(e)}
                        />
                    </div>
                    <div>
                        <button type='submit'>Submit</button>
                    </div>
                    <div>Title: {title}</div>
                    <div>Tag: {currentTag}</div>
                    <div>Body: {body}</div>
                    <div>Tags: {mapTags()}</div>
                </form>
            </div>
        </div>
    );
}

export default App;
