import { createContext, useContext, useEffect, useState } from "react";
const Base_URL = 'http://localhost:8000';

const CitiesContext = createContext();
function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

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

    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${Base_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            throw new Error('Some error occured');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
            {children}
        </CitiesContext.Provider>
    );
}
// function useCities() {
//     const context = useContext(CitiesContext);
//     return context;
// }

export { CitiesProvider, CitiesContext };
