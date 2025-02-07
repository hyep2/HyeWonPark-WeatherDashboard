//need to add if statement for cityinput =null;

let cityName = "";
document.getElementById('submitBtn').addEventListener("click", event => {
  event.preventDefault();

  //refreshing every time you submit a new city
  refresh();
  
  cityName = document.getElementById('cityInput').value;

  //jic user puts nothing in search form
  if (cityName == "") {
    document.getElementById('today').style.visibility = "hidden";
    alert('Need to put city name');
    return;
  }

  displayWeather();
  localStorage.setItem('city', cityName);
  let history = document.getElementById('buttonRef');
  let historyBtn = document.createElement('button');
  historyBtn.innerHTML = cityName;
  history.append(historyBtn);
  historyBtn.addEventListener('click', event => {
    event.preventDefault();
    cityName = historyBtn.innerHTML;
    refresh();
    displayWeather();
  })



}
)


//this fxn is for fetching all the data and displaying all the data output
function displayWeather() {


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


      //fetching for current and next five days data
      fetch(fiveDaysUrl)
        .then(res => {
          return res.json();
        })
        .then(five_data => {
          //for current day
          let curr_temp = 1.8 * (five_data.current.temp - 273) + 32;
          let currRound = Math.round((curr_temp + Number.EPSILON) * 100) / 100
          let icon = five_data.current.weather[0].icon;
          let curr_humidity = five_data.current.humidity;
          let curr_wind = five_data.current.wind_speed;
          let curr_uv = five_data.current.uvi;
          //adding uvi badge
          let uviBadge = document.createElement('button');
          uviBadge.classList.add('btn', 'btn-sm');
          uviBadge.textContent = curr_uv;

          //got this idea of using bootstrap colored buttons from main
          if (curr_uv < 3) {
            uviBadge.classList.add('btn-success');
          } else if (curr_uv < 7) {
            uviBadge.classList.add('btn-warning');
          } else {
            uviBadge.classList.add('btn-danger');
          }
          uviBadge.textContent = curr_uv

          //appending icon image
          let image = document.createElement('img');
          let source = "http://openweathermap.org/img/wn/" + icon + "@4x.png";
          image.setAttribute('src', source);
          document.getElementById('todayIcon').append(image);

          //for the current weather display
          document.getElementById("currentCityDate").textContent = cityName + " " + moment().format("[(]MM/DD/YYYY[)]");
          document.getElementById("currentTemp").textContent = "Temp: " + currRound + "°F";
          document.getElementById("currentWind").textContent = "Wind: " + curr_wind + " MPH";
          document.getElementById("currentHumidity").textContent = "Humidity " + curr_humidity + " %";
          document.getElementById("currentUV").textContent = "UV index: ";
          document.getElementById('currentUV').append(uviBadge);

          document.getElementById('today').style.visibility = "visible";

          //getting days 1-5 after current day 0
          for (let i = 1; i < 6; i++) {
            let mainDiv = document.getElementById("week");

            // this div contains daydiv (has the weather info) and icondiv (has the weather icon)
            let bigDay = document.createElement('div')
            bigDay.classList.add('bigDayChild');

            let dayDiv = document.createElement('div');
            let iconDiv = document.createElement('div');

            //need to add header too with the dates and image

            let tomorrow = moment().add(i, 'days').format('MM/DD/YYYY');


            let headEl = document.createElement('h3');
            let minEl = document.createElement('p');
            let maxEl = document.createElement('p');
            let windEl = document.createElement('p');
            let humidityEl = document.createElement('p');
            let iconEl = document.createElement('img')

            //icon for the five day weather
            let iconsrc = five_data.daily[i].weather[0].icon;
            let fivesource = "http://openweathermap.org/img/wn/" + iconsrc + "@4x.png"
            iconEl.setAttribute('src', fivesource);

            //adding values 
            headEl.textContent = tomorrow;
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
            iconDiv.append(iconEl);

            bigDay.append(dayDiv);
            bigDay.append(iconDiv);

            mainDiv.append(bigDay);


          }
        })



    })
}

//this fxn is for refreshing every time there is a new city input
function refresh() {
  removeChilds(document.getElementById("week"));
  removeChilds(document.getElementById('todayIcon'));
}

const removeChilds = (parent) => {
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }
};