import "./styles.css";
const api_key = "6ZUJY3SDN5235PFCJT736HJTT";

async function getWeather(location) {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
  );
  try {
    const weatherData = await result.json();
    console.log(weatherData.currentConditions.temp);
    const weather = {
      temp: weatherData.currentConditions.temp,
      conditions: weatherData.currentConditions.conditions,
      resolvedAddress: weatherData.resolvedAddress,
    };
    console.log(weatherData);
    return weather;
  } catch {
    console.log("Invalid location");
    return null;
  }
}

const form = document.querySelector("form");
const input = document.querySelector("#location");
let weather;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeather(input.value).then((weatherData) => {
    weather = weatherData;
    displayWeather();
  });
});

function displayWeather() {
  console.log(`Weather data: ${weather}`);
  const currentTemp = document.querySelector("#current-temp");
  const location = document.querySelector("div.location");
  location.textContent = weather.resolvedAddress;
  currentTemp.textContent = weather.temp + " ℉";
}
