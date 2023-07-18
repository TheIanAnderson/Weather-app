const API_KEY = "bc84d055ec0f2dab044ce4d973a5b1d4";
const apiURL = "https://api.openweathermap.org/";
const searchButton = document.getElementById("myButton");
const displayDate = document.getElementById("todays-date");
const makeResultsVisible = document.querySelector("#results");
const todaysWeather = document.querySelector("#result1");
const todaysDate = dayjs().format("dddd MMMM DD, YYYY");
const currentTime = dayjs().format("h:mm A");
displayDate.innerHTML = todaysDate;

searchButton.addEventListener("click", function () {
  const searchInput = document.querySelector(".form-control");
  // const userInput = searchInput.value;
  cityLocationFetch(searchInput.value);
  fiveDayWeatherForcastFetch(searchInput.value);
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
        // setCityName(cityName);
        currentWeatherFetch(searchValue, cityLat, cityLon, cityName);
        fiveDayWeatherForcastFetch(searchValue, cityLat, cityLon);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function setCityTemp(variable) {
  localStorage.setItem("Temp", variable);
}
function setCityName(variable) {
  localStorage.setItem("City Name", variable);
}
function currentWeatherFetch(searchValue, cityLat, cityLon) {
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
        console.log(cityHumidity);
        console.log(cityWindSpeed);
        // console.log(cityTemp)
        displayWeather(cityTemp, cityName, cityWindSpeed, cityHumidity),
          cityTemp;
        // setCityTemp(cityTemp);
        console.log(cityTemp);
        appendListItem();
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function fiveDayWeatherForcastFetch(searchValue, cityLat, cityLon) {
  const get5DayForcast = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${cityLat}&lon=${cityLon}&appid=${API_KEY}`;
  fetch(get5DayForcast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const dayOneOfFive = data.list[0].dt_txt;
      const dayTwoOfFive = data.list[1].dt_txt;
      // const dayThreeOfFive = data.list[2].dt_txt;
      // const dayFourOfFive = data.list[3].dt_txt;
      // const dayFiveOfFive = data.list[4].dt_txt;

      const dayOneOfFiveTemp = data.list[0].main.temp;
      const dayTwoOfFiveTemp = data.list[1].main.temp;
      // const dayThreeOfFiveTemp = data.list[2].main.temp;
      // const dayFourOfFiveTemp = data.list[3].main.temp;
      // const dayFiveOfFiveTemp = data.list[4].main.temp;

      console.log(dayOneOfFive, dayOneOfFiveTemp);
      console.log(dayTwoOfFive, dayTwoOfFiveTemp);
      // console.log(dayThreeOfFive, dayThreeOfFiveTemp);
      // console.log(dayFourOfFive, dayFourOfFiveTemp);
      // console.log(dayFiveOfFive, dayFiveOfFiveTemp);
    });
}

function displayWeather(temp, cityName, cityWindSpeed, cityHumidity) {
  todaysWeather.innerHTML =
    "The temperature in " +
    cityName +
    " right now is " +
    temp +
    " with a wind speed of " +
    cityWindSpeed +
    "mph and humidity of " +
    cityHumidity +
    "%";
  ("!");
}

function appendListItem(input) {
  input = document.querySelector(".form-control");
  var newListElement = document.createElement("li");
  newListElement.textContent = input.value;
  var list = document.getElementById("list");
  list.appendChild(newListElement);
}
