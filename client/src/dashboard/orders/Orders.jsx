import React, { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des commandes");
      }
      const data = await response.json();
      console.log("Données récupérées de l'API:", data);
      setOrders(data);
      setIsModalOpen(true); 
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes:", error);
    }
  };

 
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de la commande");
      }
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error);
    }
  };

  const updateStatus = async (orderId, statusId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${orderId}/status`, {
        method: "PUT",
        body: JSON.stringify({ statusId }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut de la commande");
      }
      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, id_status: updatedOrder.id_status } : order
        )
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut de la commande:", error);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    fetchOrders(); 
  }, []);

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>Liste des commandes</h1>
        <ul>
  {orders.length > 0 ? (
    orders.map((order) => (
      <li key={order.order_id}>
        {`Commande #${order.order_id}, Date de réception: ${order.receipt_date}, Utilisateur: ${order.firstname} ${order.lastname}, Statut: ${order.order_status}`}
        <button
          onClick={() => deleteOrder(order.order_id)}
          className="delete-button"
        >
          ×
        </button>
        <select
          value={selectedStatus[order.order_id] || order.order_status}
          onChange={(e) => {
            const newStatus = e.target.value;
            updateStatus(order.order_id, newStatus);
            setSelectedStatus((prev) => ({
              ...prev,
              [order.order_id]: newStatus,
            }));
          }}
        >
          <option value="1">En attente</option>
          <option value="2">Expédiée</option>
          <option value="3">Livrée</option>
          <option value="4">Annulée</option>
          <option value="5">Retournée</option>
        </select>
      </li>
    ))
  ) : (
    <p>Aucune commande disponible pour le moment.</p>
  )}
</ul>

      </Modal>
    </div>
  );
};

export default Orders;
