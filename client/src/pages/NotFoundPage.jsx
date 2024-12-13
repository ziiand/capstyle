import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Non Trouvée</h1>
      <p>Désolé, la page que vous recherchez n'existe pas.</p>
      <Link to="/" style={{ textDecoration: 'underline', color: '#1E90FF' }}>
        Retour à la page d'accueil
      </Link>
    </div>
  );
}

export default NotFoundPage;
