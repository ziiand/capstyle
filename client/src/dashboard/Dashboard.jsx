import React from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/Dashboard.scss";

function Dashboard() {
  const user = useSelector((state) => state.user);
  console.log("User:", user);

  const isAdmin = user && user.role === "admin";

  if (!isAdmin) {
    return <Navigate to="/" />; 
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <section>
        <h2>COMMANDES</h2>
        <div className="dashboard-section">
          <h3>Gérer les commandes :</h3>
          <ul>
            <li>
              <Link to="orders">Voir toutes les commandes / modifier / supprimer</Link>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>PRODUITS</h2>
        <div className="dashboard-section">
          <h3>Gérer les produits :</h3>
          <ul>
            <li>
              <Link to="products/edit">Modifier un produit</Link>
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>STOCK</h2>
        <div className="dashboard-section">
          <h3>Gérer les stocks :</h3>
          <ul>
            <li>
              <Link to="stock/add">Ajouter des stocks</Link>
            </li>
          </ul>
        </div>
      </section>
      <Outlet />
    </div>
  );
}

export default Dashboard;
