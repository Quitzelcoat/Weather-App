import { processWeatherData } from "./weatherData.js";

export async function getWeatherData(location) {
  // const weatherLoc = document.getElementById("weatherLoc").value;

  let apiKey = "";
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    return processWeatherData(data);
  } catch (error) {
    console.log("Error fetching the image: ", error);
    return null;
  }
}
