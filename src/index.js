function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city-details");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = `${temperature}°`;

  let humidityElement = document.querySelector("#humidity-data");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  let windElement = document.querySelector("#wind-data");
  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  let feelsLikeElement = document.querySelector("#feels-like-data");
  feelsLikeElement.innerHTML = response.data.temperature.feels_like

  let timeElement = document.querySelector("#current-date");
  let timeStamp = response.data.time;
  let date = new Date(timeStamp * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#temperature-icon");
  let iconCode = response.data.condition.icon;
  let imgElement = document.createElement("img");
  imgElement.src = "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/" + iconCode + ".png";
  iconElement.innerHTML = "";
  iconElement.appendChild(imgElement);

  let descriptionElement = document.querySelector("#temperature-description");
  descriptionElement.innerHTML = response.data.condition.description;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "4a9a03c36co3te6eb309bfc8b0f487fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
  console.log(apiUrl)
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

searchCity("Kampala");

function getForecast(city) {
  let apiKey = "4a9a03c36co3te6eb309bfc8b0f487fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {

      forecastHtml =
        forecastHtml +
        `
              <div class="weather-forecast-day">
                <div class="weather-forecast-date">
                  ${formatDay(day.time)}
                </div>
                <div>
                  <img src="${
                    day.condition.icon_url
                  }" alt="" class="weather-forecast-icon" >
                </div>                
                <div class="weather-forecast-temperature">
                  <span class="max-temperature">${Math.round(
                    day.temperature.maximum
                  )}°
                  </span> 
                  <span class="min-temperature">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>                
              </div>
            `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
