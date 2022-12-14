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
  console.log(findWeatherLocation);
}

// Function to show the current weather forecast
function displayChosenLocationsWeather(weatherData) {
  // Get current weather data
  const currentLocationsWeather = weatherData.current;
  // Gets the current weathers icon
  const weatherIconImage = `${currentLocationsWeather.weather[0].icon}`;
  

  // Updates span elements in HTML and displays current weather in main section dashboard

 
// Retreives current weathers icon from icon url and displays in img element
  const weatherIcon = (document.getElementById("icon").src =
  `http://openweathermap.org/img/wn/${weatherIconImage}@2x.png`);

  

  const weather = (document.getElementById("temperature-value").textContent =
    "Temperature: " + `${currentLocationsWeather.temp}` + "°");
  
  const windSpeed = (document.getElementById("wind-speed-value").textContent =
    "Wind Speed: " + `${currentLocationsWeather.wind_speed}` + "MPH");
  const humidity = (document.getElementById("humidity-value").textContent =
    "Humidity: " + `${currentLocationsWeather.humidity}` + "%");

    console.log(displayChosenLocationsWeather);
}

// Function to show the 5-day weather forecast
function displayChosenLocationsWeatherForecast(weatherData) {
  // Get daily weather data
  const dailyWeatherData = weatherData.daily;

  // Show the weather forecasts dynamically by changing CSS
  document.querySelector('.weather-forecast').style.display = 'block';
  // Stores the selected div element
  const dailyForecastList = document.getElementById(
    "Five-Day-Weather-Forecast"
  );
  // Clears the div elements to display new chosen weather forecasts
  dailyForecastList.innerHTML = "";

  // Add class to the div element to display

  // for loop to add new displayed forecasts in divs, iterates through 5 times
  for (let i = 0; i < dailyForecast; i++) {
    console.log(i);
    const dailyWeatherForecast = dailyWeatherData[i];
    const day = new Date(dailyWeatherForecast.dt * 1000).toLocaleDateString(
      "en-GB",
      { weekday: "long" }
    );


    console.log(dailyWeatherForecast);

    // Allows forecast to be displayed
    // Retreives current weathers icon from icon url and displays in img element
    const weatherIcon = `${dailyWeatherForecast.weather[0].icon}`;
    const temperature = `Temperature: ${dailyWeatherForecast.temp.day}°`;
    const windSpeed = `Wind: ${dailyWeatherForecast.wind_speed}MPH`;
    const humidity = `Humidity: ${dailyWeatherForecast.humidity}%`;

    const newCreatedForecast = document.createElement("div");
    newCreatedForecast.classList.add("Forecast");

    newCreatedForecast.innerHTML = `<div class="daily-forecasts">
    <div class="date">
      <div>${day}</div>
    </div>
    <div class="icon">
    <img src="http://openweathermap.org/img/wn/${weatherIcon}@2x.png"/>
  </div>
    <div class="temperature">
      <div>${temperature}</div>
    </div>
    <div class="windspeed">
      <div>${windSpeed}</div>
    </div>
    <div class="humidity"> 
      <div>${humidity}</div>
    </div>
    </div> `;

    // Add the created divs to HTML element with id 5-Day-Weather-Forecast to display forecast
    dailyForecastList.appendChild(newCreatedForecast);
  }
}

// Function to retrieve/fetch weather location's longitude & latitude using search parameter
function findWeatherLocation(search) {
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=d91f911bcf2c0f925fb6535547a5ddc9`;

  // Fetch request for apiUrl
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //Pick the first location from the results
      const latAndLon = data[0];
      console.log(latAndLon);
      findChosenLocationsLatAndLon(latAndLon);
    });
}

// Function to display the weather of the location chosen provided by lat and lon values
function findChosenLocationsLatAndLon(latAndLon) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latAndLon.lat}&lon=${latAndLon.lon}&units=imperial&exclude=minutely,hourly&appid=d91f911bcf2c0f925fb6535547a5ddc9`;

  // Fetch request for apiUrl
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Shows the current weather forecast
      displayChosenLocationsWeather(data);

      // Shows the 5-day weather forecast
      displayChosenLocationsWeatherForecast(data);

      // Shows the name and country selected in the main weather dashboard
      const name = latAndLon.name;
      const country = latAndLon.country;
      nameAndCountry = (document.getElementById("name").textContent =
      `${name}, ${country}`);
    });
}

// Event listener for findWeatherButtonElement
findWeatherButtonElement.addEventListener("click", getWeatherLocation);
