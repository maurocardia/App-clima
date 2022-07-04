import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FaCloud, FaWind} from 'react-icons/fa'
import {RiTempColdLine} from 'react-icons/ri'

const Weather = () => {
    const [data,setData]= useState({})
    const [temp,setTemp]= useState("metric")
    const [indexDegrees,setIndexDegrees]=useState(true)

    const changeToFahrenheit=()=>{
        setIndexDegrees(!indexDegrees)
        if(temp=="metric"){
            setTemp("imperial")
        }else{ setTemp("metric")}
    }

    const [iconWeather, setIconWeather]= useState()
    const urlIcon = `http://openweathermap.org/img/wn/${iconWeather}@2x.png`

   console.log(indexDegrees)


    useEffect(()=>{
       const success = pos => {
        const lat = pos.coords.latitude
        const lon = pos.coords.longitude
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=acd968f827b385515cb38978840240dd&units=${temp}`)
        .then(res => {setData(res.data)
                     setIconWeather(res?.data.weather[0].icon)})
        
        
        }
        navigator.geolocation.getCurrentPosition(success)

    },[temp, iconWeather])   
    console.log(data)
   console.log(iconWeather)
   
  

    return (
        <div className='cardWeather'>
            <h1>Weather App</h1>
            <h3>{data.name}, {data.sys?.country}</h3>
            <div className='containerInfo'>
                <div>
                    <img src={urlIcon} alt="" className='cloud' />
                    <h2>{data.main?.temp} {indexDegrees? "°C":"°K"} </h2>

                </div>   
                <div>
                    <li><b>"{data.weather?.[0].description}"</b></li>
                    <li><b><FaWind/> Wind speed</b> {data.wind?.speed} {indexDegrees? "m/s":"mll/h"} </li>
                    <li><b><FaCloud/> Clouds</b> {data.clouds?.all}%</li>
                    <li><b><RiTempColdLine/> Pressure</b> {data.main?.pressure}mb</li>
                </div>
            </div>
            <div className='containerButton' >
                <button onClick={changeToFahrenheit}>Change to {indexDegrees? "°K":"°C"}</button>
            </div>
            
            
        </div>
    );

};

export default Weather;