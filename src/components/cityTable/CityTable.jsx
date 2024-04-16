import React, { useEffect, useState } from 'react';
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import DailyForecast from '../dailyForecast/DailyForecast';

const CityTable = () => {
    const [cities, setCities] = useState(null);
    const [selectedCity, setSelectedCity] = useState(false);
    const [showWeatherModal, setShowWeatherModal] = useState(false);
    const [showForecastModal, setShowForecastModal] = useState(false);

    useEffect(() => {
        const geoUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?q=${cities}&limit=20`;

        fetch(geoUrl)
            .then((rs) => rs.json())
            .then(ct => {
                setCities(ct?.results)
            })
            .catch(err => console.error(err))
    }, [cities])

    const handleClick = (city) => {
        setSelectedCity(city);
        setShowWeatherModal(true);
        setShowForecastModal(true);
        console.log("Clicked", city?.name)
    };

    const handleCloseWeatherModal = () => {
        setSelectedCity(null);
        setShowWeatherModal(false);
    };

    const handleCloseForecastModal = () => {
        setSelectedCity(null);
        setShowForecastModal(false);
    }

    return (
        <div className="align-middle justify-center flex flex-row w-auto content-center mr-auto ml-24">
            <table className="border border-spacing-20 ml-20 mr-52 pl-52 pr-60 max-w-32 w-full shadow-md rounded-md">
                <thead className='uppercase font-mono'>
                    <tr className='bg-slate-200 border border-solid border-l-0'>
                        <th className=' pl-10'>City</th>
                        <th className=' pl-20'>Country</th>
                        <th className=' pl-20'>Country Code</th>
                        <th className=' pl-20 pr-20'>Timezone</th>
                    </tr>
                </thead>
                <tbody>
                    {cities && cities.map((ct) => (
                        <tr key={ct?.name} className=' justify-center border  border-spacing-25'>
                            <td className='pb-5 pt-5 pl-10  hover:text-lime-600 cursor-pointer' onClick={() => handleClick(ct)}>{ct?.name}</td>
                            <td className='pb-5 pt-5 pl-20'>{ct?.cou_name_en}</td>
                            <td className='pb-5 pt-5 pl-20'>{ct?.country_code}</td>
                            <td className='pb-5 pt-5'>{ct?.timezone}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showWeatherModal && <CurrentWeather city={selectedCity} onClose={handleCloseWeatherModal} />}
            <br/>
            {showForecastModal && <DailyForecast city={selectedCity} onClose={handleCloseForecastModal} className="flex flex-column left-0 right-0"/>}
        </div>
    )
}

export default CityTable
