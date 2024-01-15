import { useContext, useEffect, useState } from "react";
const Base_URL = 'http://localhost:8000';

const CitiesContext = useContext();
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(function () {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${Base_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                throw new Error('some error occured');
            } finally {
                setIsLoading(false);
            }
        }
        fetchCities();
    }, []);
    return (
        <CitiesContext.Provider
            values={
                { cities, isLoading, }
            }>
            {children}
        </CitiesContext.Provider>
    );
}

export { CitiesProvider };
