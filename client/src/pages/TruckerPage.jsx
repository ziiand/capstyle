import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../store/cartSlice';
import "../styles/Product.scss";

function TruckerPage() {
  const [caps, setCaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleAddToCart = (cap) => {
    if (cap.cap_id && cap.color_name && cap.price) {
      dispatch(
        addItemToCart({
          capName: cap.cap_name,
          capId: cap.cap_id,
          colorName: cap.color_name,
          price: cap.price,
        })
      );
    } else {
      console.error("Données manquantes pour l'article :", cap);
    }
  };
  
  const handleRemoveFromCart = (cap) => {
    dispatch(
      removeItemFromCart({
        capName: cap.cap_name,
        capId: cap.cap_id,
        colorName: cap.color_name,
        price: cap.price,
      })
    );
  };

  useEffect(() => {
    const fetchCaps = async () => {
      try {
        const response = await fetch('/api/caps/trucker');
        if (!response.ok) throw new Error('Erreur de chargement des casquettes');

        const data = await response.json();
        console.log("Données récupérées :", data); 
        setCaps(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaps();
  }, []);

  if (isLoading) return <p>Chargement des casquettes...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
    <h1>TRUCKER</h1>
    <section className="card-page">
      {caps.map((cap, index) => (
        <article key={`${cap.id}-${cap.color_name}-${index}`} className="color-card">
          <img 
  src={`http://localhost:3000/uploads/images/${cap.picture_name}`} 
  alt={cap.picture_alt || 'Casquette'} 
  onError={(e) => e.target.src = 'http://localhost:3000/images/default-image.webp'} 
/>




          <h3>{cap.cap_name} - {cap.color_name}</h3>
          <p>{cap.description}</p>
          <p>{cap.price} €</p>

          <div className="quantity-controls">
            <button onClick={() => handleRemoveFromCart(cap)}>-</button>
            <button onClick={() => handleAddToCart(cap)}>+</button>
          </div>
        </article>
      ))}
    </section>
    </>
  );
}

export default TruckerPage;
