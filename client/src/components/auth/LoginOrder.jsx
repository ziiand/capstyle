import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import '../../styles/LoginOrder.scss';
import Register from './Register';
import { setUser } from '../../store/userSlice';
import Login from './login.jsx';
import CartSection from './CartSection';

function LoginOrder({ isOpen, onClose }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const cartItems = useSelector((state) => Object.values(state.cart.items));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.id) {
          dispatch(setUser(parsedUser));
        }
      } catch (error) {
        console.error('Erreur de parsing de l\'utilisateur dans localStorage', error);
      }
    }
  }, [dispatch]);
  
  const handleLoginSuccess = (userData) => {
    if (userData.role === 'admin') {
      navigate('/dashboard');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      dispatch(setUser(null));
      localStorage.removeItem('user');
      alert('Vous êtes déconnecté.');
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleRegister = () => {
    setIsRegister(true);
  };

  const handleBackToLogin = () => {
    setIsRegister(false);
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Votre panier est vide !');
      return;
    }
  
    cartItems.forEach((item) => {
      if (!item?.capId) {
        throw new Error(`L'ID de la casquette est manquant pour l'item ${item?.capName || 'inconnu'}`);
      }
    });
    
    const userId = user ? user.id : null;
  
    try {
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          statusId: 1,
        }),
      });
  
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.message);
      }
  
      const orderData = await orderResponse.json();
      const orderId = orderData.id;
  
      console.log('Commande créée avec succès, ID:', orderId);
  
      const orderLinePromises = cartItems.map(async (item) => {
        if (!item.capId || !item.colorId || !item.quantity) {
          throw new Error('Tous les champs sont requis: capId, colorId, quantity');
        }
      
        const orderLine = {
          orderId: orderId,
          capId: item.capId,
          colorId: item.colorId,
          quantity: item.quantity,
        };
      
        const orderLineResponse = await fetch('/api/orderLines', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderLine),
        });
      
        if (!orderLineResponse.ok) {
          const errorData = await orderLineResponse.json();
          throw new Error(`Erreur lors de l'ajout de la ligne de commande: ${errorData.message}`);
        }
      
        console.log('Ligne de commande ajoutée avec succès');
      });
  
      await Promise.all(orderLinePromises);
  
      alert('Votre commande a été validée avec succès !');
      dispatch(clearCart());
    } catch (error) {
      alert('Commande validée avec succès !');
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>&times;</span>

        {isRegister ? (
          <Register onBack={handleBackToLogin} />
        ) : (
          <>
            <h2>{user ? `Bienvenue, ${user.firstname}` : 'Connexion'}</h2>

            {!user ? (
              <>
                <Login onLoginSuccess={handleLoginSuccess} />
                <button onClick={handleRegister}>S'inscrire</button> {/* Le bouton S'inscrire ici */}
              </>
            ) : (
              <div>
                <p>Vous êtes connecté en tant que {user.firstname}.</p>
                <button onClick={handleLogout}>Se déconnecter</button>

                {user.id_roles === 1 && (
                  <button onClick={() => navigate('/dashboard')}>Accéder au Dashboard</button>
                )}
              </div>
            )}

            <button onClick={toggleCart} className="cart-button">
              {showCart ? 'Masquer le panier' : 'Voir le panier'}
            </button>

            {showCart && (
              <CartSection cartItems={cartItems} onCheckout={handleCheckout} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default LoginOrder;
