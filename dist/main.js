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
/* harmony import */ var _weatherData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./weatherData.js */ "./src/weatherData.js");


async function getWeatherData(location) {
  // const weatherLoc = document.getElementById("weatherLoc").value;

  let apiKey = "0d353533d1cd4029975135630240705";
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(data);
    return (0,_weatherData_js__WEBPACK_IMPORTED_MODULE_0__.processWeatherData)(data);
  } catch (error) {
    console.log("Error fetching the image: ", error);
    return null;
  }
}


/***/ }),

/***/ "./src/weatherData.js":
/*!****************************!*\
  !*** ./src/weatherData.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   processWeatherData: () => (/* binding */ processWeatherData)
/* harmony export */ });
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


(0,_weather_api_js__WEBPACK_IMPORTED_MODULE_0__.getWeatherData)("Pakistan");

})();

/******/ })()
;
//# sourceMappingURL=main.js.map