import React, { useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
const [city,SetCity] = useState('');
const [weatherData, setWeatherData] = useState(null);
const [error, setError] = useState(null);
const HandleChange=(event)=>{
  SetCity(event.target.value);
}
const apiKey = '6073e64254e368f22b0ea8940fbb4541';
  
const handleClick=async(event)=>{
  event.preventDefault();
  if (!city) return;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    setWeatherData(response.data);
    setError(null);
  } catch (err) {
    setError("City not found. Please try again.");
    setWeatherData(null);
  }
}
  return (<>
    <div className="container">
    <h1>Weather App</h1>
    <div className="weather-info">
      <input type="text" id="city-input" placeholder="Enter city name" value={city} onChange={HandleChange}/>
      <button onClick={handleClick}>Get Weather</button>
    </div>

    {error && <p className="error">{error}</p>}

{weatherData && (
  <div className="weather-info">
    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
    <p>Temperature: {weatherData.main.temp}°C</p>
    <p>Weather: {weatherData.weather[0].description}</p>
    <p>Humidity: {weatherData.main.humidity}%</p>
    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
  </div>
)}
    </div>
  </>
  )
}

export default App;
