const API_KEY = "bc84d055ec0f2dab044ce4d973a5b1d4";
const apiURL = "https://api.openweathermap.org/";
const searchButton = document.getElementById("myButton");
const searchInput = document.querySelector(".form-control");
const displayDate = document.getElementById("todays-date");
const makeResultsVisible = document.querySelector("#results");
const todaysWeather = document.querySelector("#result1");
const userInput = searchInput.value;
const todaysDate = dayjs().format("dddd, MMMM YYYY");
const currentTime = dayjs().format("h:mm A");
displayDate.innerHTML = todaysDate;

searchButton.addEventListener("click", function () {
  cityLocationFetch(searchInput.value);
  makeResultsVisible.setAttribute("style", "display:flex");
});

function cityLocationFetch(userInput) {
  const getCityLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${API_KEY}`;
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
        currentWeatherFetch();
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

function setCityName(variable) {
  localStorage.setItem("City Name", variable);
}

function currentWeatherFetch() {
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
        const cityTemp = data.main.temp;
        // console.log(cityTemp)
        displayWeather(cityTemp);
        appendListItem();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displayWeather(data) {
  const cityName = localStorage.getItem("City Name");
  todaysWeather.innerHTML =
    "The weather in " + cityName + " right now is " + data + " !";
}


function appendListItem(input) {
  input = document.querySelector(".form-control");
  var newListElement = document.createElement("li");
  newListElement.textContent = input.value;
  var list = document.getElementById("list");
  list.appendChild(newListElement);
  
}