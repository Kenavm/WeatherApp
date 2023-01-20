const inputComponent = () =>
  `<div class="search-input"> <input id = "input" type="text" placeholder="Type to search..."><div class="autocom-box"></div>`;
const cardComponent = (id) => `<div id=${id}></div>`;
const heading = (city) => `<h2>${city}</h2>`;
const unorderedList = (heading, temperature, skyConditions, humidty, image) =>
  `${heading} <br> <li class="weather-attribute">${temperature} </li> <li class="weather-attribute">${skyConditions} </li> <li class="weather-attribute">${humidty} </li>
  <div> ${image} </div>`;
const card = (unorderedList) =>
  `<div id="weather-info"> ${unorderedList} </div>`;
const imageComponent = (imagePath) =>
  `<img src=${imagePath} width="500" height="600">`;

const root = document.getElementById("root");
root.innerHTML += "<h1>WEATHER APP</h1>";
root.innerHTML += inputComponent();
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#input");
const suggBox = document.querySelector(".autocom-box");

inputBox.onkeyup = async (e) => {
  console.log("Hello");
  let userData = e.target.value;
  if (userData.length >= 3) {
    const suggestionList = await suggestionsHelper(userData);
    console.log(suggestionList);
    const suggestionListItems = suggestionList.map((listItem) => {
      return (listItem = `<li>${listItem.name}</li>`);
    });

    searchWrapper.classList.add("active");
    showSuggestions(suggestionListItems);
    let allListItems = document.querySelectorAll("li");
    allListItems.forEach((listItem) => {
      listItem.setAttribute("onclick", "select(this)");
    });
  } else {
    searchWrapper.classList.remove("active");
  }
};

const select = (listItem) => {
  let cityName = listItem.textContent;
  inputBox.value = cityName;
  const weatherInfoBox = document.querySelector("#weather-info");
  console.log(weatherInfoBox);
  if (weatherInfoBox !== null) {
    weatherInfoBox.remove();
  }
  displayCard(cityName);
  searchWrapper.classList.remove("active");
};

const showSuggestions = (suggestionList) => {
  let listItemsToDisplay;
  let isArrayEmpty = !suggestionList.length;

  if (isArrayEmpty) {
    let userValue = inputBox.value;
    listItemsToDisplay = `<li>${userValue}</li>`;
  } else {
    listItemsToDisplay = suggestionList.join("");
  }
  suggBox.innerHTML = listItemsToDisplay;
};

const displayCard = async (cityName) => {
  const weatherInfo = await getWeatherData(cityName);
  console.log(weatherInfo);
  const currentTemperature = `Temperature: ${Math.floor(weatherInfo.current.temp_c)} degrees celsius`;
  const currentHumidty = `Humidty: ${weatherInfo.current.humidity}`;
  const currentSkyCondition = `Sky conditions: ${weatherInfo.current.condition.text}`;
  const header = heading(cityName);
  const imageUrl = await getCityImage(cityName);
  const image = imageComponent(imageUrl);
  root.insertAdjacentHTML(
    "beforeend",
    card(
      unorderedList(
        header,
        currentTemperature,
        currentHumidty,
        currentSkyCondition,
        image
      )
    )
  )

};