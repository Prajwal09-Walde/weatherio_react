import React, { useEffect, useState } from "react";

const CurrentWeather = ({ onClose, city }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city?.name}&appid=f13313911c17750a1f0ac321f0fb6ae2&units=metric`;

    fetch(weatherUrl)
      .then((rs) => rs.json())
      .then((wt) => {
        setWeather(wt);
        console.log(wt);
      });
    console.log("Current Weather:", weather);
  }, [city]);
  // if (!weather) {
  //     return (
  //         <p>Loading...</p>
  //     )
  // }
  return (
    <div className="w-full p-5 bg-gray-400 weather h-min">
      {weather && (
        <div className="flex items-center justify-between top">
          <div>
            <p className="m-0 font-mono text-sm font-normal leading-none tracking-normal city">
              {city?.name}
            </p>
            <p className="m-0 text-sm font-normal leading-none weather-description">
              {weather?.weather[0]?.description}
            </p>
          </div>
          <img
            className="weather-icon w-100"
            src={`icons/${weather?.weather[0]?.icon}.png`}
            alt=""
          />
          <div className="flex items-center justify-between bottom">
            <p className="mx-3 my-0 text-sm font-medium leading-none temperature">
              {Math.round(weather?.main?.temp)}°C
            </p>
            <div className="w-full details pl-20px">
              <div className="flex justify-between parameter-row">
                <span className="text-xs font-normal text-left parameter-label">
                  Details
                </span>
              </div>
              <div className="flex justify-between parameter-row">
                <span className="text-xs font-normal text-left parameter-label">
                  Feels Like:{" "}
                </span>
                <span className="text-xs font-medium text-right parameter-value">
                  {weather?.main?.feels_like} °C
                </span>
              </div>
              <div className="flex justify-between parameter-row">
                <span className="text-xs font-normal text-left parameter-label">
                  Wind:{" "}
                </span>
                <span className="text-xs font-medium text-right parameter-value">
                  {weather?.wind?.speed} km/h
                </span>
              </div>
              <div className="flex justify-between parameter-row">
                <span className="text-xs font-normal text-left parameter-label">
                  Humidity:{" "}
                </span>
                <span className="text-xs font-medium text-right parameter-value">
                  {weather?.main?.humidity} %
                </span>
              </div>
              <div className="flex justify-between parameter-row">
                <span className="text-xs font-normal text-left parameter-label">
                  Pressure:{" "}
                </span>
                <span className="text-xs font-medium text-right parameter-value">
                  {weather?.main?.pressure} hPa
                </span>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={onClose}
              type="button"
              className="absolute px-1 py-2 closeModal top-2 right-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentWeather;
