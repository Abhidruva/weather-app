

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';
const API_KEY = '4BKeYK7lqmRIEp2FYpTaJp66ZzLwUtxN';

const WeatherApp = () => {
    const [location, setLocation] = useState('');
    const [currentTemperature, setCurrentTemperature] = useState(null);
    const [forecastTemperatures, setForecastTemperatures] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchCurrentWeatherData('Bangalore');
      fetchForecastWeatherData('Bangalore');
    }, []);
  
    const fetchCurrentWeatherData = async (location) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=current&apikey=${API_KEY}`);
        setCurrentTemperature(response.data.data.timelines[0].intervals[0].values.temperature);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    const fetchForecastWeatherData = async (location) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=1d&apikey=${API_KEY}`);
        setForecastTemperatures(response.data.data.timelines[0].intervals.map(interval => interval.values.temperature));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    const handleLocationChange = (event) => {
      setLocation(event.target.value);
    };
  
    const handleLocationSubmit = () => {
      fetchCurrentWeatherData(location);
      fetchForecastWeatherData(location);
    };
  
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>Weather App</h1>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Enter location"
        />
        <button onClick={handleLocationSubmit}>Submit</button>
        <div className="weather-box">
        <p > <span className='location'>Current location: </span>
     {location || 'Bangalore'}</p>
        <div className="weather-details">
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {currentTemperature && (
            <div>
              <p><strong>Current Temperature:</strong> {currentTemperature}°C</p>
            </div>
          )}
          {forecastTemperatures && (
            <div>
              <p><strong>Forecasted Temperatures:</strong></p>
              {forecastTemperatures.map((temp, index) => (
                <p key={index}><strong>
                     Day {index + 1}:
                </strong>
                {temp}°C</p>
              ))}
            </div>
          )}
        </div>
        </div>
      </div>
    );
  };
  
  export default WeatherApp;

