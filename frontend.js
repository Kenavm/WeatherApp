const labelComponent = (text) => `<label>${text}</label>`
const inputComponent = () => `<input id="input"></input>`
const cardComponent = (id) => `<div id=${id}></div>`
const heading = (city) => `<h2>${city}</h2>`
const unorderedList = (temperature, skyConditions, humidty) => `<li>${temperature} </li>`

const root = document.getElementById("root")

root.innerHTML = labelComponent("Please put in a city name: ");
root.innerHTML += inputComponent();

