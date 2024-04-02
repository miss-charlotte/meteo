function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperature = response.data.main.temp;
  let cityElement = document.querySelector("#current-city-details");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(temperature);

  let humidityElement = document.querySelector("#humidity-data");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind-data");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let rainElement = document.querySelector("#rain-data");
  rainElement.innerHTML = response.data.weather[0].description;

  let timeElement = document.querySelector("#current-date");
  let date = formatDate(date);
  timeElement.innerHTML = `${date.getHours()}: ${date.getMinutes()}`;

  console.log(response.data)
}

function searchCity(city) {
  let apiKey = "e405c2dc39d16dca9ae77f21cfd7e3f7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSubmit);

function formatDate(date) {
  let day = date.getDay();
  let dateDay = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hour < 10) {
    hour = `0${hour}`;
  }

  let formattedDay = days[date.getDay()];
  let formattedMonth = months[month];

  return `${formattedDay}, ${dateDay} ${formattedMonth}, ${year}  - ${hour}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Kampala");
