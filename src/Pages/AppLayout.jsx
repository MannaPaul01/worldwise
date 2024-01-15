import React from 'react';
import Sidebar from '../Components/Sidebar.jsx';
import Styles from './AppLayout.module.css';
import Map from '../Components/Map.jsx';
export default function App() {
  return (
    <div className={Styles.app}>
      <Sidebar />
      <Map />
    </div>
  );
}
