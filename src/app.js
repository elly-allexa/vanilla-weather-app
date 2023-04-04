function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  let hours = String(date.getHours()).padStart(2, "0");
  let minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}, ${hours}:${minutes}`;
}

function getDayAndMonth(timestamp) {
  let date = new Date(timestamp * 1000);
  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  let days = [
    "31",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];
  let month = date.getMonth();
  let day = date.getDate();

  return `${days[day]}/${months[month]}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
      <div class="col mx-1 day">
        <div class="forecast-week-day">${formatDay(forecastDay.time)}</div>
        <small>${getDayAndMonth(forecastDay.time)}</small>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt=""
          class="forecast-weather"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}°</span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchForCity(city) {
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let endApiUrl = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${endApiUrl}?query=${city}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function defaultCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searching-for-city").value;
  if (!searchInput || searchInput === undefined) {
    alert("Please, enter your city ☁️💫");
  } else {
    searchForCity(searchInput);
  }
}

function getForecast(coordinates) {
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let endApiUrl = `https://api.shecodes.io/weather/v1/forecast`;
  let apiUrl = `${endApiUrl}?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  let myCityName = document.querySelector("#myCity");
  let iconSign = document.querySelector("#icon");
  let time = document.querySelector("#current-time");
  let mainDegrees = document.querySelector("#main-degrees");
  let newDegrees = document.querySelector("#new-degrees");
  let pressureInCity = document.querySelector("#pressure");
  let humidityInCity = document.querySelector("#humidity");
  let windInCity = document.querySelector("#wind-speed");
  let mainWeather = document.querySelector("#main-weather-description");

  celsiusTemperature = response.data.temperature.current;
  feelsLikeTemperature = response.data.temperature.feels_like;

  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let now = new Date();
  let temperature = Math.round(celsiusTemperature);
  let feelsLike = Math.round(feelsLikeTemperature);
  let pressure = response.data.temperature.pressure;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;
  myCityName.innerHTML = `${city}`;
  iconSign.setAttribute("src", `${icon}`);
  iconSign.setAttribute("alt", weatherDescription);
  time.innerHTML = formatDate(now);
  mainDegrees.innerHTML = `${temperature}`;
  newDegrees.innerHTML = `${feelsLike}`;
  pressureInCity.innerHTML = `Pressure: ${pressure} hPa`;
  humidityInCity.innerHTML = `Humidity: ${humidity}%`;
  windInCity.innerHTML = `Wind: ${wind} km/h`;
  mainWeather.innerHTML = `${weatherDescription}`;

  getForecast(response.data.coordinates);
}

function showCurrentCityWeather(response) {
  let myCityName = document.querySelector("#myCity");
  let iconSign = document.querySelector("#icon");
  let time = document.querySelector("#current-time");
  let mainDegrees = document.querySelector("#main-degrees");
  let newDegrees = document.querySelector("#new-degrees");
  let pressureInCity = document.querySelector("#pressure");
  let humidityInCity = document.querySelector("#humidity");
  let windInCity = document.querySelector("#wind-speed");
  let mainWeather = document.querySelector("#main-weather-description");

  celsiusTemperature = response.data.temperature.current;
  feelsLikeTemperature = response.data.temperature.feels_like;

  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let now = new Date();
  let temperature = Math.round(celsiusTemperature);
  let feelsLike = Math.round(feelsLikeTemperature);
  let pressure = response.data.temperature.pressure;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weatherDescription = response.data.condition.description;
  myCityName.innerHTML = `${city}`;
  iconSign.setAttribute("src", `${icon}`);
  iconSign.setAttribute("alt", weatherDescription);
  time.innerHTML = formatDate(now);
  mainDegrees.innerHTML = `${temperature}`;
  newDegrees.innerHTML = `${feelsLike}`;
  pressureInCity.innerHTML = `Pressure: ${pressure} hPa`;
  humidityInCity.innerHTML = `Humidity: ${humidity}%`;
  windInCity.innerHTML = `Wind: ${wind} km/h`;
  mainWeather.innerHTML = `${weatherDescription}`;

  getForecast(response.data.coordinates);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = `462ddfcdo6b39797fbf3801t94bacc7f`;
  let units = `metric`;
  let apiEndpoint = `https://api.shecodes.io/weather/v1/current`;
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentCityWeather);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-degrees");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-degrees");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showFahrenheitFeelsLikeTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#new-degrees");
  celsiusFeelsLiketLink.classList.remove("active");
  fahrenheitFeelsLiketLink.classList.add("active");
  let fahrenheitTemperature = Math.round((feelsLikeTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function showCelsiusFeelsLikeTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#new-degrees");
  fahrenheitFeelsLiketLink.classList.remove("active");
  celsiusFeelsLiketLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(feelsLikeTemperature);
}

let celsiusTemperature = null;
let feelsLikeTemperature = null;

let form = document.querySelector("#input-city-form");
form.addEventListener("submit", defaultCity);

let button = document.querySelector("#current-city-button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let fahrenheitFeelsLiketLink = document.querySelector(
  "#fahrenheit-feels-like-link"
);
fahrenheitFeelsLiketLink.addEventListener(
  "click",
  showFahrenheitFeelsLikeTemperature
);

let celsiusFeelsLiketLink = document.querySelector("#celsius-feels-like-link");
celsiusFeelsLiketLink.addEventListener(
  "click",
  showCelsiusFeelsLikeTemperature
);

searchForCity("Odesa, Ukraine");
