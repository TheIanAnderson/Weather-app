const API_KEY = "bc84d055ec0f2dab044ce4d973a5b1d4";
const apiURL = "https://api.openweathermap.org/";
const searchButton = document.getElementById("myButton");
const displayDate = document.getElementById("todays-date");
const makeResultsVisible = document.querySelector("#results");
const todaysWeather = document.querySelector("#result1");

const todaysDate = dayjs().format("dddd, MMMM YYYY");
const currentTime = dayjs().format("h:mm A");
displayDate.innerHTML = todaysDate;

searchButton.addEventListener("click", function () {
  const searchInput = document.querySelector(".form-control");
  const userInput = searchInput.value;
  cityLocationFetch(searchInput.value);
  fiveDayWeatherForcastFetch(userInput);
  makeResultsVisible.setAttribute("style", "display:flex");
});
function cityLocationFetch(searchValue) {
  const getCityLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=${API_KEY}`;
  fetch(getCityLocation)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        makeResultsVisible.setAttribute("style", "display:none");
        alert("Sorry, can't find that place.");
      } else {
        search = data[0];
        const cityName = search.name;
        const cityLon = search.lon;
        const cityLat = search.lat;
        // fetchWeather(data[0][1][2]);
        setCityLon(cityLon);
        setCityLat(cityLat);
        setCityName(cityName);
        currentWeatherFetch(searchValue);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}
function setCityLon(variable) {
  localStorage.setItem("City Lon", variable);
}
function setCityLat(variable) {
  localStorage.setItem("City Lat", variable);
}
function setCityTemp(variable) {
  localStorage.setItem("Temp", variable);
}
function setCityName(variable) {
  localStorage.setItem("City Name", variable);
}
function currentWeatherFetch(searchValue) {
  var cityLat = localStorage.getItem("City Lat");
  var cityLon = localStorage.getItem("City Lon");
  const getCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}&units=imperial`;
  fetch(getCurrentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data === "") {
        alert("Sorry, can't find that place.");
      } else {
        const cityName = searchValue;
        const cityTemp = data.main.temp;
        const cityWindSpeed = data.wind.speed;
        const cityHumidity = data.main.humidity;
        console.log(data);
        console.log(cityHumidity);
        console.log(cityWindSpeed);
        // console.log(cityTemp)
        displayWeather(cityTemp, cityName);
        setCityTemp(cityTemp);
        console.log(cityTemp);
        appendListItem();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function fiveDayWeatherForcastFetch(userInput) {
  var cityLat = localStorage.getItem("City Lat");
  var cityLon = localStorage.getItem("City Lon");
  const get5DayForcast = `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}`;
  console.log(get5DayForcast);
  fetch(get5DayForcast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const fiveDayForcastData = data;
    });
}

function displayWeather(data, cityName) {
  todaysWeather.innerHTML =
    "The temperature in " + cityName + " right now is " + data + " !";
}

function appendListItem(input) {
  input = document.querySelector(".form-control");
  var newListElement = document.createElement("li");
  newListElement.textContent = input.value;
  var list = document.getElementById("list");
  list.appendChild(newListElement);
  newListElement.forEach(addElementId("appendedList"));
}

// What I need to do is have my appended li become clickable, where the input field recieves the city name and searches it.
// What if I made each li a button instead, and that button passed the city name...
// Oh, maybe I literally just call my own function with the appended data haha, let's try that.
