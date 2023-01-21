async function suggestionsHelper(suggestionString) {
  //nach region gefetched, sollte aber nach name sein
  const url = `http://api.weatherapi.com/v1/search.json?key=3063085c339a4700af7192624231701&q=${suggestionString}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data);

  return data;
  //.filter((e) =>e.name.toLocaleLowerCase().includes(suggestionString.toLocaleLowerCase()));
}

//suggestionsHelper("lond");

async function getWeatherData(name) { 
  const url = `https://api.weatherapi.com/v1/forecast.json?key=3063085c339a4700af7192624231701&q=${name}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

async function getCityImage(cityName) {
  const url = `https://api.pexels.com/v1/search?query=${cityName}`;
  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "zyAaNpAJE1tZGau46Y361em7MBhhgu1F4T2QONQy5Zo8TYl66KV5Wowb",
    },
  });
  const data = await res.json();
  const randomIndex = Math.floor(Math.random() * 10);
  console.log(data);
  return data.photos[randomIndex].src.landscape;
}

getCityImage("Vienna");
