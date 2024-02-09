import React, { useContext } from 'react';
import Styles from './CityItem.module.css';
import { Link } from 'react-router-dom';
import City from './City.jsx';
import { CitiesContext } from '../Context/CitiesContext.jsx';

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position} = city;
  const {currentCity}=useContext(CitiesContext);
  return (
    <li>
      <Link className={`${Styles.cityItem} ${id===currentCity.id?Styles['cityItem--active']:''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`} >
        <span className={Styles.emoji}>{emoji}</span>
        <h3 className={Styles.name}>{cityName}</h3>
        <time className={Styles.date}>{formatDate(date)}</time>
        <button className={Styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}
