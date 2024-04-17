import React, { useEffect, useState } from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import DailyForecast from "../dailyForecast/DailyForecast";

const CityTable = () => {
  const [cities, setCities] = useState(null);
  const [selectedCity, setSelectedCity] = useState(false);
  const [showWeatherModal, setShowWeatherModal] = useState(false);
  const [showForecastModal, setShowForecastModal] = useState(false);

  useEffect(() => {
    const geoUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?q=${cities}&limit=20`;

    fetch(geoUrl)
      .then((rs) => rs.json())
      .then((ct) => {
        setCities(ct?.results);
      })
      .catch((err) => console.error(err));
  }, [cities]);

  const handleClick = (city) => {
    setSelectedCity(city);
    setShowWeatherModal(true);
    setShowForecastModal(true);
    console.log("Clicked", city?.name);
  };

  const handleCloseWeatherModal = () => {
    setSelectedCity(null);
    setShowWeatherModal(false);
  };

  const handleCloseForecastModal = () => {
    setSelectedCity(null);
    setShowForecastModal(false);
  };

  return (
    <div className="flex flex-row content-center justify-center w-auto ml-24 mr-auto align-middle">
      <table className="w-full ml-20 border rounded-md shadow-md border-spacing-20 mr-52 pl-52 pr-60 max-w-32">
        <thead className="font-mono uppercase">
          <tr className="border border-l-0 border-solid bg-slate-200">
            <th className="pl-10 ">City</th>
            <th className="pl-20 ">Country</th>
            <th className="pl-20 ">Country Code</th>
            <th className="pl-20 pr-20 ">Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities &&
            cities.map((ct) => (
              <tr
                key={ct?.name}
                className="justify-center border border-spacing-25"
              >
                <td
                  className="pt-5 pb-5 pl-10 cursor-pointer hover:text-lime-600"
                  onClick={() => handleClick(ct)}
                >
                  {ct?.name}
                </td>
                <td className="pt-5 pb-5 pl-20">{ct?.cou_name_en}</td>
                <td className="pt-5 pb-5 pl-20">{ct?.country_code}</td>
                <td className="pt-5 pb-5">{ct?.timezone}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* {showWeatherModal && (
        <CurrentWeather city={selectedCity} onClose={handleCloseWeatherModal} />
      )} */}
      <br />
      {showForecastModal && (
        <DailyForecast
          city={selectedCity}
          onClose={handleCloseForecastModal}
          className="left-0 right-0 flex flex-column"
        />
      )}
    </div>
  );
};

export default CityTable;
