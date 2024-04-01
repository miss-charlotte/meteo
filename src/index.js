function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city-details");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchCity);

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

  let formattedDay = days[day];
  let formattedMonth = months[month];

  return `${formattedDay}, ${dateDay} ${formattedMonth}, ${year}  - ${hour}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
