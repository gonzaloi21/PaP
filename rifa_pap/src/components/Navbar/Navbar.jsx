// Navbar.jsx

import React from 'react';
import { FaInstagram } from 'react-icons/fa'; // Importa el ícono de Instagram

import './Navbar.css'; // Archivo de estilos para personalizar la apariencia

const Navbar = () => {
  return (
    <div className="navbar">

      <div className='words'>
      <h2 className='title'>FUNDACIÓN PASO A PASO | RIFA 2023</h2>
      </div>

    <div className='instagram'>
      <div className="navbar_logo">
          <a href="https://www.pasoapaso.cl/" target="_blank" rel="noopener noreferrer">
            <img src='/logo_pap.jpg' className='foto' alt='Logo PAP' />
          </a>
      </div>
      <a href="https://www.instagram.com/fundacion_pasoapaso" target="_blank" rel="noopener noreferrer" className="instagram-link">
        <FaInstagram className="instagram-icon" />
      </a>
    <h3 className='ig_pap'> @fundacion_pasoapaso</h3>
    </div>

    </div>
  );
};

export default Navbar;
