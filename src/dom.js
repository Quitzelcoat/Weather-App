export const weatherDom = () => {
  function updateCurrentWeatherDom(currentWeather) {
    const currentCelcius = document.querySelector(".currentCelcius");
    currentCelcius.textContent = `${currentWeather.temperature} °C`;
  }

  function updateLocationWeatherDom(currentLocation) {}

  function updateHourlyWeatherDom(hourlyForecast) {}

  function updateDailyWeatherDom(dailyForecast) {}

  return {
    updateCurrentWeatherDom,
    updateLocationWeatherDom,
    updateHourlyWeatherDom,
    updateDailyWeatherDom,
  };
};
