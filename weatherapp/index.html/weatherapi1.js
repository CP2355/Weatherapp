let current = new Date();
let ul = document.querySelector("ul");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let currentDay = days[current.getDay()];
let currentTime = current.toLocaleTimeString();

ul.innerHTML = `${currentDay} ${currentTime}`;

function citySearch(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let newTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${newTemp}ºF`;
}

function cityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  cityInput.innerHTML = "cityInput.value";
  let city = `${cityInput.value}`;
  let units = "imperial";
  let apiKey = "e5589c9e52b1240bf60acb6fbca63553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl})&appid=${apiKey}`).then(citySearch);
}

let form = document.querySelector("form");
form.addEventListener("submit", cityName);

function currentTemperature(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;
  let temp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${temp}ºF`;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function getLocation(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiKey = "e5589c9e52b1240bf60acb6fbca63553";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}
`;

  axios.get(apiUrl).then(currentTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", getCurrentLocation);
