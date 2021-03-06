//https://source.unsplash.com/1600x900/?brixen link for pictures


function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " hr " + rminutes;
}

async function fetchBusData(bool) {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();

  if (month.toString().length == 1) {
    month = "0" + month;
  }
  if (day.toString().length == 1) {
    day = "0" + day;
  }
  if (hour.toString().length == 1) {
    hour = "0" + hour;
  }
  if (minute.toString().length == 1) {
    minute = "0" + minute;
  }

  document.querySelector("#time").innerText= hour+":"+minute;

  if (bool) {
    url =
      "https://efa.sta.bz.it/web/XML_DM_REQUEST?sessionID=0&requestID=0&command=&useRealtime=1&coordOutputFormat=WGS84%5BDD.ddddd%5D&locationServerActive=1&mode=direct&useAllStops=1&depType=STOPEVENTS&includeCompleteStopSeq=1&calcOneDirection=1&dmLineSelectionAll=1&limit=8&itdDate=" +
      year +
      "" +
      month +
      "" +
      day +
      "&itdTime=" +
      hour +
      "" +
      minute +
      "&itdTripDateTimeDepArr=dep&ptOptionsActive=0&imparedOptionsActive=0&changeSpeed=normal&lineRestriction=400&maxChanges=9&routeType=leasttime&includedMeans=checkbox&inclMOT_BUS=true&name_dm=66001143&type_dm=stop&language=de&outputFormat=JSON&outputEncoding=UTF-8";
  } else {
    url =
      "https://efa.sta.bz.it/web/XML_DM_REQUEST?sessionID=0&requestID=0&command=&useRealtime=1&coordOutputFormat=WGS84%5BDD.ddddd%5D&locationServerActive=1&mode=direct&useAllStops=1&depType=STOPEVENTS&includeCompleteStopSeq=1&calcOneDirection=1&dmLineSelectionAll=1&limit=2&itdDate=" +
      year +
      "" +
      month +
      "" +
      day +
      "&itdTime=" +
      hour +
      "" +
      minute +
      "&itdTripDateTimeDepArr=dep&ptOptionsActive=0&imparedOptionsActive=0&changeSpeed=normal&lineRestriction=400&maxChanges=9&routeType=leasttime&includedMeans=checkbox&inclMOT_ZUG=true&name_dm=66000998&type_dm=stop&language=de&outputFormat=JSON&outputEncoding=UTF-8";
  }

  const response = await fetch(url, {
    method: "get",
  });

  data = await response.json();

  return data.departureList;
}

async function fetchWeather(city) {
  apiKey = "0b8c67b86e3c40c13e99b0e0a6a9e215";
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&lang=de&units=metric&appid=" +
    this.apiKey;

  const response = await fetch(url, {
    method: "get",
  });

  response.json().then((weatherdata) => {
    displayWeather(weatherdata);
  });
}

//Weather DOMElements
const locationlist = document.querySelectorAll(".location");
const iconlist = document.querySelectorAll(".icon > img");
const desclist = document.querySelectorAll(".desc");
const templist = document.querySelectorAll(".temp");
const humiditylist = document.querySelectorAll(".humidity > p");
const windlist = document.querySelectorAll(".wind > p");

//Bus/Train Schedule DOMElements
const schedule = document.querySelector(".schedule");
const rowsSchedule = document.querySelectorAll(".row");
const line = document.querySelectorAll(".line");
const lineIcon = document.querySelectorAll(".line-icon");
const direction = document.querySelectorAll(".direction");
const time = document.querySelectorAll(".time");
const countdown = document.querySelectorAll(".countdown");

function displayWeather(weatherdata) {
  const { name } = weatherdata;
  const { icon, description } = weatherdata.weather[0];
  const { temp, humidity } = weatherdata.main;
  const { speed } = weatherdata.wind;

  locationlist[displayWeather.counter % 6].innerText = name;
  iconlist[displayWeather.counter % 6].src =
    "../assets/weathericons/"+icon+".svg";
  desclist[displayWeather.counter % 6].innerText = description;
  templist[displayWeather.counter % 6].innerText =
    Math.round(Number.parseFloat(temp) * 10) / 10 + "??C";
  humiditylist[displayWeather.counter % 6].innerText = humidity + "%";
  windlist[displayWeather.counter % 6].innerText = speed + " km/h";

  displayWeather.counter++;
}
displayWeather.counter = 0;

function displayBusData() {
  for (let i = 0; i < busandtrain.length; i++) {
    direction[i].innerHTML = busandtrain[i][0];
    lineIcon[i].src = busandtrain[i][5] === "bus" ? "../assets/icons/bus.png" : "../assets/icons/train.png";
    line[i].innerHTML = busandtrain[i][1];
    time[i].innerHTML = busandtrain[i][2];
    countdown[i].innerHTML = busandtrain[i][3];
  }
}

