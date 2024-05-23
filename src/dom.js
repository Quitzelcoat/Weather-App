// Function to set the background image based on weather condition
function setBackgroundImage(condition) {
  const body = document.body;
  let imageUrl;

  switch (condition) {
    case "Sunny":
      imageUrl = "images/background/desert.jpg";
      break;
    case "Clear":
      imageUrl = "images/background/desert.jpg";
      break;
    case "Cloudy":
      imageUrl = "images/background/cloud.jpg";
      break;
    case "rainy":
      imageUrl = "images/background/rain.jpg";
      break;
    case "Patchy rain nearby":
      imageUrl = "images/background/rain.jpg";
      break;
    case "Torrential rain shower":
      imageUrl = "images/background/rain.jpg";
      break;
    case "thunderstorm":
      imageUrl = "images/background/thunderstorm.jpg";
      break;
    default:
      imageUrl = "images/background/cloud.jpg";
  }

  body.style.backgroundImage = `url(${imageUrl})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

export function displayWeatherData(data) {
  if (!data) return;

  setBackgroundImage(data.current.Weather);
  console.log(data.current.Weather);

  const currentHigh = document.querySelector(".currentHigh");
  const currentLow = document.querySelector(".currentLow");
  const weatherCondition = document.querySelector(".weatherCondition");

  // FRONT PAGE!

  // Display location info
  document.querySelector(".todayTime").textContent = `${data.location.time}`;

  document.querySelector(
    ".locationToday"
  ).textContent = `${data.location.city}`;

  // Display current weather
  document.getElementById(
    "currentCelcius"
  ).textContent = `${data.current.temperature}°C`;

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
    const eachHourDiv = document.createElement("div");
    const todayHourDiv = document.createElement("div");
    const todayConditionDiv = document.createElement("div");
    const todayTimeDiv = document.createElement("div");
    const weatherIcon = document.createElement("img");

    eachHourDiv.className = "eachHourDiv";
    eachHourDiv.classList.add("insideHour");
    weatherIcon.classList.add("weatherIcon");

    todayHourDiv.textContent = `${hour.temperature}°`;
    // todayConditionDiv.textContent = `${hour.condition}`;
    todayTimeDiv.textContent = `${hour.time}`;

    // Determine the appropriate weather icon based on the condition
    switch (hour.condition.toLowerCase()) {
      case "sunny":
        weatherIcon.src = "images/background/sun.png";
        weatherIcon.alt = "Sunny";
        break;
      case "Patchy rain nearby":
        weatherIcon.src = "images/background/rain.png";
        weatherIcon.alt = "Rainy";
        break;
      case "Patchy rain":
        weatherIcon.src = "images/background/rain.png";
        weatherIcon.alt = "Rainy";
        break;
      case "clear":
        weatherIcon.src = "images/background/sun.png";
        weatherIcon.alt = "Sunny";
        break;
      case "cloudy":
        weatherIcon.src = "images/background/cloud.png"; // Replace with the actual path to your cloudy icon
        weatherIcon.alt = "Cloudy";
        break;
      case "rainy":
        weatherIcon.src = "images/background/rain.jpg"; // Replace with the actual path to your rainy icon
        weatherIcon.alt = "Rainy";
        break;
      case "Light rain":
        weatherIcon.src = "images/background/rain.png"; // Replace with the actual path to your rainy icon
        weatherIcon.alt = "Rainy";
        break;
      default:
        weatherIcon.src = "images/background/partly-cloudy.png"; // Optional: a default icon
        weatherIcon.alt = "Weather";
    }

    eachHourDiv.appendChild(todayHourDiv);
    eachHourDiv.appendChild(weatherIcon);
    eachHourDiv.appendChild(todayConditionDiv);
    eachHourDiv.appendChild(todayTimeDiv);
    todayHours.appendChild(eachHourDiv);
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

  const leftHoursArrow = document.getElementById("leftHoursArrow");
  const rightHoursArrow = document.getElementById("rightHoursArrow");

  let scrollPosition = 0;

  function updateArrows() {
    leftHoursArrow.disabled = scrollPosition === 0;
    rightHoursArrow.disabled =
      scrollPosition >= todayHours.scrollWidth - todayHours.clientWidth;
  }

  function scrollTodayHours(direction) {
    const scrollAmount = todayHours.clientWidth / 5; // Scroll by the width of one visible item
    if (direction === "left") {
      scrollPosition = Math.max(scrollPosition - scrollAmount, 0);
    } else {
      scrollPosition = Math.min(
        scrollPosition + scrollAmount,
        todayHours.scrollWidth - todayHours.clientWidth
      );
    }
    todayHours.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
    updateArrows();
  }

  updateArrows();

  leftHoursArrow.addEventListener("click", () => scrollTodayHours("left"));
  rightHoursArrow.addEventListener("click", () => scrollTodayHours("right"));
}
