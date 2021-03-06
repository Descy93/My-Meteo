//date format
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);


  //Global parameters

    let globalUnits = "metric";
    let globalCityTempC= 12;
    let globalCityTempF= calculFahrenheit(globalCityTempC);
 
    //geolocalisation API
    
    

  function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
  
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
  }
  
  function searchCity(city) {
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  
  function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
    axios.get(apiUrl).then(displayWeatherCondition);
  }
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
    searchCity("Saintes");
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  //Temperature metrics 


  function convertToFahrenheit(event) {
    event.preventDefault();
  }

  function convertToCelsius(event) {
    event.preventDefault();
  
  }
  function calculFahrenheit (centigrades) {
  return Number(centigrades)* (9/5) + 32;
}

function calculCentigrades(fahrenheit) {
  return (Number(fahrenheit) - 32) * (5/9);
}

function changeUnits() {
  determineTempUnits();
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLon}&appid=${apiKey}&units=${globalUnits}`;
  axios.get(url).then(displayTempAndWeatherToUserFromResponse);

  if (units === "metric") {
    tempDisplay.innerHTML = `${Math.round(cityTempC)} °C`;
    windDisplay.innerHTML = `Wind ${Math.round(windSpeedms)} m/s`;
  } else if (globalUnits === "imperial") {
    tempDisplay.innerHTML = `${Math.round(cityTempF)} °F`;
   
  }

  } 

  let celsiusLink= document.querySelector("#celsius-link");
  let fahrenheitLink= document.querySelector("#fahrenheit-link");
  let elementTemp = document.querySelector("#current-temperature");

  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
