//////////////////////////////
// Functions                //
//////////////////////////////

function updateDisplayCurrent() {
  let currentLocation = moment.tz.guess();
  console.log(currentLocation);
}

/////////////////////////////

function updateDisplay(cityTimezone) {
  let cityTime = moment.tz(cityTimezone);
  let cityName = cityTimezone.replace("_", " ").split("/")[1];

  let citiesDisplayed = document.querySelector("#cities");
  citiesDisplayed.innerHTML = ` 
  <div class="display-city-block">
          <div class="weather">Emoji here</div>
          <h2>${cityName}</h2>
          <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
          <div class="time">${cityTime.format(
            "h:mm:ss"
          )}<small>${cityTime.format("A")}</small></div>
        </div>`;
}

/////////////////////////////

function updateCity(event) {
  let cityValue = event.target.value;
  clearInterval(intervalId);

  if (cityValue === "current") {
    updateDisplayCurrent();
    //intervalId = setInterval(updateDisplayCurrent, 1000, cityValue);
  } else {
    updateDisplay(cityValue);
    intervalId = setInterval(updateDisplay, 1000, cityValue);
  }
}

//////////////////////////////
// Global Code              //
//////////////////////////////

let intervalId; // Stores the interval ID

let citySelect = document.querySelector("#city");
citySelect.addEventListener("change", updateCity);

//////////////////////////////
// Notes                    //
//////////////////////////////

//Steps:
////1. Adjust the time so updates every second
//2.a Show current location on LOAD and add home screen button
//2.b Differentiate current location from London with a line under "(current location)"
//3. Remove weather emoji, edit CSS as needed to make it pretty
//SUBMIT
//4. Add up to 2 locations, then start deleting
//5. Update for weather API for emoji
//6. Add Advanced Dropdown
//7. Update to 3 locations
//8. If a city is picked twice, delete previous and update new one at the top.

//This can probably be improved using loops and injecting new values in each variable, with a max of 3)
//weather emoji will use SheCodes weather API
//Append by simply ....innerHTML + =

//Use an array to get the city list; Basically I want the array to be added to my js, when change is detected, search the array for the right "value" and spit out the tz value
// i.e. click "London, UK" -> html value is "Europe/London" to be used by moment
//Will need to figure out how this works with the API as well but that is a wholeeeee other project

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
