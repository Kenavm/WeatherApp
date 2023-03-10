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
  `<img src=${imagePath} width="1100" height="1200">`;

const buttonComponent = (id, text) => `<button id = ${id}>${text}</button>`;

const root = document.getElementById("root");
root.innerHTML += "<h1>WEATHER APP</h1>";
root.innerHTML += inputComponent();
const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("#input");
const suggBox = document.querySelector(".autocom-box");
const body = document.querySelector("body");
body.insertAdjacentHTML(
  "beforeend",
  buttonComponent("favourite", "Favourites")
);
const favouriteButton = document.getElementById("favourite");
let favouriteList = [];
let favouritesContainer = document.createElement("div");
body.appendChild(favouritesContainer);
favouritesContainer.className = "favouritesList";

favouriteButton.addEventListener("click", () => {
  favouriteList.pop();
  const h2 = document.querySelector("h2");
  favouriteList.push(h2.textContent);
});

inputBox.onkeyup = async (e) => {
  const weatherInfo = document.getElementById("weather-info");
  if (e.target.value === "") {
    favouritesContainer.style.visibility = "visible";
    if (weatherInfo !== null) {
      weatherInfo.remove();
    }
   
    let favouriteListItems = [];

    favouriteList.forEach(favourite => {
      favouriteListItems.push(`<li onclick="select(this)" class="favourite">${favourite}</li>`);
    })

    if (favouriteListItems[0] !== undefined) {
      favouritesContainer.insertAdjacentHTML("afterbegin", favouriteListItems[0]);
    }
    
  } else {
    favouritesContainer.style.visibility = "hidden";
    let userData = e.target.value;
    if (userData.length >= 3) {
      const suggestionList = await suggestionsHelper(userData);
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
  }
};

const select = (listItem) => {
  let cityName = listItem.textContent;
  inputBox.value = cityName;
  const weatherInfoBox = document.querySelector("#weather-info");
 
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
    let userValue = input.value;
    listItemsToDisplay = `<li>${userValue}</li>`;
  } else {
    listItemsToDisplay = suggestionList.join("");
  }
  suggBox.innerHTML = listItemsToDisplay;
};

const displayCard = async (cityName) => {
  const spinner = document.getElementById("spinner");
  spinner.removeAttribute('hidden');
  const weatherInfo = await getWeatherData(cityName);
  spinner.setAttribute('hidden', '');
  console.log(weatherInfo);
  const currentTemperature = `Temperature: ${Math.floor(
    weatherInfo.current.temp_c
  )} degrees celsius`;
  const currentHumidty = `Humidty: ${weatherInfo.current.humidity}`;
  const currentSkyCondition = `Sky conditions: ${weatherInfo.current.condition.text}`;
  const header = heading(cityName);
  let image;
  try {
    const imageUrl = await getCityImage(cityName);
    image = imageComponent(imageUrl);
  } catch (e) {
    console.error(e);
    image = `<section class="error"> No Image found </section>`;
  }

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
  );
};
