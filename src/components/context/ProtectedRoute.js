import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAuth } from './UserAuthContext';

const ProtectedRoute = ({ children }) => {

  const navigate = useNavigate()
  const location = useLocation();

  const { user } = useUserAuth();

  if (!user) {
    return navigate("/login")
  }

  return children
}

export default ProtectedRoute;