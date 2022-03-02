
document.getElementById('submitBtn').addEventListener("click", event => {
  event.preventDefault();
  let cityName = document.getElementById('cityInput').value;

  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=ae5d20128353d0f3fbf8bec684d4d5c1'


  let apiKey = 'ae5d20128353d0f3fbf8bec684d4d5c1'
  let list_of_things = ['temp', 'humidity']
  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let lon = data.city.coord['lon']
      let lat = data.city.coord['lat']

      //current weather api url
      let currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

      fetch(currentUrl)
        .then(res => {
          return res.json();
        })
        .then(curr_data => {
          console.log(curr_data)
          console.log(lon);
        })



      console.log(data)
      console.log(1.8 * ((data.list[0].main.temp) - 273) + 32)
      console.log(data.list[0].main.humidity)
    })
}
)






//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       renderItems(city, data);
//     })
//     .catch(function (err) {
//       console.error(err);
//     });

// function fetchCoords(search) {
//   var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       if (!data[0]) {
//         alert('Location not found');
//       } else {
//         appendToHistory(search);
//         fetchWeather(data[0]);
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }