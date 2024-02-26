import React, { useContext, useEffect } from 'react'
import { UserAuthContext } from '../Context/Auth';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(UserAuthContext);
    useEffect(function () {
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated])
    return isAuthenticated ? children : null;
}
