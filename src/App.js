import React, { useState } from 'react';

const api = {
  key : "bd4b3d931f1502fe984ea597bef3479d",
  base : "http://api.weatherstack.com/current"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = evt => {
    if(evt.key === "Enter"){
      console.log(`${api.base}?access_key=${api.key}&query=${query}&units=f`)
      fetch(`${api.base}?access_key=${api.key}&query=${query}&units=f`)
      .then(res => res.json())
      .then(result => {
        setQuery('')
        setWeather(result)
        console.log(result);
      });
    }
  }

  const DateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="app">
      {(typeof weather.request != undefined) ? (
      <main>
        <div className="weather-box">
          <h2>{weather.location.name + ", " + weather.location.region}</h2>
          <h3>{DateBuilder(new Date())}</h3>
          <h1>{weather.current.temperature}°F</h1>
        </div>
        <div className="search-box">
          <input type="text" className="search-bar" placeholder="Search..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div>
      </main>
      ) : ('')}
    </div>
  );
}

export default App;
