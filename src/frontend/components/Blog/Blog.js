import React from 'react';
import Markdown from 'markdown-to-jsx';

import './Blog.css';

export default function Blog({ title, tags, body, readTime }) {
    function displayTags() {
        return tags?.map(tag => {
            return (
                <div className='blog-tag'>
                    <h4>{tag}</h4>
                </div>
            );
        });
    }

    function formatTitle() {
        if (title !== undefined) {
            return title
                ?.split(' ')
                ?.reduce((wordArray, word) => {
                    let letters = word.split('');
                    let letterToCapitalise = letters.shift();
                    let capitalLetter = letterToCapitalise?.toUpperCase();
                    let formattedWord = [capitalLetter, ...letters].join('');
                    wordArray.push(formattedWord);
                    return wordArray;
                }, [])
                .join(' ');
        }
    }

    function displayBlog() {
        return (
            <>
                <div className='blog-card-title'>
                    <h1>{formatTitle()}</h1>
                </div>
                <div className='blog-card-tags'>{displayTags()}</div>
                <div className='blog-card-read-time'>{readTime}min read</div>
                <div className='blog-card-body'>
                    <Markdown>
                    {body}
                    </Markdown>
                </div>
            </>
        );
    }

    return <div>{displayBlog()}</div>;
}
