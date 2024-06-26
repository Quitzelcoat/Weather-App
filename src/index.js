import { weatherApiData } from "./weather-api.js";
import { displayWeatherData } from "./dom.js";

weatherApiData().getWeatherData("miami");

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

weatherLoc.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    await processBtnData();
    console.log("It worked");
  }
});
