var WEATHER_API =
  "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=bc84d055ec0f2dab044ce4d973a5b1d4";

$(document).ready(function () {
  // Get the API data.
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={bc84d055ec0f2dab044ce4d973a5b1d4}",
    dataType: "json",
    success: function (data) {
      // Parse the JSON data.
      const weatherForecast = JSON.parse(data);

      // Do something with the weather forecast data.
      console.log(weatherForecast);
    },
    error: function (error) {
      // Handle the error.
      console.log(error);
    },
  });
});
