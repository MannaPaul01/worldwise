// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useContext, useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import Backbutton from "./Backbutton.jsx";
import Message from "./Message.jsx";
import Spinner from "./Spinner.jsx";
import { CitiesContext } from "../Context/CitiesContext.jsx";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const { createCity, isLoading } = useContext(CitiesContext);
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [geocodingError, setGeocodingError] = useState('');
  const [searchPharams, setSearchPharams] = useSearchParams();
  const lat = searchPharams.get('lat');
  const lng = searchPharams.get('lng');
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };
    setCityName('');
    setCountry('');
    setEmoji('');
    setNotes('');
    createCity(newCity);
  }

  useEffect(function () {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocode(true);
        setGeocodingError('');
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        if (!data.countryCode) {
          throw new Error("That does't seems to be a city. Click somewhere else..")
        }
        setCityName(data.city || data.locality || ' ');
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));

      } catch (error) {
        console.log(error);
        setGeocodingError(error.message);

      } finally {
        setIsLoadingGeocode(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);
  if (isLoadingGeocode) return <Spinner />;
  if (geocodingError) return <Message message={geocodingError} />;
  return (
    <form className={`${styles.form}  ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id='date' selected={date} onChange={date => setDate(date)} dateFormat={'dd/MM/yyyy'} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <Backbutton />
      </div>
    </form>
  );
}

export default Form;
