import { getWeatherData } from "./weather-api.js";
import { weatherDom } from "./dom.js";

async function updateWeatherDom(location) {
  const weatherData = await getWeatherData(location);
  if (weatherData) {
    weatherDom().updateCurrentWeatherDom(weatherData.current);
    weatherDom().updateLocationWeatherDom(weatherData.location);
    weatherDom().updateHourlyWeatherDom(weatherData.hourly);
    weatherDom().updateDailyWeatherDom(weatherData.daily);
  }
}

const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

locationBtn.addEventListener("click", async () => {
  const weatherData = await getWeatherData(weatherLoc.value);
  updateWeatherDom(weatherData.current);
  weatherLoc.value = "";
});
