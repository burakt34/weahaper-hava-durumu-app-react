import { useState, useEffect } from 'react'
import axios from "axios";
import './App.css'

function App() {
  null
  const [weatherData, setWeaterData] = useState()
  const [location, setLocation] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API}&q=${location}&days=4&aqi=yes&alerts=yes
        `)
        setWeaterData(response.data)
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    };
    if (location) {
      fetchData();
    }
  }, [location])

  const handleLocationChange = (event) => {
    setLocation(event.target.value)
  }

  return (
    <>
      <div className='app-container'>
        <h1 className='app-title'>Hava Durumu Uygulaması</h1>
        <div className="input-container">
          <input className='location-input' type="text" name="" id="" placeholder='Şehir Giriniz'
            value={location} onChange={handleLocationChange} />
        </div>
      </div>
     
     {weatherData && (
      <div className='weather-container'>
        {weatherData.forecast.forecastday.map((day)=>(
          <div className='day-container' key={day.date}>

            <h2 className='date'>{day.date}</h2>

            <img src={day.day.condition.icon} alt="day.day.condition.text" className='weather-icon' />
            <p className='temperature'>{day.day.avgtemp_c} C</p>
            <p className='temperature'>{day.day.condition.text} C</p>

          </div>
        ))}

      </div>
     )}

    </>
  )
}

export default App
