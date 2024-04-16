import './App.css';
import Navbar from './components/Navbar/Navbar';
import CityTable from './components/cityTable/CityTable';
function App() {
  
  return (
    <div className="container">
      <Navbar/>
      <br/>
      <CityTable style={{ height: "50%" }} />
      <br />
      {/* <CurrentWeather style={{ height: "50%" }} /> */}
      <br />
      {/* <DailyForecast /> */}
    </div>
  );
}

export default App;
