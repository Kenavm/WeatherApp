const inputComponent = () =>`<div class="search-input"> <input id = "input" type="text" placeholder="Type to search..."><div class="autocom-box"></div>`;
const cardComponent = (id) => `<div id=${id}></div>`;
const heading = (city) => `<h2>${city}</h2>`;
const unorderedList = (temperature, skyConditions, humidty) =>`<li>${temperature} </li> <li>${skyConditions} </li> <li>${humidty} </li>`;
const dataList = () => `<datalist id="cities"></datalist>`;
const option = (cityName) => `<option value = ${cityName.toLowerCase()}>`;
const card = (unorderedList) =>  `<div id="weather-info"> ${unorderedList} </div>`;

const root = document.getElementById("root");

root.innerHTML += inputComponent();
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#input");
const suggBox = document.querySelector(".autocom-box");

inputBox.onkeyup = async (e) => {
  let userData = e.target.value;
  let emptyArray = [];
  if (userData.length >= 3) {
    const suggestionList = await suggestionsHelper(e.target.value);
    emptyArray = suggestionList.filter((data) => {
      return data;
    });
    emptyArray = emptyArray.map((data) => {
      return (data = `<li>${data.name}</li>`);
    });
    console.log(emptyArray);
    searchWrapper.classList.add("active");
    showSuggestions(emptyArray);
    let allList = document.querySelectorAll("li");
    for (let i = 0; i < allList.length; i++) {
      allList[i].setAttribute("onclick", "select(this)");
    }
  } else {
    searchWrapper.classList.remove("active");
  }
};

select = (element) => {
  let selectUserData = element.textContent;
  console.log(selectUserData);
  inputBox.value = selectUserData;
  searchWrapper.classList.remove("active");
};

showSuggestions = (list) => {
  let listData;
  if (!list.length) {
    userValue = input.value;
    listData = `<li>${userValue}</li>`;
  } else {
    listData = list.join("");
  }
  suggBox.innerHTML = listData;
};

/* async function displayCard(cityName) {
const weatherInfo = await getWeatherData(cityName);
console.log(weatherInfo);
const currentTemperature = weatherInfo.current.temp_c;
const currentHumidty = weatherInfo.current.humidity;
const currentSkyCondition = weatherInfo.current.condition.text;

root.innerHTML += card(
unorderedList(currentTemperature, currentHumidty, currentSkyCondition)
);
}
displayCard(input.value);
*/
