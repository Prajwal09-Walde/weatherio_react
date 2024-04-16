import React, { useEffect, useState } from 'react';

const CurrentWeather = ({onClose, city}) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city?.name}&appid=f13313911c17750a1f0ac321f0fb6ae2&units=metric`;

        fetch(weatherUrl)
            .then((rs) => rs.json())
            .then(wt => {
                setWeather(wt)
                console.log(wt)
            })
            console.log("Current Weather:", weather)
    }, [city])
    // if (!weather) {
    //     return (
    //         <p>Loading...</p>
    //     )
    // }
    return (
        <div className='weather h-1/4 absolute top-2/4 left-2/4 translate-x-2/4 translate-y-1/2 leading-6 px-4 py-7 rounded-sm max-w-100 min-w-60 border mb-96 border-black text-black shadow-lg bg-sky-500'>
            {weather && (
                <div className='top flex justify-between items-center'>
                    <div>
                        <p className='city font-normal font-mono text-sm leading-none m-0 tracking-normal'>{city?.name}</p>
                        <p className='weather-description font-normal text-sm leading-none m-0'>{weather?.weather[0]?.description}</p>
                    </div>
                    <img
                        className='weather-icon w-100'
                        src={`icons/${weather?.weather[0]?.icon}.png`}
                        alt=''
                    />
                    <div className='bottom flex justify-between items-center'>
                        <p className="temperature font-medium text-sm leading-none mx-3 my-0">{Math.round(weather?.main?.temp)}°C</p>
                        <div className='details w-full pl-20px'>
                            <div className='parameter-row flex justify-between'>
                                <span className='parameter-label text-left font-normal text-xs'>Details</span>
                            </div>
                            <div className='parameter-row flex justify-between'>
                                <span className='parameter-label text-left font-normal text-xs'>Feels Like: </span>
                                <span className='parameter-value text-right font-medium text-xs'>{weather?.main?.feels_like} °C</span>
                            </div>
                            <div className='parameter-row flex justify-between'>
                                <span className='parameter-label text-left font-normal text-xs'>Wind: </span>
                                <span className='parameter-value text-right font-medium text-xs'>{weather?.wind?.speed} km/h</span>
                            </div>
                            <div className='parameter-row flex justify-between'>
                                <span className='parameter-label text-left font-normal text-xs'>Humidity: </span>
                                <span className='parameter-value text-right font-medium text-xs'>{weather?.main?.humidity} %</span>
                            </div>
                            <div className='parameter-row flex justify-between'>
                                <span className='parameter-label text-left font-normal text-xs'>Pressure: </span>
                                <span className='parameter-value text-right font-medium text-xs'>{weather?.main?.pressure} hPa</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={onClose} type='button' className="closeModal absolute top-2 right-2 px-1 py-2">
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CurrentWeather;
