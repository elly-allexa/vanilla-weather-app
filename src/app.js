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

let now = new Date();
let time = document.querySelector("#current-time");

time.innerHTML = formatDate(now);

//

function defaultCity(city) {
  let apiKey = "b470bc5d0de108ed04c118836d83bcb0";
  let units = "metric";
  let endApiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${endApiUrl}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function searchForCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searching-for-city").value;
  if (!searchInput || searchInput === undefined) {
    alert("Please, enter your city ☁️💫");
  } else {
    defaultCity(searchInput);
  }
}

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weather = response.data.weather[0].main;
  let weatherDescription = response.data.weather[0].description;
  let myCityName = document.querySelector("#myCity");
  let mainDegrees = document.querySelector("#main-degrees");
  let newDegrees = document.querySelector("#new-degrees");
  let pressureInCity = document.querySelector("#pressure");
  let humidityInCity = document.querySelector("#humidity");
  let windInCity = document.querySelector("#wind-speed");
  let mainWeather = document.querySelector("#main-weather-description");
  myCityName.innerHTML = `${city}`;
  mainDegrees.innerHTML = `${temperature}`;
  newDegrees.innerHTML = `${feelsLike}`;
  pressureInCity.innerHTML = `Pressure: ${pressure} hPa`;
  humidityInCity.innerHTML = `Humidity: ${humidity}%`;
  windInCity.innerHTML = `Wind: ${wind} km/h`;
  mainWeather.innerHTML = `${weather}, ${weatherDescription}`;

  let thunderstorm = "⛈";
  let drizzle = "🌨";
  let rain = "🌧";
  let snow = "❄️";
  let clouds = "🌥";
  let clear = "☀️";

  if (weather !== undefined) {
    let emojiWeather = document.querySelector("#sign-for-weather");
    if (weather === "Clouds") {
      emojiWeather.innerHTML = `${clouds}`;
    }
    if (weather === "Clear") {
      emojiWeather.innerHTML = `${clear}`;
    }
    if (weather === "Thunderstorm") {
      emojiWeather.innerHTML = `${thunderstorm}`;
    }
    if (weather === "Drizzle") {
      emojiWeather.innerHTML = `${drizzle}`;
    }
    if (weather === "Rain") {
      emojiWeather.innerHTML = `${rain}`;
    }
    if (weather === "Snow") {
      emojiWeather.innerHTML = `${snow}`;
    }
  } else {
    let emojiWeather = document.querySelector("#sign-for-weather");
    emojiWeather.innerHTML = `${clouds}`;
  }
}

function showCurrentCityWeather(response) {
  document.querySelector("#myCity").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let feelsLike = Math.round(response.data.main.feels_like);
  let pressure = response.data.main.pressure;
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let weather = response.data.weather[0].main;
  let weatherDescription = response.data.weather[0].description;
  let mainDegrees = document.querySelector("#main-degrees");
  let newDegrees = document.querySelector("#new-degrees");
  let pressureInCity = document.querySelector("#pressure");
  let humidityInCity = document.querySelector("#humidity");
  let windInCity = document.querySelector("#wind-speed");
  let mainWeather = document.querySelector("#main-weather-description");
  mainDegrees.innerHTML = `${temperature}`;
  newDegrees.innerHTML = `${feelsLike}`;
  pressureInCity.innerHTML = `Pressure: ${pressure} hPa`;
  humidityInCity.innerHTML = `Humidity: ${humidity}%`;
  windInCity.innerHTML = `Wind: ${wind} km/h`;
  mainWeather.innerHTML = `${weather}, ${weatherDescription}`;

  let thunderstorm = "⛈";
  let drizzle = "🌨";
  let rain = "🌧";
  let snow = "❄️";
  let clouds = "🌥";
  let clear = "☀️";

  if (weather !== undefined) {
    let emojiWeather = document.querySelector("#sign-for-weather");
    if (weather === "Clouds") {
      emojiWeather.innerHTML = `${clouds}`;
    }
    if (weather === "Clear") {
      emojiWeather.innerHTML = `${clear}`;
    }
    if (weather === "Thunderstorm") {
      emojiWeather.innerHTML = `${thunderstorm}`;
    }
    if (weather === "Drizzle") {
      emojiWeather.innerHTML = `${drizzle}`;
    }
    if (weather === "Rain") {
      emojiWeather.innerHTML = `${rain}`;
    }
    if (weather === "Snow") {
      emojiWeather.innerHTML = `${snow}`;
    }
  } else {
    let emojiWeather = document.querySelector("#sign-for-weather");
    emojiWeather.innerHTML = `${clouds}`;
  }
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b470bc5d0de108ed04c118836d83bcb0";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentCityWeather);
}

let form = document.querySelector("#input-city-form");
form.addEventListener("submit", searchForCity);

let button = document.querySelector("#current-city-button");
button.addEventListener("click", getCurrentPosition);

defaultCity("Odesa, Ukraine");
