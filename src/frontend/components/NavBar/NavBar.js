import React from 'react';

import './NavBAr.css';

export default function NavBar() {
    return (
        <div className='navbar-container'>
            <ul className='navbar-links'>
                <li className='navbar-link'>Home</li>
                <li className='navbar-link'>Blogs</li>
                <li className='navbar-link'></li>
            </ul>
        </div>
    );
}