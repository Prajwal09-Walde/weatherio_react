import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading } from 'react-accessible-accordion';


const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const DailyForecast = ({ onClose, city }) => {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city?.name}&appid=f13313911c17750a1f0ac321f0fb6ae2`

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
      <div className='forecast absolute mr-28 mt-16 border border-black bg-lime-400 shadow-md rounded-sm'>
        <label className='title text-2xl font-semibold'>Daily</label>
        <Accordion allowZeroExpanded>
          {forecast && forecast?.slice(0, 5).map((ft, i) => (
            <AccordionItem key={i}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className='daily-item rounded-br-xl h-10 m-1 items-center cursor-pointer flex text-sm px-1 py-5'>
                    <img src={`icons/${ft?.weather[0]?.icon}.png`} className='icon-small w-10' alt='' />
                    <label className='day cursor-pointer flex-1 font-semibold ml-4'>{forecastDays[i]}</label>
                    <label className='desc cursor-pointer flex-1 mr-4 text-center'>{ft?.weather[0]?.description}</label>
                    <label className='min-max text-gray-600'>{Math.round(ft?.main?.temp_max)-273}°Celsius / {Math.round(ft?.main?.temp_min)-273}°Celsius</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemButton>
                <div className='daily-details-grid gap-y-0 gap-x-3.5 grid flex-1 auto-cols-auto px-1 py-4'>
                  <div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Pressure: </label>
                    <label className='fd'>{ft?.main?.pressure} hPa</label>
                  </div>
                  <div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Humidity: </label>
                    <label className='fd'>{ft?.main?.humidity} %</label>
                  </div>
                  <div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Clouds: </label>
                    <label className='fd'>{ft?.clouds?.all}</label>
                  </div>
                  <div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Sea-Level: </label>
                    <label className='fd'>{ft?.main?.sea_level} m above sea-level</label>
                  </div><div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Wind-Speed: </label>
                    <label className='fd'>{ft?.wind?.speed} km/h</label>
                  </div><div className='daily-details-grid-item items-center flex h-8 justify-between'>
                    <label className='fd first: text-gray-600'>Feels-Like:</label>
                    <label className='fd'>{ft?.main?.feels_like} °C</label>
                  </div>
                </div>
              </AccordionItemButton>
            </AccordionItem>
          ))}
        </Accordion>
        <div>
          <button onClick={onClose} type='button' className='button pb-4'>
            Close
          </button>
        </div>
      </div>
    </>
  )
}

export default DailyForecast
