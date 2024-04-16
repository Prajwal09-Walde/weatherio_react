import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion';


const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DailyForecast = ({ onClose, city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city?.name}&appid=f13313911c17750a1f0ac321f0fb6ae2&limit=100`

    const fetchApi = async () => {
      try {
        const rs = await fetch(forecastUrl);
        if (!rs.ok) {
          throw new Error("Failed to fetch api");
        }
        const ft = await rs.json();
        // const { list, ...rest } = ft;
        setForecast(ft?.list || []);
        console.log(ft)
      } catch (err) {
        console.error("Error while fetching api")
      }
    }
    fetchApi();
  }, [city])


  const dayInAWeek = new Date().getDay();
  const forecastDays = weekDays.slice(dayInAWeek, weekDays.length).concat(weekDays.slice(0, dayInAWeek));

  return (
    <>
      <label className='title text-2xl font-semibold text-white'>Daily</label>
      {<Accordion allowZeroExpanded>
        {forecast && forecast?.slice(0, 5).map((ft, i) => (
          <AccordionItem key={i}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-item rounded-br-xl h-10 m-1 items-center cursor-pointer flex text-sm px-1 py-5'>
                  <img src={`icons/${ft?.weather[0].icon}.png`} className='icon-small' alt='' />
                  <label className='day cursor-pointer flex-1 font-semibold ml-4'>{forecastDays[i]}</label>
                  <label className='desc cursor-pointer flex-1 mr-4 text-center'>{ft?.weather?.description}</label>
                  <label className='min-max'>{Math.round(ft?.main?.temp_max)}°Celsius / {Math.round(ft?.main?.temp_min)}°Celsius</label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemButton>
              <div className='daily-details-grid'>
                <div className='daily-details-grid-item'>
                  <label>Pressure: </label>
                  <label>{ft?.main?.pressure} hPa</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Humidity: </label>
                  <label>{ft?.main?.humidity} %</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Clouds: </label>
                  <label>{ft?.clouds?.all}</label>
                </div>
                <div className='daily-details-grid-item'>
                  <label>Sea-Level: </label>
                  <label>{ft?.main?.sea_level} m above sea-level</label>
                </div><div className='daily-details-grid-item'>
                  <label>Wind-Speed: </label>
                  <label>{ft?.wind?.speed} km/h</label>
                </div><div className='daily-details-grid-item'>
                  <label>Feels-Like:</label>
                  <label>{ft?.main?.feels_like} °C</label>
                </div>
              </div>
            </AccordionItemButton>
          </AccordionItem>
        ))}
      </Accordion>}
      <div>
        <button onClick={onClose} type='button'>
          Close
        </button>
      </div>
    </>
  )
}

export default DailyForecast
