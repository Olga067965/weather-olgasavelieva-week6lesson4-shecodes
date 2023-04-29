//display the current date and time using JavaScript: Tuesday 16:00
var today = new Date();
  var day = today.getDay();
  var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var hour = today.getHours();
  var minutes = today.getMinutes();
  document.getElementById("info").innerHTML = ` ${days[day]} , ${hour}:${minutes}`;

  //Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
const form = document.getElementById('search-form');
      const result = document.getElementById('city');

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputCity = document.getElementById('city-input').value;

        result.innerHTML = `${inputCity}`;
      });

// Display temperature in Celsius and add a link to convert it to Fahrenheit.
    const temperature = document.getElementById('temperature');
  const convertTemp = document.getElementById('convertTemp');

  convertTemp.addEventListener('click', function(){
    if (convertTemp.innerHTML == '°C') {
      temperature.innerHTML = Math.round((parseInt(temperature.innerHTML) * 9)/5 + 32);
      convertTemp.innerHTML = '°F';
    } else {
      temperature.innerHTML = Math.round((parseInt(temperature.innerHTML) - 32) * 5/9);
      convertTemp.innerHTML = '°C';
    }
  });


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
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "311f1f45fee82242ab4086372ab360f5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");

