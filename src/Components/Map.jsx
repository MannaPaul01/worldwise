import React, { useContext, useState } from 'react';
import Styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CitiesContext } from '../Context/CitiesContext';

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useContext(CitiesContext);
  const [searchPharams, setSearchPharams] = useSearchParams();
  const lat = searchPharams.get("lat");
  const lng = searchPharams.get("lng");
  const [mapPosition, setMapPosition] = useState([28, 77]);
  return (
    <div className={Styles.mapContainer} onClick={() => {
      navigate("form");
    }}>
      {/* <h1>map container</h1>
      <h1>
        Position:{lng},{lat}
      </h1>
      <button onClick={()=>{setSearchPharams({lat:20,lng:30})}}>Change position</button> */}
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={Styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>

  );
}
