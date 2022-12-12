// Searched input text
let searchedLocationElement = document.getElementById("location");
// Button to submit
let findWeatherButtonElement = document.getElementById("search-btn");
// Setting the limit of how many forecasts to retrieve
const dailyForecast = 5;

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
  console.log(findWeatherLocation)
}

// Function to show the current weather forecast
function displayChosenLocationsWeather(weatherData) {
  const currentLocationsWeather = weatherData.current;

  // Updates span elements in HTML and displays current weather in main section dashboard
  var weather = document.getElementById('temperature-value').textContent = 'Temperature: ' + `${currentLocationsWeather.temp}` + '°C';
  console.log(weather);
  document.getElementById('wind-speed-value').textContent = 'Wind Speed: ' + `${currentLocationsWeather.wind_speed}` + 'MPH';
  document.getElementById('humidity-value').textContent = 'Humidity: ' + `${currentLocationsWeather.humidity}` + '%';
  document.getElementById('UV-index-value').textContent = 'UV Index: ' + `${currentLocationsWeather.uvi}`;
  
};

// Function to show the 5-day weather forecast
function displayChosenLocationsWeatherForecast(weatherData) {

};

// Function to retrieve/fetch weather location's longitude & latitude using search parameter
function findWeatherLocation(search) {
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=d91f911bcf2c0f925fb6535547a5ddc9`;

  // Fetch request for apiUrl
  fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        //Pick the first location from the results
        const location = data[0];
        console.log(location)
        findChosenLocationsLatAndLon(location);
    })
}

// Function to display the weather of the location chosen provided by lat and lon values
function findChosenLocationsLatAndLon(lat, lon) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`;

  // Fetch request for apiUrl
  fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
    
        // Shows the current weather forecast
        displayChosenLocationsWeather(data);

        // Shows the 5-day weather forecast
        displayChosenLocationsWeatherForecast(data);
    })

};

// Event listener for findWeatherButtonElement
findWeatherButtonElement.addEventListener("click", getWeatherLocation);
