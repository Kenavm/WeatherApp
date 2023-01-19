const labelComponent = (text) => `<label>${text}</label>`;
const inputComponent = () => `<input id="input" list="cities"></input>`;
const cardComponent = (id) => `<div id=${id}></div>`;
const heading = (city) => `<h2>${city}</h2>`;
const unorderedList = (temperature, skyConditions, humidty) => `<li>${temperature} </li> <li>${skyConditions} </li> <li>${humidty} </li>`;
const dataList = () => `<datalist id="cities"></datalist>`;
const option = (cityName) => `<option value = ${cityName.toLowerCase()}>`;
const card = (unorderedList) =>`<div id="weather-info"> ${unorderedList} </div>`;

const root = document.getElementById("root");

root.innerHTML = labelComponent("Please put in a city name: ");
root.innerHTML += inputComponent();
root.innerHTML += dataList();
const datalist = document.getElementById("cities");

const input = document.getElementById("input");

input.addEventListener("input", async (e) => {
  if (e.target.value.length >= 3) {
    const suggestionList = await suggestionsHelper(e.target.value);
    for (const suggestion of suggestionList) {
      console.log(suggestion.name);
      datalist.insertAdjacentHTML("afterbegin", option(suggestion.name));
    }
  }
});

displayCard("London");

async function displayCard(cityName) {
  const weatherInfo = await getWeatherData(cityName);
  console.log(weatherInfo);
  const currentTemperature = weatherInfo.current.temp_c;
  const currentHumidty = weatherInfo.current.humidity;
  const currentSkyCondition = weatherInfo.current.condition.text;

  root.innerHTML += card(
    unorderedList(currentTemperature, currentHumidty, currentSkyCondition)
  );
}
