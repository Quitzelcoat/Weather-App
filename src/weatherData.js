export function processWeatherData(data) {
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
  };

  console.log(weatherInfo);
  return weatherInfo;
}
