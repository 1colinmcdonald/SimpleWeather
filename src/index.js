import "./styles.css";
const api_key = "6ZUJY3SDN5235PFCJT736HJTT";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
async function getWeather(location) {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
  );
  try {
    const weatherData = await result.json();
    console.log(weatherData);
    const dateString = `${weatherData.days[0].datetime}T${weatherData.currentConditions.datetime}`;
    const date = new Date(dateString);
    console.log(dateString);
    console.log(date);

    // [Log] Object

    const weather = {
      temp: Math.round(weatherData.currentConditions.temp),
      conditions: weatherData.currentConditions.conditions,
      resolvedAddress: weatherData.resolvedAddress,
      tempMax: Math.round(weatherData.days[0].tempmax),
      tempMin: Math.round(weatherData.days[0].tempmin),
      description: weatherData.description,
      days: weatherData.days.slice(0, 10).map((day) => {
        return {
          day: daysOfWeek[new Date(day.datetime).getDay()],
          tempmax: Math.round(day.tempmax),
          tempmin: Math.round(day.tempmin),
        };
      }),
    };
    return weather;
  } catch {
    return null;
  }
}

const form = document.querySelector("form");
const input = document.querySelector("#location");
const loading = document.querySelector(".loader");
const location = document.querySelector("div.location");
const currentTemp = document.querySelector("#current-temp");
const currentConditions = document.querySelector("#current-conditions");
const tempMax = document.querySelector(".temp-max > .data");
const tempMin = document.querySelector(".temp-min > .data");
const description = document.querySelector("#description");
const weatherText = document.querySelector("#weather-text");
const days = document.querySelector("#ten-day-forecast");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value === "") {
    weatherText.classList.add("hidden");
    location.classList.add("hidden");
  } else {
    weatherText.classList.remove("hidden");

    showLoadingState();
    getWeather(input.value)
      .then((weatherData) => {
        displayWeather(weatherData);
      })
      .catch((error) => {
        displayWeather(null);
      });
  }
});

function displayWeather(weather) {
  showDoneLoadingState();
  if (weather) {
    location.textContent = weather.resolvedAddress;
    currentTemp.textContent = weather.temp;
    currentConditions.textContent = weather.conditions;
    tempMax.textContent = `${weather.tempMax}`;
    tempMin.textContent = `${weather.tempMin}`;
    description.textContent = weather.description;
    for (let i = 0; i < days.children.length; i++) {
      const dayOfWeek = days.children[i].querySelector(".day-of-week");
      if (i === 0) {
        dayOfWeek.textContent = "Today";
      } else {
        dayOfWeek.textContent = weather.days[i].day;
      }
      days.children[i].querySelector(
        ".day-min"
      ).textContent = `${weather.days[i].tempmin}°`;
      days.children[i].querySelector(
        ".day-max"
      ).textContent = `${weather.days[i].tempmax}°`;
    }
  } else {
    weatherText.classList.add("hidden");
    location.textContent = `Could not find location: ${input.value}`;
  }
}

function domReady(cb) {
  if (
    document.readyState === "interactive" ||
    document.readyState === "complete"
  ) {
    cb();
  } else {
    document.addEventListener("DOMContentLoaded", cb);
  }
}

domReady(() => {
  document.body.style.visibility = "visible";
});

function showLoadingState() {
  loading.classList.remove("hidden");
  loading.classList.add("unhidden-loader");
  location.classList.add("hidden");
  currentTemp.classList.add("hidden");
  currentConditions.classList.add("hidden");
  description.classList.add("hidden");
  tempMax.classList.add("hidden");
  tempMin.classList.add("hidden");
}

function showDoneLoadingState() {
  loading.classList.add("hidden");
  loading.classList.remove("unhidden-loader");
  location.classList.remove("hidden");
  currentTemp.classList.remove("hidden");
  currentConditions.classList.remove("hidden");
  description.classList.remove("hidden");
  tempMax.classList.remove("hidden");
  tempMin.classList.remove("hidden");
}
