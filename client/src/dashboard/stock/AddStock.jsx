import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/modal"; // Assurez-vous que le chemin est correct

const AddStock = () => {
  const [stocks, setStocks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal ouvert par défaut
  const [loading, setLoading] = useState(true); // Chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [newStock, setNewStock] = useState({
    stockId: "", // ID du stock à ajouter
    quantity: "", // Quantité
  }); // Stock à ajouter

  // Fonction pour récupérer les stocks
  const fetchStocks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/stocks");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des stocks");
      }
      const data = await response.json();
      console.log(data); // Inspecter la structure des données
      setStocks(data);
    } catch (error) {
      setError(error.message); // Gestion des erreurs
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Fonction pour ajouter ou mettre à jour un stock
  const addOrUpdateStock = async () => {
    if (!newStock.stockId || !newStock.quantity) {
      setError("Tous les champs doivent être remplis");
      return;
    }

    const stockToUpdate = stocks.find(stock => stock.id === parseInt(newStock.stockId)); // Vérifie si le stock existe

    if (stockToUpdate) {
      // Si le stock existe, met à jour la quantité
      try {
        const updatedStock = {
          quantity: stockToUpdate.quantity + parseInt(newStock.quantity), // Ajoute la nouvelle quantité à l'existante
          id_caps: stockToUpdate.id_caps, // Récupère id_caps existant
          id_colors: stockToUpdate.id_colors, // Récupère id_colors existant
        };
        
        const response = await fetch(`http://localhost:3000/api/stocks/${newStock.stockId}`, {
          method: "PUT",
          body: JSON.stringify(updatedStock),
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la mise à jour du stock");
        }

        const updatedData = await response.json();
        setStocks(stocks.map(stock => stock.id === parseInt(newStock.stockId) ? updatedData : stock)); // Met à jour l'état avec le stock mis à jour
        setNewStock({ stockId: "", quantity: "" }); // Réinitialiser le formulaire
        setError(null); // Réinitialiser les erreurs
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Le stock avec cet ID n'existe pas.");
    }
  };

  // Fonction pour fermer le modal
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchStocks(); // Récupérer les stocks au chargement du composant
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Ajouter ou modifier un stock</h1>
        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <h2>Stocks existants</h2>
          <ul>
            {stocks.length > 0 ? (
              stocks.map((stock) => (
                <li key={stock.id}>
                  {`ID: ${stock.id}, Description: ${stock.picture}, Quantité: ${stock.quantity}`}
                </li>
              ))
            ) : (
              <p>Aucun stock disponible pour le moment.</p>
            )}
          </ul>

          <h2>Ajouter ou modifier un stock</h2>
          <div>
            <label>ID du stock: </label>
            <input
              type="text"
              value={newStock.stockId}
              onChange={(e) => setNewStock({ ...newStock, stockId: e.target.value })}
            />
          </div>
          <div>
            <label>Quantité: </label>
            <input
              type="number"
              value={newStock.quantity}
              onChange={(e) => setNewStock({ ...newStock, quantity: e.target.value })}
            />
          </div>
          <button onClick={addOrUpdateStock}>Mettre à jour le stock</button>
        </div>
      </Modal>
    </div>
  );
};

export default AddStock;
