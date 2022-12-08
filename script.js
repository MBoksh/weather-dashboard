// Searched input text
let searchedLocationElement = document.getElementById("location");
// Button to submit
let findWeatherButtonElement = document.getElementById("search-btn");

// Function to retrieve weather using findWeatherLocation function from api if city searched for is valid
function getWeatherLocation() {
  let searchedInput = searchedLocationElement.value;
  console.log(searchedInput);

  // See if weather input is valid, if not window alert an error for 3 seconds and stop code running
  if (searchedInput === "") {
    alert("Error: Please enter a valid location");
    setTimeout(alert, 3000);
    return;
    // If weather input is valid then find the weather for that location
  } else {
    findWeatherLocation(searchedInput);
  }
}

// Function to retrieve/fetch weather location's longitude & latitude using search parameter
function findWeatherLocation(search) {
  const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=d91f911bcf2c0f925fb6535547a5ddc9`;

  // Fetch request for apiUrl
  fetch(apiUrl);
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //Pick the first location from the results
        const location = data[0];
        displayChosenLocationsWeather(location);
    })
}

// Function to display the weather of the location chosen provided by lat and lon values
function displayChosenLocationsWeather() {

};

// Event listener for findWeatherButtonElement
findWeatherButtonElement.addEventListener("click", getWeatherLocation);
