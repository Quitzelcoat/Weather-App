/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayWeatherData: () => (/* binding */ displayWeatherData)
/* harmony export */ });
// Function to set the background image based on weather condition
function setBackgroundImage(condition) {
  const body = document.body;
  let imageUrl;

  switch (condition) {
    case "Sunny":
      imageUrl = "../images/desert.jpg";
      break;
    case "Clear":
      imageUrl = "../images/desert.jpg";
      break;
    case "Cloudy":
      imageUrl = "../images/cloud.jpg";
      break;
    case "rainy":
      imageUrl = "../images/rain.jpg";
      break;
    case "Patchy rain nearby":
      imageUrl = "../images/rain.jpg";
      break;
    case "Torrential rain shower":
      imageUrl = "../images/rain.jpg";
      break;
    case "thunderstorm":
      imageUrl = "../images/thunderstorm.jpg";
      break;
    default:
      imageUrl = "../images/cloud.jpg";
  }

  body.style.backgroundImage = `url(${imageUrl})`;
  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
}

function displayWeatherData(data) {
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
        weatherIcon.src = "../images/sun.png";
        weatherIcon.alt = "Sunny";
        break;
      case "Patchy rain nearby":
        weatherIcon.src = "../images/rain.png";
        weatherIcon.alt = "Rainy";
        break;
      case "Patchy rain":
        weatherIcon.src = "../images/rain.png";
        weatherIcon.alt = "Rainy";
        break;
      case "clear":
        weatherIcon.src = "../images/sun.png";
        weatherIcon.alt = "Sunny";
        break;
      case "cloudy":
        weatherIcon.src = "../images/cloud.png"; // Replace with the actual path to your cloudy icon
        weatherIcon.alt = "Cloudy";
        break;
      case "rainy":
        weatherIcon.src = "../images/rain.png"; // Replace with the actual path to your rainy icon
        weatherIcon.alt = "Rainy";
        break;
      case "Light rain":
        weatherIcon.src = "../images/rain.png"; // Replace with the actual path to your rainy icon
        weatherIcon.alt = "Rainy";
        break;
      default:
        weatherIcon.src = "../images/partly-cloudy.png"; // Optional: a default icon
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


/***/ }),

/***/ "./src/weather-api.js":
/*!****************************!*\
  !*** ./src/weather-api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   weatherApiData: () => (/* binding */ weatherApiData)
/* harmony export */ });
const weatherApiData = () => {
  async function getWeatherData(location) {
    let apiKey = "0d353533d1cd4029975135630240705";
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=yes&alerts=yes`,
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _weather_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weather-api.js */ "./src/weather-api.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");



(0,_weather_api_js__WEBPACK_IMPORTED_MODULE_0__.weatherApiData)().getWeatherData("miami");

const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

async function processBtnData() {
  const valuePut = weatherLoc.value;

  const weatherData = await (0,_weather_api_js__WEBPACK_IMPORTED_MODULE_0__.weatherApiData)().getWeatherData(valuePut);
  if (weatherData) {
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.displayWeatherData)(weatherData);
  }

  weatherLoc.value = "";
}

locationBtn.addEventListener("click", async () => {
  processBtnData();
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map