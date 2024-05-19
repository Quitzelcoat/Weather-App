import { weatherApiData } from "./weather-api.js";
import { weatherDom } from "./dom.js";

const weather = weatherDom();

async function updateWeatherDom(location) {
  const weatherData = await weatherApiData().getWeatherData(location);
  if (weatherData) {
    weather.updateCurrentWeatherDom(weatherData.current);
    weather.updateLocationWeatherDom(weatherData.location);
    weather.updateHourlyWeatherDom(weatherData.hourly);
    weather.updateDailyWeatherDom(weatherData.daily);
  }
}

const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

locationBtn.addEventListener("click", () => {
  const valuePut = weatherLoc.value;
  console.log(valuePut);

  weatherApiData().getWeatherData(valuePut);
  updateWeatherDom(valuePut);
  weatherLoc.value = "";
});
