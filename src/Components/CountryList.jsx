import React, { useContext } from 'react';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import Styles from './CountryList.module.css';
import CountryItem from './CountryItem.jsx';
import { CitiesProvider, CitiesContext } from '../Context/CitiesContext.jsx';
export default function CountryList() {
    const {cities,isLoading}=useContext(CitiesContext);
    if (isLoading) return <Spinner />;
    if (!cities.length) return <Message message='Add your first city by clicking
    on the city on the map'/>;
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country
        )) return [...arr, { country: city.country, emoji: city.emoji,id:city.id }];
        else return arr;
    }, []);
    return (
        <ul className={Styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.country}/>
            ))}
        </ul>

    );
}
