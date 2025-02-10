/*
function updateTime() {
  //CityA
  let blockA = document.querySelector("#cityA");
  let weatherA = blockA.querySelector(".weather");
  let cityA = blockA.querySelector("h2");
  let dateA = blockA.querySelector(".date");
  let timeA = blockA.querySelector(".time");

  let timezoneA = moment().tz("America/Los_Angeles");

  weatherA.innerHTML = "Undefined";
  cityA.innerHTML = "Los Angeles";
  dateA.innerHTML = timezoneA.format("MMMM Do YYYY");
  timeA.innerHTML = timezoneA.format("h:mm:ss [<small>]A[</small]");
}

updateTime();
setInterval(updateTime, 1000);
*/

function updateCity(event) {
  let cityTimezone = event.target.value;
  let cityTime = moment().tz(cityTimezone);

  //So what's going on:
  //When a value in the select is changed, it calls the function
  //It temporarily stores  the value as "cityTimezone"
  //Then inputs this value into moment.js to calculate the "cityTime"
  //This can then be manipulated within the page

  let citiesDisplayed = document.querySelector("#cities");
  let cityName = cityTimezone.replace("_", " ").split("/")[1];
  citiesDisplayed.innerHTML = `
  <div class="display-city-block">
          <div class="weather">Emoji here</div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          <div class="time">${cityTime.format(
            "h:mm:ss"
          )}<small>${cityTime.format("A")}</small></div>
        </div>`;
  //Apptend by simply ....innerHTML + = ``
}

let citySelect = document.querySelector("#city");
citySelect.addEventListener("change", updateCity);

//This can probably be improved using loops and injecting new values in each variable, with a max of 3)
//weather emoji will use SheCodes weather API

//Use an array to get the city list; Basically I want the array to be added to my js, when change is detected, search the array for the right "value" and spit out the tz value
// i.e. click "London, UK" -> html value is "Europe/London" to be used by moment
//Will need to figure out how this works with the API as well but that is a wholeeeee other project
//I also like the idea of having the GMT value, if that's possible

//https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp Cascading drop down - "Select Region", then "Select City"
