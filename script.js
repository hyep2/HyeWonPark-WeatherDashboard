//need to add if statement for cityinput =null;
document.getElementById('submitBtn').addEventListener("click", event => {
  event.preventDefault();
  let cityName = document.getElementById('cityInput').value;
  let apiKey = 'ae5d20128353d0f3fbf8bec684d4d5c1'

  //use this to get the lat/lon
  let weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=ae5d20128353d0f3fbf8bec684d4d5c1'


  fetch(weatherUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      let lon = data.city.coord['lon']
      let lat = data.city.coord['lat']
      //current weather api url
      let currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

      let fiveDaysUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

      fetch(currentUrl)
        .then(res => {
          return res.json();
        })
        .then(curr_data => {
          //THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

          console.log(curr_data)
          let curr_temp = 1.8 * (curr_data.main['temp'] - 273) + 32;
          let currRound = Math.round((curr_temp + Number.EPSILON) * 100) / 100
          let curr_humidity = curr_data.main['humidity'];
          let curr_wind = curr_data.wind['speed'];

          //for the current weather display
          document.getElementById("currentCityDate").textContent = cityName + " " + moment().format("[(]MM/DD/YYYY[)]");
          document.getElementById("currentTemp").textContent = "Temp: " + currRound + "°F";
          document.getElementById("currentWind").textContent = "Wind: " + curr_wind + " MPH";
          document.getElementById("currentHumidity").textContent = "Humidity " + curr_humidity + " %";
          document.getElementById("currentUV").textContent = "UV index: ";
        })
        .catch(function (err) {
          console.error(err);
        });

      fetch(fiveDaysUrl)
        .then(res => {
          return res.json();
        })
        .then(five_data => {
          console.log(five_data.daily);
          //getting days 1-5 after current day 0
          for (let i = 1; i < 6; i++) {
            let mainDiv = document.getElementById("week");

            let dayDiv = document.createElement('div');
            dayDiv.classList.add('weekChild');

            //need to add header too with the dates and image
            
            let tomorrow = moment().add(i, 'days').format('MM/DD/YYYY');
            

            let headEl = document.createElement('h3');
            let minEl = document.createElement('p');
            let maxEl = document.createElement('p');
            let windEl = document.createElement('p');
            let humidityEl = document.createElement('p');


            //adding values 
            headEl.textContent=tomorrow;
            let min = 1.8 * (five_data.daily[i].temp.min - 273) + 32;
            let minRound = Math.round((min + Number.EPSILON) * 100) / 100
            let max = 1.8 * (five_data.daily[i].temp.max - 273) + 32;
            let maxRound = Math.round((max + Number.EPSILON) * 100) / 100
            minEl.textContent = "Min Temp: " + minRound + "°F";
            maxEl.textContent = "Max Temp: " + maxRound + "°F";
            windEl.textContent = "Wind: " + five_data.daily[i].wind_speed + " MPH";
            humidityEl.textContent = "Humidity " + five_data.daily[i].humidity + " %";

            dayDiv.append(headEl);
            dayDiv.append(minEl);
            dayDiv.append(maxEl);
            dayDiv.append(windEl);
            dayDiv.append(humidityEl);

            mainDiv.append(dayDiv);

          }
        })
        


      // console.log(data)
      // console.log(1.8 * ((data.list[0].main.temp) - 273) + 32)
      // console.log(data.list[0].main.humidity)
    })
    .catch(function (err) {
      console.error(err);
    });
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