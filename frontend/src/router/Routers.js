import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';

import EntityForm from '../components/Forms/entityForm';
import EntityDetails from '../components/Forms/EntityDetails';
import DynamicEntities from '../components/Forms/DynamicEntities';
import About from '../pages/About';
import Profile from '../pages/Profile';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/create" element={<EntityForm />} />
      <Route path="/create/:modelType" element={<EntityForm />} />
      <Route path="/edit/:modelType/:id" element={<EntityForm editMode />} />
      <Route path="/:modelType/:id" element={<EntityDetails />} />
      <Route path="/:modelType" exact element={<DynamicEntities />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/search" element={<SearchResultList />} />
    </Routes>
  );
};
export default Routers;
