export const weatherApiData = () => {
  async function getWeatherData(location) {
    let apiKey = "0d353533d1cd4029975135630240705";
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=yes&alerts=yes`,
        { mode: "cors" }
      );
      const data = await response.json();
      console.log(data);
      const processedData = await processWeatherData(data);
      return processedData;
    } catch (error) {
      console.log("Error fetching the image: ", error);
      return null;
    }
  }

  async function processWeatherData(data) {
    if (!data || !data.current) {
      console.log(
        "Invalid data format or missing current weather information."
      );
      return null;
    }

    const currentWeather = await processCurrentWeather(data.current);
    const weatherLocation = await currentLocation(data.location);
    const hourlyForecast = await processHourlyForecast(
      data.forecast.forecastday[0].hour
    );
    const dailyForecast = await processDailyForecast(
      data.forecast.forecastday.slice(0, 4)
    );

    return {
      current: currentWeather,
      location: weatherLocation,
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
      air_quality,
    } = currentWeather;

    const weatherInfo = {
      Weather: condition.text,
      feelsLikeC: feelslike_c,
      wind: wind_mph,
      humidity: humidity,
      visibility: vis_miles,
      temperature: temp_c,
      uvIndex: uv,
      airQuality: air_quality.pm10,
    };

    console.log(weatherInfo);
    return weatherInfo;
  }

  async function currentLocation(currentLocationData) {
    const { country, localtime, name } = currentLocationData;

    const timePart = localtime.split(" ")[1];
    const strTime = convertTo12HourFormat(timePart);

    const LocationData = {
      country: country,
      time: strTime,
      city: name,
    };

    console.log(LocationData);
    return LocationData;
  }

  async function processHourlyForecast(hourlyData) {
    const now = new Date();
    const currentHour = now.getHours();
    const next12Hours = [];

    for (let i = 0; i < 13; i++) {
      const hourIndex = (currentHour + i) % 24; // Ensure we wrap around if necessary
      const hourData = hourlyData[hourIndex];

      const timePart = hourData.time.split(" ")[1];
      const strTime = convertTo12HourFormat(timePart);

      next12Hours.push({
        time: strTime,
        temperature: hourData.temp_c,
        condition: hourData.condition.text,
      });
    }

    console.log(next12Hours);
    return next12Hours;
  }

  function convertTo12HourFormat(timeString) {
    const [hour, minute] = timeString.split(":");
    let hours = parseInt(hour);
    const minutes = parseInt(minute);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
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

  return {
    getWeatherData,
    processWeatherData,
    processCurrentWeather,
    currentLocation,
    processHourlyForecast,
    processDailyForecast,
  };
};
