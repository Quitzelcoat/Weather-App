export function displayWeatherData(data) {
  if (!data) return;

  const currentHigh = document.querySelector(".currentHigh");
  const currentLow = document.querySelector(".currentLow");
  const weatherCondition = document.querySelector(".weatherCondition");

  // FRONT PAGE!

  // Display location info
  document.querySelector(
    ".todayTime"
  ).textContent = `Local Time: ${data.location.time}`;

  document.querySelector(
    ".locationToday"
  ).textContent = `Location: ${data.location.city}, ${data.location.country}`;

  // Display current weather
  document.getElementById(
    "currentCelcius"
  ).textContent = `Temperature: ${data.current.temperature}°C`;

  if (data.daily.length > 0) {
    const today = data.daily[0];
    currentHigh.textContent = `H: ${today.maxTemperature}°C`;
    currentLow.textContent = `L: ${today.minTemperature}°C`;
    weatherCondition.textContent = today.condition;
  }

  // Display hourly forecast
  const todayHours = document.getElementById("todayHours");
  todayHours.innerHTML = "";
  data.hourly.forEach((hour) => {
    const todayHourDiv = document.createElement("div");
    const todayConditionDiv = document.createElement("div");
    const todayTimeDiv = document.createElement("div");

    todayHourDiv.textContent = `${hour.temperature}°C`;
    todayConditionDiv.textContent = `${hour.condition}`;
    todayTimeDiv.textContent = `${hour.time}`;

    todayHours.appendChild(todayHourDiv);
    todayHours.appendChild(todayConditionDiv);
    todayHours.appendChild(todayTimeDiv);
  });

  // BACK PAGE!

  document.querySelector(
    ".uvIndexData"
  ).textContent = `${data.current.uvIndex}`;

  document.querySelector(".windData").textContent = `${data.current.wind}mph`;

  document.querySelector(
    ".humiditiyData"
  ).textContent = `${data.current.humidity}%`;

  document.querySelector(
    ".feelsLikeData"
  ).textContent = `${data.current.feelsLikeC}°`;

  document.querySelector(
    ".visibilityData"
  ).textContent = `${data.current.visibility}mi`;

  document.querySelector(
    ".airQualityData"
  ).textContent = `${data.current.airQuality}`;

  // Display next days' forecast
  const dayCasts = [
    { selector: ".tomorrowCast", dayIndex: 1 },
    { selector: ".nextDayCast", dayIndex: 2 },
    { selector: ".thirdDayCast", dayIndex: 3 },
  ];

  dayCasts.forEach(({ selector, dayIndex }) => {
    if (data.daily.length > dayIndex) {
      const dayData = data.daily[dayIndex];
      document.querySelector(
        `${selector} .nextDate`
      ).textContent = `Date: ${dayData.date}`;
      document.querySelector(
        `${selector} .daySituation`
      ).textContent = `Condition: ${dayData.condition}`;
      document.querySelector(
        `${selector} .dayTemperature`
      ).textContent = `${dayData.maxTemperature}°C / ${dayData.minTemperature}°C`;
    }
  });
}
