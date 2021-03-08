import React, { useState } from 'react';
import axios from 'axios';

const weatherApi = {
  base: 'http://api.openweathermap.org/data/2.5/weather',
  key: '4702ca07cd3695ef6912b5c463e410ab',
}

export default function App() {
  const [weather, setWeather] = useState('');
  const [query, setQuery] = useState('');

  const search = evt => {
    if(evt.key === "Enter")
    axios(`${weatherApi.base}?q=${query}&appid=${weatherApi.key}&units=imperial`)
    .then(response => {
      console.log(response.data);
      setWeather(response.data);
      setQuery('');
    })
    .catch(err => console.error(err))
  }

  const timeBuilder = (d) => {
    var hour = d.getHours();
    var minutes = d.getMinutes();

    if(hour < 10){
      hour = "0" + hour;
    }
    if(minutes < 10){
      minutes = "0" + minutes;
    }

    if(hour > 12){
      hour -= 12;
      return hour + ":" + minutes + "PM";
    }else{
      return hour + ":" + minutes + "AM";
    }

  }

  const tempBuilder = (temp, cloudiness) => {
    const t = 120;
    const tempNormalized = (temp / t) * 100;
    const saturation = 100 / (cloudiness / 100);
    const hue = 250 - tempNormalized;

    console.log(temp, cloudiness);

    console.log(hue, saturation);

    const color = `hsl(${hue * 2.2}, ${saturation}%, 80%)`;

    return color;
  }

  return (
    <div 
      className="app" 
      id="app" 
      style={{
          backgroundColor : (weather.main !== undefined) ? tempBuilder(weather.main.temp, weather.clouds.all) : ''
      }}>
      <div className="search-box">
        <input type="text" required className="search-bar" placeholder="Search..." value={query} onChange={e => {setQuery(e.target.value)}} onKeyPress={search}/>  
      </div> 
      {(weather.main !== undefined) ? (
        <div className="weather-box">
          <h3 className="location">{weather.name}</h3>
          <h1 className="temperature">{Math.round(weather.main.temp)}°F</h1>
          <h2 className="description">{weather.weather[0].description.toString().toUpperCase()}</h2>
          <h6 className="time">Updated: {timeBuilder(new Date())}</h6>
        </div>   
      ) : ('')}
    </div>
  );
}