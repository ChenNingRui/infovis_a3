import React, { useState, useMemo } from 'react';
import MainPage from './Pages/MainPage';
import MyContext from './MyContext';

//jsons
import countriesCodeJson from './resources/country-codes-europe.json';
import stationsCodeJson from './resources/stations-europe.json';
import temperatureJson from './resources/temperature-monthly-europe.json';

function App() {
  let [yearBountry, setYearBountry] = useState({ 'min': 1939, 'max': 2017 });
  let [monthBountry, setmonthBountry] = useState({ min: 1, max: 12 });
  let [yearDuring, setyearDuring] = useState(localStorage.getItem('yearDuring') || '1966, 1990');
  let [monthDuring, setMonthDuring] = useState(localStorage.getItem('monthDuring') || '1, 12');

  let [countries, setCountries] = useState(JSON.parse(localStorage.getItem('countries')) || countriesCodeJson);
  let [selected, setSelected] = useState(null);

  // Make the context object:
  const usersContext = {
    selected,
    yearBountry,
    monthBountry,
    yearDuring,
    monthDuring,
    countries,
    countriesCodeJson,
    temperatureJson,
    stationsCodeJson,
    setCountries,
    setyearDuring,
    setmonthBountry,
    setYearBountry,
    setMonthDuring,
    setSelected
  };

  useMemo(() => {
    countriesCodeJson = JSON.parse(countriesCodeJson);
    temperatureJson = JSON.parse(temperatureJson);
    stationsCodeJson = JSON.parse(stationsCodeJson);
  }, []);

  return (
    <MyContext.Provider value={usersContext}>
      <MainPage />
    </MyContext.Provider>
  );
}

export default App;