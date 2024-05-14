import { getWeatherData } from "./weather-api.js";

const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

locationBtn.addEventListener("click", () => {
  getWeatherData();
  weatherLoc.value = "";
});
