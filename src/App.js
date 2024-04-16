import './App.css';
import CityTable from './components/cityTable/CityTable';
function App() {
  
  return (
    <div className="container">
      <CityTable style={{ height: "50%" }} />
      <br />
      {/* <CurrentWeather style={{ height: "50%" }} /> */}
      <br />
      {/* <DailyForecast /> */}
    </div>
  );
}

export default App;
