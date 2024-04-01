function searchCity(event) {
    event.preventDefault();

    let searchInput = document.querySelector("#search-input");
    let cityElement = document.querySelector("#current-city-details");
    cityElement.innerHTML = searchInput.value
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener('submit', searchCity)