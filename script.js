const apiKey = "bc84d055ec0f2dab044ce4d973a5b1d4";
const apiURL = "https://api.openweathermap.org/";
const searchButton = document.getElementById("myButton");
const searchInput = document.querySelector(".form-control");
const displayDate = document.getElementById("todays-date");
const todaysWeather = document.getElementsByClassName("results");
const userInput = searchInput.value;
const todaysDate = dayjs().format("dddd, MMMM YYYY");
const currentTime = dayjs().format("h:mm A");

displayDate.innerHTML = todaysDate;
console.log(todaysWeather);

searchButton.addEventListener("click", function () {
  cityLocationFetch(searchInput.value);
});

function cityLocationFetch(userInput) {
  const getCityLocation = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=${apiKey}`;
  fetch(getCityLocation)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert("Sorry, can't find that place.");
      } else {
        search = data[0];
        const cityName = search.name;
        const cityLon = search.lon;
        const cityLat = search.lat;
        // fetchWeather(data[0][1][2]);
        setCityLon(cityLon);
        setCityLat(cityLat);
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

function currentWeatherFetch() {
  var cityLat = localStorage.getItem("City Lat");
  var cityLon = localStorage.getItem("City Lon");
  const getCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`;
  fetch(getCurrentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data === "") {
        alert("Sorry, can't find that place.");
      } else {
        console.log(data.main.temp);
        const cityTemp = data.main.temp;
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displayWeather() {}
