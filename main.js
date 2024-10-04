console.log("This is main.js");

async function getData(city, apiKey) {
  let finalURL = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${apiKey}`;

  let result = await fetch(finalURL);
  let jsonRes = await result.json();
  console.log(jsonRes);
}

getData("Scarbrough", "7fb5a6b15048493cab530745240410");
