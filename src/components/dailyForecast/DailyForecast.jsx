import React, { useEffect, useState } from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DailyForecast = ({ onClose, city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city?.name}&appid=f13313911c17750a1f0ac321f0fb6ae2`;

    const fetchApi = async () => {
      try {
        const rs = await fetch(forecastUrl);
        if (!rs.ok) {
          throw new Error("Failed to fetch api");
        }
        const ft = await rs.json();
        // const { list, ...rest } = ft;
        setForecast(ft?.list || []);
        console.log(ft);
      } catch (err) {
        console.error("Error while fetching api");
      }
    };
    fetchApi();
  }, [city]);

  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays
    .slice(dayInAWeek, weekDays.length)
    .concat(weekDays.slice(0, dayInAWeek));

  return (
    <>
      <div>
        <button onClick={onClose} type="button" className="pb-4 button">
          Close
        </button>
      </div>
      <div className="fixed border border-black rounded-sm shadow-md forecast mr-28 bg-lime-400">
        <CurrentWeather city={city} onClose={onClose} />
        <label className="text-2xl font-semibold title">Daily</label>
        <div className="w-[70vw] h-[50vh]  overflow-y-scroll p-10 ">
          {forecast &&
            forecast?.slice(0, 5).map((ft, i) => (
              <div key={i} className="">
                <div className="flex items-center h-10 px-1 py-5 m-1 text-sm cursor-pointer daily-item rounded-br-xl">
                  <img
                    src={`icons/${ft?.weather[0]?.icon}.png`}
                    className="w-10 icon-small"
                    alt=""
                  />
                  <label className="flex-1 ml-4 font-semibold cursor-pointer day">
                    {forecastDays[i]}
                  </label>
                  <label className="flex-1 mr-4 text-center cursor-pointer desc">
                    {ft?.weather[0]?.description}
                  </label>
                  <label className="text-gray-600 min-max">
                    {Math.round(ft?.main?.temp_max) - 273}°Celsius /{" "}
                    {Math.round(ft?.main?.temp_min) - 273}°Celsius
                  </label>
                </div>
                <div className=" gap-y-0 gap-x-3.5 grid flex-1 auto-cols-auto px-1 py-4">
                  <div className="flex items-center justify-between h-8 ">
                    <label className="text-gray-600 fd first:">
                      Pressure:{" "}
                    </label>
                    <label className="fd">{ft?.main?.pressure} hPa</label>
                  </div>
                  <div className="flex items-center justify-between h-8 ">
                    <label className="text-gray-600 fd first:">
                      Humidity:{" "}
                    </label>
                    <label className="fd">{ft?.main?.humidity} %</label>
                  </div>
                  <div className="flex items-center justify-between h-8 ">
                    <label className="text-gray-600 fd first:">Clouds: </label>
                    <label className="fd">{ft?.clouds?.all}</label>
                  </div>
                  <div className="flex items-center justify-between h-8 daily-details-grid-item">
                    <label className="text-gray-600 fd first:">
                      Sea-Level:{" "}
                    </label>
                    <label className="fd">
                      {ft?.main?.sea_level} m above sea-level
                    </label>
                  </div>
                  <div className="flex items-center justify-between h-8 daily-details-grid-item">
                    <label className="text-gray-600 fd first:">
                      Wind-Speed:{" "}
                    </label>
                    <label className="fd">{ft?.wind?.speed} km/h</label>
                  </div>
                  <div className="flex items-center justify-between h-8 daily-details-grid-item">
                    <label className="text-gray-600 fd first:">
                      Feels-Like:
                    </label>
                    <label className="fd">{ft?.main?.feels_like} °C</label>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default DailyForecast;
