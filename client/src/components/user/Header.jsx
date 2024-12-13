import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginOrder from '../auth/LoginOrder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state) => state.user); 
  const isAdmin = user && user.role === 'admin';

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="header">
        <nav className="container">
          <Link to="/">
            <img src="/images/logo.PNG" alt="logo capstyle" id="logo" />
          </Link>
          
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/trucker">Trucker</Link></li>
            <li><Link to="/fitted">Fitted</Link></li>
            <li><Link to="/snapback">Snapback</Link></li>

            {isAdmin && <li><Link to="/dashboard">Dashboard</Link></li>}

            {/* Remplacement de "Connexion" par les icônes */}
            <li>
              <Link to="#" onClick={handleLoginClick}>
                <FontAwesomeIcon icon={faUser} className="icon" />  / 
                <FontAwesomeIcon icon={faShoppingCart} className="icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <LoginOrder isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default Header;
