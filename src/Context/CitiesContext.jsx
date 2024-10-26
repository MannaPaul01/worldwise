import { createContext, useContext, useEffect, useReducer, useState, useCallback } from "react";
const Base_URL = 'http://localhost:8000';

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ''
}
function reducer(state, action) {
    switch (action.type) {
        case 'cities/loaded':
            return { ...state, cities: action.payload, isLoading: false };
        case 'loading':
            return { ...state, isLoading: true, error: '' };
        case 'rejected':
            return { ...state, error: action.payload, isLoading: false };
        case 'currentCity/loaded':
            return { ...state, isLoading: false, currentCity: action.payload };
        case 'City/Created':
            return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload };
        case 'City/Deleted':
            return { ...state, isLoading: false, cities: state.cities.filter((city) => city.id !== action.payload) };

        default: throw new Error('Unknown action type');

    }

}
function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);
    useEffect(function () {
        async function fetchCities() {
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${Base_URL}/cities`);
                const data = await res.json();
                dispatch({ type: 'cities/loaded', payload: data });
            } catch {
                dispatch({ type: 'rejected', payload: 'some error occured in loading the cities' });
            }
        }
        fetchCities();
    }, []);

    // Called from city component to get all details about current city.
    const getCity = useCallback(
        async function getCity(id) {
            if (Number(id) === currentCity.id) return;
            dispatch({ type: 'loading' });
            try {
                const res = await fetch(`${Base_URL}/cities/${id}`);
                const data = await res.json();
                dispatch({ type: 'currentCity/loaded', payload: data })
            } catch {
                dispatch({ type: 'rejected', payload: 'some error occured in searching the city details' });
            }
        }, [currentCity.id]);
    //Called from the form where user gives inputs and new city is created in the citylist.
    async function createCity(newCity) {
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${Base_URL}/cities`, {
                method: 'POST',
                body: JSON.stringify(newCity),
                headers: {
                    "content-Type": "application/json"
                },
            });
            const data = await res.json();
            dispatch({ type: 'City/Created', payload: data });
        } catch {
            dispatch({ type: 'rejected', payload: 'some error occured in creating new city' });
        }
    };

    async function deleteCity(id) {
        dispatch({ type: 'loading' });
        try {
            const res = await fetch(`${Base_URL}/cities/${id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'City/Deleted', payload: id });
        } catch {
            dispatch({ type: 'rejected', payload: 'some error occured in deleting city' });
        }
    };


    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
            {children}
        </CitiesContext.Provider>
    );
}
// function useCities() {
//     const context = useContext(CitiesContext);
//     return context;
// }

export { CitiesProvider, CitiesContext };
