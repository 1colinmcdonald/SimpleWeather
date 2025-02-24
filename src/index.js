import "./styles.css";
const api_key = "6ZUJY3SDN5235PFCJT736HJTT";

async function getWeather(location) {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
  );
  try {
    const weatherData = await result.json();
    const weather = {
      temp: weatherData.currentConditions.temp,
      conditions: weatherData.currentConditions.conditions,
      resolvedAddress: weatherData.resolvedAddress,
      tempMax: weatherData.days[0].tempmax,
      tempMin: weatherData.days[0].tempmin,
      description: weatherData.description,
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
form.addEventListener("submit", (event) => {
  event.preventDefault();
  getWeather(input.value)
    .then((weatherData) => {
      displayWeather(weatherData);
    })
    .catch((error) => {
      console.log(error);
      displayWeather(null);
    });
});

function displayWeather(weather) {
  const location = document.querySelector("div.location");
  if (weather) {
    const currentTemp = document.querySelector("#current-temp");
    const currentConditions = document.querySelector("#current-conditions");
    const tempMax = document.querySelector("#temp-max");
    const tempMin = document.querySelector("#temp-min");
    const description = document.querySelector("#description");
    location.textContent = weather.resolvedAddress;
    currentTemp.textContent = `${weather.temp} ℉`;
    currentConditions.textContent = weather.conditions;
    tempMax.textContent = `H:${weather.tempMax}`;
    tempMin.textContent = `L:${weather.tempMin}`;
    description.textContent = weather.description;
  } else {
    location.textContent = `Could not find location: ${input.value}`;
  }
}
