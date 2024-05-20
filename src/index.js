import { weatherApiData } from "./weather-api.js";
import { displayWeatherData } from "./dom.js";

const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

async function processBtnData() {
  const valuePut = weatherLoc.value;

  const weatherData = await weatherApiData().getWeatherData(valuePut);
  if (weatherData) {
    displayWeatherData(weatherData);
  }

  weatherLoc.value = "";
}

locationBtn.addEventListener("click", async () => {
  processBtnData();
});
