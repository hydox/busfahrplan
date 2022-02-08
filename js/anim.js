//TODO: Make wind speed svg smaller -> might be done
//TODO: Add expanded svg and remove small svg when expanded
//TODO: search all pngs given by the api and replace them with the exact name
//TODO: Add more information to expanded version and style it better

const animationLength = 10000;
const ratio = 0.3;

const rows = document.querySelectorAll(".weather-container-row");
const boxes = document.querySelectorAll(".weather-box");
const humidities = document.querySelectorAll(".humidity");
const infoDescs = document.querySelectorAll(".info-desc");
const winds = document.querySelectorAll(".wind");

const humidityDesc = document.createElement("p");
humidityDesc.innerText = "Luftfeuchtigkeit";

const windDesc = document.createElement("p");
windDesc.innerText = "Windgeschwindigkeit";

let counter = 0;
async function startAnimation() {
    for (let i = 0; i < boxes.length; i++) {
        if (i !== counter){
            boxes[i].classList.add("collapse");
        }else {
            boxes[i].classList.add("expand");
            templist[i].classList.add("temp-expanded");
            iconlist[i].classList.add("icon-expanded");
            locationlist[i].classList.add("location-expanded");
            desclist[i].classList.add("desc-expanded");
            humidities[i].classList.add("humidity-expanded");
            infoDescs[i*2].appendChild(humidityDesc);
            winds[i].classList.add("wind-expanded");
            infoDescs[i*2+1].appendChild(windDesc);
        }
    }
    for (let i = 0; i < rows.length; i++) {
        if (i !== parseInt(counter/2)){
            rows[i].classList.add("collapse");
        }
    }

    //Sleep animationLength * ratio -> show card animationLength * ratio;
    await new Promise(r => setTimeout(r, animationLength*ratio));

    /*
    for (let i = 0; i < boxes.length; i++) {
        if (i !== counter){
            boxes[i].classList.remove("collapse");
        }else {
            boxes[i].classList.remove("expand");
            templist[i].classList.remove("temp-expanded");
            iconlist[i].classList.remove("icon-expanded");
            locationlist[i].classList.remove("location-expanded");
            desclist[i].classList.remove("desc-expanded");
            humidities[i].classList.remove("humidity-expanded");
            infoDescs[i*2].removeChild(humidityDesc);
            winds[i].classList.remove("wind-expanded");
            infoDescs[i*2+1].removeChild(windDesc);
        }
    }
    for (let i = 0; i < rows.length; i++) {
        if (i !== parseInt(counter/2)){
            rows[i].classList.remove("collapse");
        }
    }*/
    
    counter = (counter+1) % 6;
}

startAnimation();
//setInterval(startAnimation, animationLength);

