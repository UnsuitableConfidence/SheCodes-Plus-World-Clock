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

//This can probably be improved using loops and injecting new values in each variable, with a max of 3)
//weather emoji will use SheCodes weather API
