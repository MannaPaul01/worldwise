import React from 'react';
import Sidebar from '../Components/Sidebar.jsx';
import Styles from './AppLayout.module.css';
import Map from '../Components/Map.jsx';
import User from '../Components/User.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
export default function App() {

  return (
    <ProtectedRoute>
      <div className={Styles.app}>
        <Sidebar />
        <Map />
        <User />
      </div>
    </ProtectedRoute>

  );
}
