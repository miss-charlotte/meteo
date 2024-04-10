function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#current-city-details");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}°`;

  let humidityElement = document.querySelector("#humidity-data");
  humidityElement.innerHTML = `${response.data.main.humidity}%`;

  let windElement = document.querySelector("#wind-data");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let rainElement = document.querySelector("#rain-data");
  rainElement.innerHTML = response.data.weather[0].main;
  console.log(response.data);
  console.log(response.data.coord.dt);

  let timeElement = document.querySelector("#current-date");
  let timeStamp = response.data.dt;
  let date = new Date(timeStamp * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#temperature-icon");
  let iconCode = response.data.weather[0].icon;
  let imgElement = document.createElement("img");
  imgElement.src = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
  iconElement.innerHTML = "";
  iconElement.appendChild(imgElement);

  let descriptionElement = document.querySelector("#temperature-description");
  descriptionElement.innerHTML = response.data.weather[0].description;
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
  let dateDay = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "October",
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

// let currentDateELement = document.querySelector("#current-date");
// let currentDate = new Date();

// currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Kampala");

function displayForecast() {

  let days = ["Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function(day) {
    forecastHtml = forecastHtml + `
              <div class="weather-forecast-day">
                <div class="weather-forecast-date">
                  ${day}
                </div>
                <div class="weather-forecast-icon">
                  <img src=" https://openweathermap.org/img/wn/10d@2x.png" alt="">
                </div>                
                <div class="weather-forecast-temperature">
                  <span class="max-temperature">18
                  </span> 
                  <span class="min-temperature">12</span>
                </div>                
              </div>
            `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml
};

displayForecast();



