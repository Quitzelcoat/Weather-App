export async function getWeatherData(location) {
  let apiKey = "";
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=yes&alerts=yes`,
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

async function processWeatherData(data) {
  if (!data || !data.current) {
    console.log("Invalid data format or missing current weather information.");
    return null;
  }

  const currentWeather = processCurrentWeather(data.current);
  const hourlyForecast = processHourlyForecast(
    data.forecast.forecastday[0].hour
  );
  const dailyForecast = processDailyForecast(
    data.forecast.forecastday.slice(0, 3)
  );

  return {
    current: currentWeather,
    hourly: hourlyForecast,
    daily: dailyForecast,
  };
}

async function processCurrentWeather(currentWeather) {
  const {
    condition,
    feelslike_c,
    wind_mph,
    humidity,
    vis_miles,
    temp_c,
    uv,
    gust_mph,
    air_quality,
  } = currentWeather;

  const weatherInfo = {
    Weather: condition.text,
    feelsLikeC: feelslike_c,
    wind: wind_mph,
    humidity: humidity,
    visibility: vis_miles,
    temperatureC: temp_c,
    uvIndex: uv,
    gust: gust_mph,
    airQuality: air_quality.pm10,
  };

  console.log(weatherInfo);
  return weatherInfo;
}

async function processHourlyForecast(hourlyData) {
  const next12Hours = hourlyData.slice(0, 13).map((hour) => ({
    time: hour.time,
    temperature: hour.temp_c,
    condition: hour.condition.text,
  }));

  console.log(next12Hours);
  return next12Hours;
}
async function processDailyForecast(dailyData) {
  const next3Days = dailyData.map((day) => ({
    date: day.date,
    condition: day.day.condition.text,
    chanceOfRain: day.day.daily_chance_of_rain,
    maxTemperature: day.day.maxtemp_c,
    minTemperature: day.day.mintemp_c,
  }));
  console.log(next3Days);
  return next3Days;
}
