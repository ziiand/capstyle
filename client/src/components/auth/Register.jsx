
import React, { useState } from 'react';
import '../../styles/Register.scss'; 

function Register({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/register', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, firstname: firstName, lastname: lastName }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  
      const data = await response.json();
      alert(data.message); 
    } catch (error) {
      alert('Erreur : ' + error.message);
    }
  };
  

  return (
    <div className="register">
      <h2>Créer un compte</h2>
      <form onSubmit={handleRegister}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Mot de passe:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label>Prénom:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <label>Nom:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <button type="submit">S'inscrire</button>
        <button type="button" onClick={onBack}>Retour à la connexion</button>
      </form>
    </div>
  );
}

export default Register;
