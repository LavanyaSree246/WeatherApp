import { useState, useEffect } from 'react';
import './App.css'
import search1 from "./assets/search1.jpeg";
import Sun from "./assets/Sun.png";
import snow from "./assets/snow.jpeg";
import drizzle from "./assets/drizzle.jpeg";
import rain from "./assets/rain.jpeg";
import cloud from "./assets/cloud.jpeg";
import Season from "./assets/Season.jpg";

const WeatherDetails = ({ icon, temp, city, country, lat, lon, humidity, wind }) => {
  return (<>
    <div className='image'>
      <img src={icon} alt="sun" />
    </div>
    <div className='temp'>{temp}°C</div>
    <div className='location'>{city}</div>
    <div className='country'>{country}</div>
    <div className='cord'><div>
      <span className='lat'>latitude</span>
      <span>{lat}</span>
    </div>
      <div>

        <span className='lon'>longitude</span>
        <span>{lon}</span>
      </div>
    </div>
    <div className="data-container">
      <div className="element">
        <div className="data">
          <div className="humidity-precentage">{humidity}%</div>
          <div className="text">Humidity</div>
        </div>
      </div>
      <div className="element">
        <div className="data">
          <div className="wind-percentage">{wind}</div>
          <div className="text">Wind speed</div>
        </div>
      </div>
    </div>
  </>);
}


function App() {
  let api_key = "282e6ded63a04db6145ba4dd074c861b"
  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(snow);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [wind, setWind] = useState(0);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": Sun,
    "01n": Sun,
    "02d": cloud,
    "02n": cloud,
    "03d": drizzle,
    "03n": drizzle,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "010d": rain,
    "010n": rain,
    "013d": snow,
    "013n": snow,

  };






  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      //console.log(data);
      if (data.cod === "404") {
        console.error("City not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] ||Sun);
      setCityNotFound(false);



    } catch (error) {
      console.error("An error occured:", error.message);
      setError("An error ocurred while fetching data");
    } finally {
      setLoading(false)
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };
  useEffect(function () {
    search();
  }, []);
  return (
    <>

      <div className='container'>
        <div className='input-container'>
          <input type='text' className='cityInput' placeholder='Search City' onChange={handleCity} value={text}
            onKeyDown={handleKeyDown} />
          <div className='search-icon' onClick={() => search()}>
            <img src={search1} alt="Search" />
          </div>
        </div>
        {loading && <div className='loading-message'>Loading...</div>}
        {error && <div className='error-message'>{error}</div>}
        {cityNotFound && <div className='city-not-found'>city-not-found</div>}
        {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country}
          lat={lat} lon={lon} humidity={humidity} wind={wind} />}



        <p className='copyright'>Designed by <span> Lavanya Sree</span></p>
      </div>

    </>
  )
}

export default App
