import React, { useContext, useEffect, useState } from 'react';
import Styles from './Map.module.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import { CitiesContext } from '../Context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';

export default function Map() {
  const navigate = useNavigate();
  const { cities } = useContext(CitiesContext);
  const { isLoadingPosition, geolocationPosition, getPosition } = useGeolocation();
  const [searchPharams, setSearchPharams] = useSearchParams();
  const mapLat = searchPharams.get("lat");
  const mapLng = searchPharams.get("lng");
  const [mapPosition, setMapPosition] = useState([28, 77]);

  useEffect(function () {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(function () {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      console.log(geolocationPosition);
    }
  }, [geolocationPosition]);
  return (
    <div className={Styles.mapContainer} >
      {!geolocationPosition && (
        <Button type='position' onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your location'}
        </Button>
      )}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={Styles.map}>
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>

  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent(
    {
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    });
}
