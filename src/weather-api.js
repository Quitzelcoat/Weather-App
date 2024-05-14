export async function getWeatherData() {
  const weatherLoc = document.getElementById("weatherLoc");

  let apiKey = "0d353533d1cd4029975135630240705";
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${weatherLoc.value}&aqi=no`,
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

function processWeatherData(data) {
  if (!data || !data.current) {
    console.log("Please provide the correct data");
  }

  const {
    condition,
    feelslike_c,
    feelslike_f,
    wind_mph,
    humidity,
    vis_miles,
    temp_c,
    temp_f,
    uv,
    gust_mph,
  } = data.current;

  const weatherInfo = {
    Weather: condition,
    feelsLikeC: feelslike_c,
    feelsLikef: feelslike_f,
    wind: wind_mph,
    humidity: humidity,
    visibility: vis_miles,
    temperatureC: temp_c,
    temperatureF: temp_f,
    uvIndex: uv,
    gust: gust_mph,
  };

  console.log(weatherInfo);
  return weatherInfo;
}
