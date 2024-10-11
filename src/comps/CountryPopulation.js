import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const CountryPopulation = () => {

  const [countryName, setCountryName] = useState('');
  const [population, setPopulation] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'b37f0d040b7eee094b4e35fcf2c1f98e';

  // Fetch Population and Currency API
  const fetchPopulation = () => {
    setLoading(true);
    setError(null);
    axios.get(`https://restcountries.com/v3.1/name/${countryName}`)

      .then(response => {
        const country = response.data[0];
        setPopulation(country.population);
        setCurrency(country.currencies);
        setLoading(false);


        fetchTemperature(country.capital[0]);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  // Fetch Temperature API

  const fetchTemperature = (capital) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        const temp = response.data.main.temp;
        setTemperature(temp);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });



  };

  // Handle Input Change
  const handleInputChange = (e) => {
    setCountryName(e.target.value);
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPopulation();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Country :</label>
          <input type='text'
            placeholder='Enter the Country Name'
            onChange={handleInputChange}
          />
          <button type="submit">Get Population, Currency & Temperature</button>
        </form>
      </div>

      {loading && <p>Loading........</p>}
      {error && <p>Error: {error.message}</p>}

      {population !== null && <p> The Population of {countryName} is: {population}</p>}

      {currency !== null && (
        <div>
          <h3>Currency Information:</h3>
          {Object.keys(currency).map((key) => (
            <p key={key}>
              {currency[key].name
              } (
                {currency[key].symbol}
                )
            </p>
          ))}
        </div>
      )}

      {
      temperature !== null && 
      <p> The current temperature in the capital is: {temperature} °C</p>
      }
    </div>
  )
};

export default CountryPopulation;



