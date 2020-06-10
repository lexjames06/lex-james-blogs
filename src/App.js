import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AddBlog from './frontend/components/AddBlog/AddBlog';
import Blogs from './frontend/components/Blogs/Blogs';
import GetBlog from './frontend/components/GetBlog/GetBlog';
import NavBar from './frontend/components/NavBar/NavBar';
import Logo from './frontend/components/SVGs/Logo';
import TestRedux from './frontend/components/AddBlogForm/AddBlogForm';

function App() {
    const [flipCard, setFlipCard] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [cardWidth, setCardWidth] = useState('wide');
    const [backgroundImage, setBackgroundImage] = useState('');
    const [url, setUrl] = useState('');

    const images = [
        {
            name: 'my-choice-to-join-a-coding-bootcamp',
            source:
                'https://thepracticaldev.s3.amazonaws.com/i/m64v554hafaecr2134wm.jpeg',
        },
    ];

    function clearBackgroundImage() {
        setBackgroundImage('')
    }

    function updateBackgroundTitle(title) {

        let background =
            images.find(image => image.name === title) || '';

            setBackgroundImage(background?.source || '');
    }

    function flipPreviewCard() {
        setFlipCard(true);
        setTimeout(() => {
            setPreviewMode(!previewMode);
            setFlipCard(false);
        }, 500);
    }

    function turnEditOff() {
        setEditMode(false);
    }

    function flipEditCard() {
        setFlipCard(true);
        setTimeout(() => {
            setEditMode(!editMode);
            setFlipCard(false);
        }, 500);
    }

    function toggleCardWidth() {
        let routeURL = window.location.href.split('/');
        let urlEnding = routeURL[routeURL.length - 1];
        console.log(urlEnding);
        if (urlEnding === '') {
            if (routeURL[routeURL.length - 2] === 'blogs' || 'login') {
                setCardWidth('wide');
            }
        } else if(urlEnding === 'blogs' || 'login') {
            setCardWidth('wide');
        } else {
            setCardWidth('narrow');
        }
    }

    useEffect(() => {
        function toggleBackgroundImage() {
            let routeURL = window.location.href.split('/');
            let urlEnding = routeURL[routeURL.length - 1];

            setUrl(urlEnding);

            console.log('background toggled')
            
            updateBackgroundTitle(urlEnding)
        }
        toggleBackgroundImage();
        toggleCardWidth();
        console.log('background toggled kinda')
    });

    return (
        <div className='App'>
            <div className='blogs-page-outer-container'>
                <BrowserRouter>
                    <NavBar clearBackgroundImage={() => clearBackgroundImage()} />
                    <div className='cover'>
                        {url === 'blogs' || 'add' ? <Logo /> : ''}
                        {url === 'blogs' || 'add' ? <h4>lexjames06: coder;</h4> : ''}
                        {backgroundImage && (
                            <img src={backgroundImage} alt='' />
                        )}
                    </div>
                    <div
                        className={`card-outer-container ${cardWidth}`}
                        id={`${flipCard}`}
                    >
                        <Switch>
                            <Route exact path='/login'>
                                {/* <Login
                                    toggleCardWidth={() => toggleCardWidth()}
                                /> */}
                            </Route>
                            <Route exact path='/blogs/add'>
                                <AddBlog
                                    flipPreviewCard={() => flipPreviewCard()}
                                    previewMode={previewMode}
                                    toggleCardWidth={() => toggleCardWidth()}
                                    turnEditOff={() => turnEditOff()}
                                />
                            </Route>
                            <Route exact path='/blogs/'>
                                <Blogs
                                    toggleCardWidth={() => toggleCardWidth()}
                                    turnEditOff={() => turnEditOff()}
                                />
                            </Route>
                            <Route exact path='/blogs/:id'>
                                <GetBlog
                                    flipEditCard={() => flipEditCard()}
                                    editMode={editMode}
                                    toggleCardWidth={() => toggleCardWidth()}
                                />
                            </Route>
                            {/* <Route exact path='/'>
                                <TestRedux />
                            </Route> */}
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
