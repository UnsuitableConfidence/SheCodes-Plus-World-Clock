//////////////////////////////
// Functions                //
//////////////////////////////
function updateCityDisplay() {
  let selectedCities = [...selectedCitiesGlobal];

  selectedCities = selectedCities.map((city) =>
    city === "current" ? moment.tz.guess() : city
  );

  let citiesDisplayed = document.querySelector("#cities");
  let selectedCitiesHTML = "";

  for (let i = 0; i < selectedCities.length; i++) {
    let cityTime = moment.tz(selectedCities[i]);
    let cityName = selectedCities[i].replace("_", " ").split("/")[1];
    selectedCitiesHTML += ` 
          <div class="display-city-block">
          <div class="city-name">
          <h2>${cityName}</h2>
          <div class="current-label"></div>
          </div>
          <div class="time">${cityTime.format(
            "h:mm:ss"
          )}<small>${cityTime.format("A")}</small>
                    <div class="date">${cityTime.format(
                      "MMMM Do YYYY"
                    )}</div></div>
          </div>`;
  }
  // Add <div class="weather"> Emoji Here </div> at top of div

  citiesDisplayed.innerHTML = selectedCitiesHTML;

  document.querySelectorAll(".current-label").forEach((label, index) => {
    if (selectedCitiesGlobal[index] === "current") {
      label.innerHTML = "<small>(current location)</small>";
    }
  });
}

/////////////////////////////

function updateCity(event) {
  let cityValue = event.target.value;

  if (cityValue === "undefined") {
    alert("Please select valid location");
  } else {
    clearInterval(intervalId);

    if (!firstTimeFlag) {
      selectedCitiesGlobal = [];
      firstTimeFlag = true;
    }

    if (selectedCitiesGlobal.includes(cityValue)) {
      selectedCitiesGlobal = selectedCitiesGlobal.filter(
        (current) => current !== cityValue
      );
    }
    selectedCitiesGlobal.unshift(cityValue);
    selectedCitiesGlobal = selectedCitiesGlobal.slice(0, 3);

    updateCityDisplay();
    intervalId = setInterval(updateCityDisplay, 1000);

    let homeElement = document.querySelector("#home");
    homeElement.innerHTML = `<input class="home-button" type="button" value="View Load Cities" onClick="location.href=location.href">`;
  }
}

/////////////////////////////

function onLoad() {
  let loadCities = ["Europe/London", "America/New_York", "Pacific/Auckland"];
  selectedCitiesGlobal = [...loadCities];

  clearInterval(intervalId);
  updateCityDisplay();
  intervalId = setInterval(updateCityDisplay, 1000);
}

/////////////////////////////

function advancedSearch() {}

//////////////////////////////
// Global Code              //
//////////////////////////////
let allCitiesData = [];
fetch("momentMasterList.json")
  .then((response) => response.json())
  .then((data) => {
    allCitiesData = data;
    //populateRegions();
  })
  .catch((error) => console.error("Error loading JSON, ", error));

let intervalId; // Stores the interval ID
let firstTimeFlag = false;
let selectedCitiesGlobal = [];

onLoad();

let citySelect = document.querySelector("#city-selection");
citySelect.addEventListener("change", updateCity);

//////////////////////////////
// Notes                    //
//////////////////////////////

//Steps:
////1. Adjust the time so updates every second
////2.a Show all 3 locations on LOAD
////3. Add home screen button
////4. Differentiate current location from London with a line under "(current location)"
////5. Add "undefined" break alert
////6. Remove weather emoji, edit CSS as needed to make it pretty
//SUBMIT
//1. Add Advanced Dropdown
////2. Add up to 3 selected locations, then start deleting
////3. If a city is picked twice, delete previous and update new one at the top.
//4. Update for weather API for emoji
//5a. Re-edit CSS for Emoji integration
//5b. Make the Home button prettier
//5c. Make the alert prettier
//6. Pair down and make code more efficient

//weather emoji will use SheCodes weather API

//Use an array to get the city list; Basically I want the array to be added to my js, when change is detected, search the array for the right "value" and spit out the tz value
// i.e. click "London, UK" -> html value is "Europe/London" to be used by moment
//Will need to figure out how this works with the API as well but that is a wholeeeee other project

/*
https://www.w3schools.com/howto/howto_js_cascading_dropdown.asp Cascading drop down - "Select Region", then "Select City"
      <form>
        <select id="region">
          <option value="northAmerica">North America</option>
        </select>
        <select id="city">
          <option value="new_york">New York</option>
        </select>
        </form>
*/

/*
passing functions

  function xyz(x, y, z) {
    console.log (x, y, z);
  }

  function a(){
    console.log(`This is a`);
  }

  let b = 10;
  let c = 20;

  xyz(a(), b, c)


The function a, and the variables b and c are all passed into the function xyz (a()=x, b=y, c=z). 
However, what the console will log is only the printed function of a, not execute it. `f a(){};, 10, 20`

  function xyz(x, y, z) {
  ** x();
  console.log (x, y, z);
  }
  function a(){
    console.log(`This is a`);
  }

  let b = 10;
  let c = 20;

  xyz(a, b, c)


  Adding x(); to execute the function will now let it run. 
  This can also be written directly in the execution of xyz as xyz (a(), b, c);

  Without the execution of the function, the reference variables will just keep getting passed around and never used. 

  Notably, if a(); has a return value this will change how it value is passed around (note it is not executed.) 

  function xyz(x, y, z) {
    console.log (x, y, z);
  }
  function a(){
    console.log(`This is a`);
    return `return value for a`
  }

  let b = 10;
  let c = 20;

  xyz(a, b, c)

  Now when x is called in xyz(); it will print as `return value for a, 10, 20` because x = the return value of a();
   it is referencing a(); but it is not executing the function.


   
  setInterval();

  Syntax:
  setInterval(code)
  setInterval(code, delay)

  setInterval(func)
  setInterval(func, delay)
  setInterval(func, delay, arg1)
  setInterval(func, delay, arg1, arg2)

  IntervalID and clearInterval();
  An interval ID is a unique identifier returned by setInterval(). 
  It's used to keep track of an interval (a repeating function call) so that you can later stop it using clearInterval().
  Best practice is to define the interval ID as a global variable

1.  Starting an Interval

  let intervalID = setInterval(() => {
    console.log("This runs every second!");
  }, 1000);

  setInterval(); schedules a function to run repeatedly every X milliseconds.
  It returns an interval ID, which is just a number, that is stored as the variable (in this case simply, intervalID).
  
2.  Stopping an Interval

  clearInterval(intervalID);
  
  clearInterval(intervalID) stops the repeating execution.

  Without storing the ID, you have no way to stop the interval.
  If a new interval is created without stopping the old one, multiple timers could run at the same time, causing bugs.

   */
