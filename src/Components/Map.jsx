import React from 'react';
import Styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Map() {
  const navigate=useNavigate();
  const [searchPharams,setSearchPharams]=useSearchParams();
  const lat=searchPharams.get("lat");
  const lng=searchPharams.get("lng");
  return (
    <div className={Styles.mapContainer} onClick={()=>{
      navigate("form");
    }}>
      <h1>map container</h1>
      <h1>
        Position:{lng},{lat}
      </h1>
      <button onClick={()=>{setSearchPharams({lat:20,lng:30})}}>Change position</button>
    </div>
  );
}
