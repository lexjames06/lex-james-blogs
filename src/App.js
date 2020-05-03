import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import AddBlog from './frontend/components/AddBlog/AddBlog';
import Blogs from './frontend/components/Blogs/Blogs';
import GetBlog from './frontend/components/GetBlog/GetBlog';

function App() {
    const [flipCard, setFlipCard] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [cardWidth, setCardWidth] = useState('wide');

    function flipPreviewCard() {
        setFlipCard(true);
        setTimeout(() => {
            setPreviewMode(!previewMode);
            setFlipCard(false);
        }, 500);
    }

    function flipEditCard() {
        setFlipCard(true);
        setTimeout(() => {
            setEditMode(!editMode);
            setFlipCard(false);
        }, 500);
    }

    function toggleCardWidth() {
        let routeURL = window.location.href.split('/')
        return routeURL[routeURL.length - 1] === 'blogs' ? setCardWidth('wide') : setCardWidth('narrow')
    }

    return (
        <div className='App'>
            <div className='blogs-page-outer-container'>
                <BrowserRouter>
                    <div className='nav-bar'>
                        <Link to='/blogs/add'>
                            <button>
                                <h3>Add Blog</h3>
                            </button>
                        </Link>
                        <Link to='/blogs'>
                            <button>
                                <h3>Blogs</h3>
                            </button>
                        </Link>
                    </div>
                    <div className='cover'></div>
                    <div
                        className={`card-outer-container ${cardWidth}`}
                        id={`${flipCard}`}
                    >
                        <Switch>
                            <Route exact path='/blogs/add'>
                                <AddBlog
                                    flipPreviewCard={() => flipPreviewCard()}
                                    previewMode={previewMode}
                                    toggleCardWidth={() => toggleCardWidth()}
                                />
                            </Route>
                            <Route exact path='/blogs/'>
                                <Blogs toggleCardWidth={() => toggleCardWidth()} />
                            </Route>
                            <Route exact path='/blogs/:id'>
                                <GetBlog 
                                    flipEditCard={() => flipEditCard()}
                                    editMode={editMode}
                                    toggleCardWidth={() => toggleCardWidth()}
                                />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        </div>
    );
}

export default App;
