import { useEffect, useState } from "react";
import "./App.css";
import Icons from "./Components/Icons";
import DayAndHour from "./Components/DayAndHour/DayAndHour";
import Autocomplete from "react-autocomplete";

const items = [
  "Montevideo",
  "Santiago",
  "Buenos Aires",
  "Bogota",
  "Lima",
  "Mexico City",
];
function App() {
  const [search, setSearch] = useState("Montevideo");
  const [values, setValues] = useState("");
  const [icon, setIcon] = useState("");

  const [filteredItems, setFilteredItems] = useState(items);

  const API_KEY = "f0fda2125c7d2240644685bc30e9ea54";

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units=metric&appid=${API_KEY}`;

  const getData = async () => {
    await fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.cod >= 400) {
          setValues(false);
        } else {
          console.log(data);
          console.log(data.weather[0].main);
          setIcon(data.weather[0].main);
          setValues(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleSearch = (e) => {
  //   if (e.key === "Enter") {
  //     setSearch(e.target.value);
  //   }
  // };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredCities = items.filter((city) =>
      city.toLowerCase().includes(searchValue)
    );
    setFilteredItems(filteredCities);
    setSearch(e.target.value);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [search]);

  return (
    <>
      <div className="container">
        <h2>React Weather App</h2>
        <div className="row">
          {/* <input
            onKeyDown={handleSearch}
            type="text"
            placeholder="Escribe una cuidad o pais"
            autoFocus
          /> */}

          <Autocomplete
            items={filteredItems}
            getItemValue={(item) => item}
            renderItem={(item, isHighlighted) => (
              <div
                style={{ background: isHighlighted ? "lightgray" : "white" }}
                key={item}
              >
                {item}
              </div>
            )}
            value={search}
            onChange={handleSearch}
            onSelect={(val) => setSearch(val)}
          />
        </div>
      </div>

      <div className="card">
        {values ? (
          <div className="card-container">
            <div className="title">
              <h1 className="city-name">{values.name}</h1>

              <div style={{ display: "flex" }}>
                <DayAndHour />
                <p className="description">
                  {", "}
                  {values.weather[0].description[0].toUpperCase() +
                    values.weather[0].description.slice(1)}
                </p>
              </div>
            </div>

            <div className="temp-container">
              <div className="temperature">
                <p className="temp">{values.main.temp.toFixed(0)}&deg;</p>
                <p>
                  Sensación térmica de {values.main.feels_like.toFixed(0)}&deg;
                </p>
              </div>
              <div className="img">
                <img className="icon" src={Icons(icon)} alt="icon-weather" />
              </div>
            </div>

            <div className="card-footer">
              <p className="temp-max-min">
                {values.main.temp_min.toFixed(0)}&deg; |{" "}
                {values.main.temp_max.toFixed(0)}&deg;
              </p>
            </div>

            {/* <p>Humidity: {values.main.humidity}%</p>
            <p>Wind speed: {values.wind.speed} m/s</p>
            <p>Wind direction: {values.wind.deg}&deg;</p>
            <p>Clouds: {values.clouds.all}%</p>
            <p>Clouds: {values.rain["1h"]} mm</p> */}
            {console.log(values)}
          </div>
        ) : (
          <h2>{"Ciudad no encontrada"}</h2>
        )}
      </div>
    </>
  );
}

export default App;
