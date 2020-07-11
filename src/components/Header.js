import React from 'react';
import Logo from '../img/logo.svg';

const Header = () => {
  return (
    <header>
      <img src={Logo} alt="Notedly Logo" height="40" />
      <h1>Notedly</h1>
    </header>
  );
};

export default Header;
