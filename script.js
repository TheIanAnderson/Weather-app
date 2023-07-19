const API_KEY = "bc84d055ec0f2dab044ce4d973a5b1d4";
const apiURL = "https://api.openweathermap.org/";
const searchButton = document.getElementById("myButton");
const displayDate = document.getElementById("todays-date");
const makeResultsVisible = document.querySelector("#results");
const todaysWeather = document.querySelector("#result1");
const todaysDate = dayjs().format("dddd MMMM DD, YYYY");
const currentTime = dayjs().format("h:mm A");
const fiveDayForcastOne = document.querySelector("#fiveDayOne");
const fiveDayForcastTwo = document.querySelector("#fiveDayTwo");
const fiveDayForcastThree = document.querySelector("#fiveDayThree");
const fiveDayForcastFour = document.querySelector("#fiveDayFour");
const fiveDayForcastFive = document.querySelector("#fiveDayFive");
displayDate.innerHTML = todaysDate;

searchButton.addEventListener("click", function () {
  const searchInput = document.querySelector(".form-control");
  cityLocationFetch(searchInput.value);
  fiveDayWeatherForcastFetch(searchInput.value);
  makeResultsVisible.setAttribute("style", "display:flex");
});

function addEventListenerToPreviousSearch(element) {
  element.addEventListener("click", function () {
    const previousSearchValue = element.getAttribute("data-search-value");
    cityLocationFetch(previousSearchValue);
    fiveDayWeatherForcastFetch(previousSearchValue);
  });
}

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
        displayWeather(cityTemp, cityName, cityWindSpeed, cityHumidity),
          cityTemp;
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
      const dayTwoOfFive = data.list[6].dt_txt;
      const dayThreeOfFive = data.list[14].dt_txt;
      const dayFourOfFive = data.list[22].dt_txt;
      const dayFiveOfFive = data.list[30].dt_txt;

      const dayOneOfFiveTemp = data.list[0].main.temp;
      const dayTwoOfFiveTemp = data.list[6].main.temp;
      const dayThreeOfFiveTemp = data.list[14].main.temp;
      const dayFourOfFiveTemp = data.list[22].main.temp;
      const dayFiveOfFiveTemp = data.list[30].main.temp;

      console.log(dayOneOfFive, dayOneOfFiveTemp);
      console.log(dayTwoOfFive, dayTwoOfFiveTemp);
      console.log(dayThreeOfFive, dayThreeOfFiveTemp);
      console.log(dayFourOfFive, dayFourOfFiveTemp);
      console.log(dayFiveOfFive, dayFiveOfFiveTemp);

      displayFiveDayWeather(
        dayOneOfFive,
        dayOneOfFiveTemp,
        dayTwoOfFive,
        dayTwoOfFiveTemp,
        dayThreeOfFive,
        dayThreeOfFiveTemp,
        dayFourOfFive,
        dayFourOfFiveTemp,
        dayFiveOfFive,
        dayFiveOfFiveTemp
      );
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

function displayFiveDayWeather(
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten
) {
  fiveDayForcastOne.innerHTML =
    "The temperature on " + one + " will be " + two + "!";
  fiveDayForcastTwo.innerHTML =
    "The temperature on " + three + " will be " + four + "!";
  fiveDayForcastThree.innerHTML =
    "The temperature on " + five + " will be " + six + "!";
  fiveDayForcastFour.innerHTML =
    "The temperature on " + seven + " will be " + eight + "!";
  fiveDayForcastFive.innerHTML =
    "The temperature on " + nine + " will be " + ten + "!";
}

function appendListItem(input) {
  input = document.querySelector(".form-control");
  var newListElement = document.createElement("button");
  newListElement.classList.add("row", "savedBtn", "previous-search");
  newListElement.textContent = input.value;
  newListElement.dataset.searchValue = input.value;
  var list = document.getElementById("list");
  list.appendChild(newListElement);
  addEventListenerToPreviousSearch(newListElement);
}
