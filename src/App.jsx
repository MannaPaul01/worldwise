import { React, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Pages/Homepage.jsx';
import Product from './Pages/Product.jsx';
import AppLayout from './Pages/AppLayout.jsx';
import Pricing from './Pages/Pricing.jsx';
import PageNotFound from './Pages/PageNotFound.jsx';
import Login from './Pages/Login.jsx';
import CityList from './Components/CityList.jsx';
import CountryList from './Components/CountryList.jsx';
import City from './Components/City.jsx';
import Form from './Components/Form.jsx';
import { CitiesProvider } from './Context/CitiesContext.jsx';
import {UserAuthContextProvider} from './Context/Auth.jsx';
// import { CitiesProvider } from './Context/CitiesContext.jsx';
// const Base_URL = 'http://localhost:8000';
export default function App() {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // useEffect(function () {
  //   async function fetchCities() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${Base_URL}/cities`);
  //       const data = await res.json();
  //       setCities(data);
  //     } catch {
  //       throw new Error('some error occured');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchCities();
  // }, []);
  return (
    <UserAuthContextProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="App" element={<AppLayout />} >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="Cities" element={<CityList />} />
              <Route path="Cities/:id" element={<City />} />
              <Route path="Country" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="Product" element={<Product />} />
            <Route path="Pricing" element={<Pricing />} />
            <Route path="Login" element={<Login />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </UserAuthContextProvider>
  );
}
