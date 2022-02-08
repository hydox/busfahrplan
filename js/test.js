const busplanhistory = [
    [
      "Brixen, Progress",
      "401",
      "17:32",
      "2",
      "0",
      "bus"
    ],
    [
      "Vahrn, Post",
      "320.1",
      "17:34",
      "4",
      "0",
      "bus"
    ],
    [
      "Brenner, Bahnhof Brenner",
      "R 17264 ",
      "17:30",
      "5",
      "5",
      "train"
    ],
    [
      "Albeins, Grundschule",
      "320.1",
      "17:39",
      "9",
      "0",
      "bus"
    ],
    [
      "Lienz, Bahnhof Lienz",
      "R 1880 T",
      "17:36",
      "11",
      "5",
      "train"
    ],
    [
      "Brixen, Vinzentinum",
      "170",
      "17:46",
      "16",
      "0",
      "bus"
    ],
    [
      "Natz - Schabs",
      "328",
      "17:47",
      "17",
      "0",
      "bus"
    ],
    [
      "Vahrn, Post",
      "320.1",
      "17:49",
      "19",
      "0",
      "bus"
    ],
    [
      "Mühlbach, Bahnhof Mühlbach",
      "401",
      "17:52",
      "22",
      "0",
      "bus"
    ],
    [
      "Milland, Zeffer",
      "320.1",
      "17:54",
      "24",
      "0",
      "bus"
    ],
  ]
const busplan = [
    [
      "Brixen, Bahnhof",
      "328",
      "17:30",
      "0",
      "0",
      "bus"
    ],
    [
      "Brixen, Progress",
      "401",
      "17:32",
      "2",
      "0",
      "bus"
    ],
    [
      "Vahrn, Post",
      "320.1",
      "17:34",
      "4",
      "0",
      "bus"
    ],
    [
      "Brenner, Bahnhof Brenner",
      "R 17264 ",
      "17:30",
      "5",
      "5",
      "train"
    ],
    [
      "Albeins, Grundschule",
      "320.1",
      "17:39",
      "9",
      "0",
      "bus"
    ],
    [
      "Lienz, Bahnhof Lienz",
      "R 1880 T",
      "17:36",
      "11",
      "5",
      "train"
    ],
    [
      "Brixen, Vinzentinum",
      "170",
      "17:46",
      "16",
      "0",
      "bus"
    ],
    [
      "Natz - Schabs",
      "328",
      "17:47",
      "17",
      "0",
      "bus"
    ],
    [
      "Vahrn, Post",
      "320.1",
      "17:49",
      "19",
      "0",
      "bus"
    ],
    [
      "Mühlbach, Bahnhof Mühlbach",
      "401",
      "17:52",
      "22",
      "0",
      "bus"
    ],
  ]

const schedule = document.querySelector(".schedule");
const rowsSchedule = document.querySelectorAll(".row");
const line = document.querySelectorAll(".line");
const direction = document.querySelectorAll(".direction");
const time = document.querySelectorAll(".time");
const countdown = document.querySelectorAll(".countdown");

for (let i = 0; i < busplanhistory.length; i++) {
  direction[i].innerHTML = busplanhistory[i][0];
  line[i].innerHTML = busplanhistory[i][1];
  time[i].innerHTML = busplanhistory[i][2];
  countdown[i].innerHTML = busplanhistory[i][3];
}

for (let i = 1; i <= 5; i++) {
  rowsSchedule[i-1].classList.add("row" + i);
}

async function onChange(){
  const changedRows = [rowsSchedule[0]];
  const newData = [busplan[9]];

  const newRows = createRows(newData);
  newRows[newRows.length-1].classList.add()
  changedRows.forEach(e => {
      e.classList.add("disappear");
  })
  for (let i = 1; i <= 5; i++) {
      rowsSchedule[i].classList.add("row" + i);
      rowsSchedule[i].classList.remove("row" + (i+1));
  }
  schedule.append(...newRows);
  await new Promise(r => setTimeout(r, 500));
  changedRows.forEach(e => schedule.removeChild(e));
    
}

function createRows(data){
  return data.map(dataRow => {
    const row = document.createElement("div");
    row.classList.add("row");

    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    
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

    row.appendChild(wrapper);
    wrapper.append(line, direction, time, countdown);
    return row;
  });
}

// Button for testing
document.querySelector(".button").addEventListener('click', onChange);
