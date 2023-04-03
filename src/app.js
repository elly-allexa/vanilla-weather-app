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

function searchForCity(city) {
  let apiKey = "462ddfcdo6b39797fbf3801t94bacc7f";
  let units = "metric";
  let endApiUrl = "https://api.shecodes.io/weather/v1/current";
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
  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let now = new Date();
  let temperature = Math.round(response.data.temperature.current);
  let feelsLike = Math.round(response.data.temperature.feels_like);
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
  let city = response.data.city;
  let icon = response.data.condition.icon_url;
  let now = new Date();
  let temperature = Math.round(response.data.temperature.current);
  let feelsLike = Math.round(response.data.temperature.feels_like);
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
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "462ddfcdo6b39797fbf3801t94bacc7f";
  let units = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current";
  let apiUrl = `${apiEndpoint}?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

let form = document.querySelector("#input-city-form");
form.addEventListener("submit", defaultCity);

let button = document.querySelector("#current-city-button");
button.addEventListener("click", getCurrentPosition);

searchForCity("Odesa, Ukraine");
