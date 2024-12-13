import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TruckerPage from '../pages/TruckerPage';
import FittedPage from '../pages/FittedPage';
import SnapbackPage from '../pages/SnapbackPage';
import Register from '../components/auth/Register';
import Dashboard from '../dashboard/Dashboard'; 
import Orders from '../dashboard/orders/Orders'; 
import EditProduct from '../dashboard/products/EditProduct';
import AddStock from '../dashboard/stock/AddStock';
import NotFoundPage from '../pages/NotFoundPage';
import APropos from "../pages/APropos";
import Contact from "../pages/Contact";
import ConditionsGenerales from "../pages/ConditionsGenerales";


function UserRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trucker" element={<TruckerPage />} />
      <Route path="/fitted" element={<FittedPage />} />
      <Route path="/snapback" element={<SnapbackPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="orders" element={<Orders />} />
        <Route path="products/edit" element={<EditProduct />} />
        <Route path="stock/add" element={<AddStock />} />
        
      </Route>
      <Route path="/a-propos" element={<APropos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/conditions-generales" element={<ConditionsGenerales />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRouter;


