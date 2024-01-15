import React from 'react';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import Styles from './CityList.module.css';
import CityItem from './CityItem.jsx';
export default function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message='Add your first city by clicking
    on the city on the map'/>;
    return (
        <ul className={Styles.cityList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>

    );
}
