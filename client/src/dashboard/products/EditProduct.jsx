import React, { useState, useEffect } from 'react';
import Modal from "../../components/modal/Modal.jsx";

const EditProduct = () => {
  const [caps, setCaps] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCaps = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/caps');
      if (!response.ok) throw new Error("Erreur lors de la récupération des casquettes");
      
      const data = await response.json();
      setCaps(data);
      setIsModalOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchCaps();
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Liste des casquettes</h1>
        {isLoading ? (
          <p>Chargement des casquettes...</p>
        ) : error ? (
          <p>Erreur : {error}</p>
        ) : (
          <div className="caps-list">
            {caps.length > 0 ? (
              caps.map((cap) => (
                <div key={`${cap.id}-${cap.color_id}`} className="cap-item">
                  <h2>{cap.name}</h2>
                  <p><strong>Description :</strong> {cap.description}</p>
                  <p><strong>Prix :</strong> {cap.price} €</p>
                </div>
              ))
            ) : (
              <p>Aucune casquette disponible pour le moment.</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EditProduct;
