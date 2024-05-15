/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/weather-api.js":
/*!****************************!*\
  !*** ./src/weather-api.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getWeatherData: () => (/* binding */ getWeatherData)
/* harmony export */ });
async function getWeatherData(location) {
  let apiKey = "0d353533d1cd4029975135630240705";
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


const locationBtn = document.getElementById("locationBtn");
const weatherLoc = document.getElementById("weatherLoc");

locationBtn.addEventListener("click", () => {
  (0,_weather_api_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)(weatherLoc.value);
  weatherLoc.value = "";
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map