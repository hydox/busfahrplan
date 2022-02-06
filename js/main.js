// mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkb3giLCJhIjoiY2t6MmRia2Y3MDRmeTJ1bnl3YWI3a2ZucSJ9.f7DQ8p_g9zDfSPr6-pAEPg';
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/hydox/ckz2duviv006415p1e0xl78ql',
// });

// //Adds navigation controls: zooming in/out
// map.addControl(new  mapboxgl.NavigationControl());

function sortBy(key, data) {
	return data.sort((a, b) => {
		var x = parseInt(a[key]); 
		var y = parseInt(b[key]);
		return ((y > x) ? -1 : ((y < x) ? 1 : 0));
	});
}

function timeConvert(n) {
    var num = n;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hrs " + rminutes
    }



async function fetchBusData(bool){

    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();

    if(month.toString().length == 1) {
        month = '0'+month;
   }
   if(day.toString().length == 1) {
        day = '0'+day;
   }   
   if(hour.toString().length == 1) {
        hour = '0'+hour;
   }
   if(minute.toString().length == 1) {
        minute = '0'+minute;
   }

   
    if(bool){
         url ="https://efa.sta.bz.it/web/XML_DM_REQUEST?sessionID=0&requestID=0&command=&useRealtime=1&coordOutputFormat=WGS84%5BDD.ddddd%5D&locationServerActive=1&mode=direct&useAllStops=1&depType=STOPEVENTS&includeCompleteStopSeq=1&calcOneDirection=1&dmLineSelectionAll=1&limit=15&itdDate="+year+""+ month+""+day+"&itdTime="+hour+""+minute+"&itdTripDateTimeDepArr=dep&ptOptionsActive=0&imparedOptionsActive=0&changeSpeed=normal&lineRestriction=400&maxChanges=9&routeType=leasttime&includedMeans=checkbox&inclMOT_BUS=true&inclMOT_ZUG=true&inclMOT_8=true&name_dm=66001143&type_dm=stop&language=de&outputFormat=JSON&outputEncoding=UTF-8"

    }else{
         url= "https://efa.sta.bz.it/web/XML_DM_REQUEST?sessionID=0&requestID=0&command=&useRealtime=1&coordOutputFormat=WGS84%5BDD.ddddd%5D&locationServerActive=1&mode=direct&useAllStops=1&depType=STOPEVENTS&includeCompleteStopSeq=1&calcOneDirection=1&dmLineSelectionAll=1&limit=3&itdDate="+year+""+ month+""+day+"&itdTime="+hour+""+minute+"&itdTripDateTimeDepArr=dep&ptOptionsActive=0&imparedOptionsActive=0&changeSpeed=normal&lineRestriction=400&maxChanges=9&routeType=leasttime&includedMeans=checkbox&inclMOT_ZUG=true&name_dm=66000998&type_dm=stop&language=de&outputFormat=JSON&outputEncoding=UTF-8"

    }

    const response = await fetch(url,{
        method: "get",
    })

    data = await response.json();

    return data.departureList;
}



async function fetchWeather(city){
    
    apiKey= "0b8c67b86e3c40c13e99b0e0a6a9e215";
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" +city +"&lang=de&units=metric&appid=" +this.apiKey;

    const response = await fetch(url,{
        method: "get",
    })

    response.json().then((weatherdata) => {
       
        displayWeather(weatherdata)    
    })
}

const locationlist = document.querySelectorAll(".location");
const iconlist = document.querySelectorAll(".icon");
const desclist = document.querySelectorAll(".desc");
const templist = document.querySelectorAll(".temp");
const humiditylist = document.querySelectorAll(".humidity");
const windlist = document.querySelectorAll(".wind-speed");

function displayWeather(weatherdata){

    const { name } = weatherdata;
    const { icon, description } = weatherdata.weather[0];
    const { temp, humidity } = weatherdata.main;
    const { speed } = weatherdata.wind;

   
   

    locationlist[displayWeather.counter%6].innerText = "Wetter in " + name;
    iconlist[displayWeather.counter%6].src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
   desclist[displayWeather.counter%6].innerText = description;
    templist[displayWeather.counter%6].innerText = temp + "°C";
    humiditylist[displayWeather.counter%6].innerText =
      "Luftfeuchtigkeit " + humidity + "%";
    windlist[displayWeather.counter%6].innerText =
      "Windgeschwindigkeit: " + speed + " km/h";

      displayWeather.counter++;

}
displayWeather.counter=0;

busandtrainhistory=["test"];

async function getBusData(){
    bus = await fetchBusData(true);

    train = await fetchBusData(false);

    console.log(bus);
    console.log(train);

    busandtrain=[];
    

    
  
   for(x of bus){
    
        if(x.dateTime.hour.length == 1) {
            x.dateTime.hour = '0'+x.dateTime.hour;
        }
        if(x.dateTime.minute.length == 1) {
            x.dateTime.minute = '0'+x.dateTime.minute;
        }
       
       busandtrain.push([x.servingLine.direction,x.servingLine.number,x.dateTime.hour+":"+x.dateTime.minute, x.countdown,x.onwardStopSeq[0].ref.arrDelay,"bus"]);
   }

   for(x of train){
    if(x.dateTime.hour.length == 1) {
        x.dateTime.hour = '0'+x.dateTime.hour;
    }
    if(x.dateTime.minute.length == 1) {
        x.dateTime.minute = '0'+x.dateTime.minute;
    }

    busandtrain.push([x.servingLine.direction,x.servingLine.number.slice(0,8),x.dateTime.hour+":"+x.dateTime.minute, x.countdown,x.servingLine.delay,"train"]);  
   }

   busandtrain.sort(sortFunction);

   for(x of busandtrain){

    if(x[3]>60){
        x[3]=timeConvert(x[3]);
    }
   }

function sortFunction(a, b) {
    if (Number(a[3]) == Number(b[3])) {
        return 0;
    }
    else {
        return (Number(a[3]) < Number(b[3])) ? -1 : 1;
    }
}

   console.log(busandtrain);
   console.log(busandtrainhistory);

   if(busandtrain[0][0]!=busandtrainhistory[0][0]){
        console.log("falsch");//falls array verändert wird 
   }

   busandtrainhistory=[];

   for(x of busandtrain){
       busandtrainhistory.push(x);
   }

   
  
};

arr=["Brixen", "Sterzing", "Bozen", "Bruneck", "Klausen", "Brenner"];



async function start(){
    for(x of arr){
         await fetchWeather(x); 
    }
    getBusData();
}

start();

setInterval(start,60000);

