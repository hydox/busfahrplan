// mapboxgl.accessToken = 'pk.eyJ1IjoiaHlkb3giLCJhIjoiY2t6MmRia2Y3MDRmeTJ1bnl3YWI3a2ZucSJ9.f7DQ8p_g9zDfSPr6-pAEPg';
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/hydox/ckz2duviv006415p1e0xl78ql',
// });

// //Adds navigation controls: zooming in/out
// map.addControl(new  mapboxgl.NavigationControl());

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

   
    console.log(name);

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

arr=["Brixen", "Sterzing", "Bozen", "Bruneck", "Klausen", "Brenner"];

// setInterval(start,10000);

async function start(){
    for(x of arr){
         await fetchWeather(x); 
        
    }
}

