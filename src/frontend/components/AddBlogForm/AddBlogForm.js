import React from 'react';

import './AddBlogForm'

export default function AddBlogForm({ title, tag, body}) {
    return (
        <form onSubmit={e => handleForm(e)}>
            <div className='input-title'>
                <label><h3>Title</h3> </label>
                <input
                    type='text'
                    name='lexBlogTitle'
                    value={title}
                    placeholder='Title...'
                    onChange={e => updateTitle(e)}
                />
            </div>
            <div className='input-tags'>
                <label><h3>Tags</h3> </label>
                <div className='tags-container'>
                    <div className='typed-tags'>
                        {displayTags()}
                    </div>
                    <input
                        type='text'
                        name='tags'
                        value={tag}
                        placeholder='tags (separated by commas)'
                        onChange={e => updateTag(e)}
                    />
                </div>
            </div>
            <div className='input-body'>
                <label><h3>Body</h3> </label>
                <textarea
                    type='text'
                    name='body'
                    value={body}
                    placeholder='Body...'
                    onChange={e => updateBody(e)}
                />
            </div>
            <div className='form-buttons'>
                <button id='preview' onClick={e => previewBlog(e)}>Preview</button>
                <button id='submit' type='submit'>Submit</button>
            </div>
        </form>
    );
}