async function changeBusUI(newData, changedRows){
  const newRows = createRows(newData);
 
  
  changedRows.forEach(e => {
      e.classList.add("disappear");
  })
  for (let i = changedRows.length; i < 5 + changedRows.length; i++) {
      rowsSchedule[i].classList.add("row" + (i-changedRows.length + 1));
      rowsSchedule[i].classList.remove("row" + (i+1));
    
  }
  schedule.append(...newRows);
  await new Promise(r => setTimeout(r, 2000));
  changedRows.forEach(e => schedule.removeChild(e));
}


function createRows(data){
  return data.map(dataRow => {
    const row = document.createElement("div");
    row.classList.add("row");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    
    const lineContainer = document.createElement("div");
    lineContainer.classList.add("line-container");

    const lineWrapper = document.createElement("div");
    lineWrapper.classList.add("line-wrapper");

    const lineIcon = document.createElement("img");
    lineIcon.classList.add("line-icon");
    lineIcon.src = dataRow[5] === "bus" ? "../assets/icons/bus.png" : "../assets/icons/train.png";

    const line = document.createElement("div");
    line.classList.add("line");
    line.innerHTML = dataRow[1];

    const direction = document.createElement("p");
    direction.classList.add("direction");
    direction.innerHTML = dataRow[0];

    const time = document.createElement("p");
    time.classList.add("time");
    time.innerHTML = dataRow[2];

    const countdown = document.createElement("p");
    countdown.classList.add("countdown");
    countdown.innerHTML = dataRow[3];

    lineContainer.append(lineWrapper);
    lineWrapper.append(lineIcon, line);
    row.appendChild(wrapper);
    wrapper.append(lineContainer, direction, time, countdown);
    return row;
  });
}

let busandtrainhistory = ["fill"];
let busandtrain = [];

async function getBusData() {
  const bus = await fetchBusData(true);
  const train = await fetchBusData(false);

 
  

  busandtrain = [];
  for (x of bus) {
    if (x.dateTime.hour.length == 1) {
      x.dateTime.hour = "0" + x.dateTime.hour;
    }
    if (x.dateTime.minute.length == 1) {
      x.dateTime.minute = "0" + x.dateTime.minute;
    }

    busandtrain.push([
      x.servingLine.direction,
      x.servingLine.number,
      x.dateTime.hour + ":" + x.dateTime.minute,
      x.countdown,
      x.onwardStopSeq[0].ref.arrDelay,
      "bus",
    ]);
  }

  for (x of train) {
    if (x.dateTime.hour.length == 1) {
      x.dateTime.hour = "0" + x.dateTime.hour;
    }
    if (x.dateTime.minute.length == 1) {
      x.dateTime.minute = "0" + x.dateTime.minute;
    }

    busandtrain.push([
      x.servingLine.direction,
      x.servingLine.number.slice(0, 8),
      x.dateTime.hour + ":" + x.dateTime.minute,
      x.countdown,
      x.servingLine.delay,
      "train",
    ]);
  }

  busandtrain.sort(sortFunction);

  for (x of busandtrain) {
    if (x[3] > 60) {
      x[3] = timeConvert(x[3]);
    }
  }

  function sortFunction(a, b) {
    if (Number(a[3]) == Number(b[3])) {
      return 0;
    } else {
      return Number(a[3]) < Number(b[3]) ? -1 : 1;
    }
  }

  


  if (busandtrain[0][0] != busandtrainhistory[0][0]) {
      if (busandtrainhistory[0] !== "fill"){
        const changedRows = [];
        const newData = [];
        for (let i=0; i<busandtrain.length; i++){
            if (busandtrain[0][0] !== busandtrainhistory[i][0]){
              changedRows.push(rowsSchedule[i]);
              newData.push(busandtrain[busandtrain.length-i-1]);
            }else {
              break;
            }
            
        }
        newData.reverse();

       
        changeBusUI(newData, changedRows);
        
      }else {
        for (let i = 1; i <= 5; i++) {
          displayBusData(busandtrain);
          rowsSchedule[i-1].classList.add("row" + i);
        }
      } 
  }else{
    displayBusData(busandtrain);
  }

  busandtrainhistory = [];

  for (x of busandtrain) {
    busandtrainhistory.push(x);
  }

  
}

arr = ["Brixen", "Sterzing", "Bozen", "Bruneck", "Klausen", "Brenner"];

async function start() {
  for (x of arr) {
    await fetchWeather(x);
  }
  getBusData();
}

start();

function init() {
  var now = new Date();

  if (now.getSeconds() == 0) {
    start();
    setInterval(start, 60000);
    clearInterval(myInitTimer);
  }
}

myInitTimer = setInterval(init, 1000);
