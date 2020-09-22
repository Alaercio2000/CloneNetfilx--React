import React from 'react';
import './style.css';

import logo from '../../assets/logo.png';
import imgUser from '../../assets/user.png';

export default ({ background }) => {
    return (
        <header className={background ? "background" : ""} >
            <div className="menu--logo">
                <a href="/">
                    <img src={logo} alt="Logo"/>
                </a>
            </div>
            <div className="menu--user">
                <a href="/">
                    <img src={imgUser} alt="imagem user" />
                </a>
            </div>
        </header>
    );
}