import React from 'react';   
import Logo from '../assets/theBridge.png';  
import '../styles/Header.css'

const Header = () => {  
    return (  
        <header className="header">  
            <img src={Logo} alt="The Bridge Logo" className="logo" />
            
        </header>  
    );  
};  

export default Header;