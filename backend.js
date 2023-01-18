async function suggestionsHelper(suggestionString) {
  //nach region gefetched, sollte aber nach name sein
  const url = `http://api.weatherapi.com/v1/search.json?key=3063085c339a4700af7192624231701&q=${suggestionString}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);

  return data.filter((e) =>
    e.name.toLocaleLowerCase().includes(suggestionString.toLocaleLowerCase())
  );
}

suggestionsHelper("lond");

async function getWeatherData(name) {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=3063085c339a4700af7192624231701&q=${name}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

getWeatherData("London");
