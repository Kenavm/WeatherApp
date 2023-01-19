const inputComponent = () =>
  `<div class="search-input"> <input id = "input" type="text" placeholder="Type to search..."><div class="autocom-box"></div>`;
const cardComponent = (id) => `<div id=${id}></div>`;
const heading = (city) => `<h2>${city}</h2>`;
const unorderedList = (temperature, skyConditions, humidty) =>
  `<li>${temperature} </li> <li>${skyConditions} </li> <li>${humidty} </li>`;
const dataList = () => `<datalist id="cities"></datalist>`;
const option = (cityName) => `<option value = ${cityName.toLowerCase()}>`;
const card = (unorderedList) =>
  `<div id="weather-info"> ${unorderedList} </div>`;

const root = document.getElementById("root");

root.innerHTML += inputComponent();
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#input");
const suggBox = document.querySelector(".autocom-box");

<<<<<<< HEAD
const input = document.getElementById("input");

input.addEventListener("input", async (e) => {
  let first = datalist.firstChild;
  console.log(first);
  while (first) {
    first.remove();
    first = datalist.firstChild;
  }
  if (e.target.value.length >= 3) {
    const suggestionList = await suggestionsHelper(e.target.value);
    for (const test of suggestionList) {
      //console.log(test.name);
      datalist.insertAdjacentHTML("afterbegin", option(test.name));
=======
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

>>>>>>> 48a74713837469b6a11e137b06e1a409d1a0dd6e
    }
  } else {
    searchWrapper.classList.remove("active");
  }
<<<<<<< HEAD
  let options = document.getElementsByTagName("option");
  for (let i = 0; i < options.length; i++) {
    console.log(options[i].value);
=======
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
>>>>>>> 48a74713837469b6a11e137b06e1a409d1a0dd6e
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
