import {
  getWeather,
  convertAllWeatherToCelsius,
  convertAllWeatherToFahrenheit,
  currentUnits,
} from "./weather";
import "./styles.css";

let weather = null;

const form = document.querySelector("form");
const input = document.querySelector("#location");
const loading = document.querySelector(".loader");
const location = document.querySelector("div.location");
const currentTemp = document.querySelector("#current-temp");
const currentConditions = document.querySelector("#current-conditions");
const tempmax = document.querySelector(".temp-max > .data");
const tempMin = document.querySelector(".temp-min > .data");
const description = document.querySelector("#description");
const weatherText = document.querySelector("#weather-text");
const days = document.querySelectorAll("#ten-day-forecast > .day");
const scaleSwitcher = document.querySelector("#scale-switcher");
const dayTemps = document.querySelectorAll(".day-min,.day-max");
scaleSwitcher.addEventListener("click", () => {
  if (scaleSwitcher.textContent === "Switch to Celsius") {
    console.log("Converting to celsius!");
    weather = convertAllWeatherToCelsius(weather);
    scaleSwitcher.textContent = "Switch to Fahrenheit";
    console.log(weather);
  } else {
    console.log("Converting to Fahrenheit");
    weather = convertAllWeatherToFahrenheit(weather);
    console.log(weather);
    scaleSwitcher.textContent = "Change to Celsius";
  }
  displayWeather();
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value === "") {
    clearScreen();
  } else {
    weatherText.classList.remove("hidden");

    showLoadingState();
    getWeather(input.value)
      .then((weatherData) => {
        weather = weatherData;
        console.log(`Weather data: ${weatherData}`);
        console.log(`input value: ${input.value}`);

        displayWeather();
      })
      .catch((error) => {
        console.log("An error occurred");
        displayWeather();
      });
  }
});

function displayWeather() {
  showDoneLoadingState();
  if (weather) {
    document.body.style.backgroundColor = "rgb(255, 38, 0)";
    if (weather.temp < 140) {
      document.body.style.backgroundColor = "rgb(255, 106, 0)";
    }
    if (weather.temp < 100) {
      document.body.style.backgroundColor = "rgb(255, 77, 0)";
    }
    if (weather.temp < 90) {
      document.body.style.backgroundColor = "rgb(255, 132, 0)";
    }
    if (weather.temp < 80) {
      document.body.style.backgroundColor = "rgb(255, 200, 0)";
    }
    if (weather.temp < 70) {
      document.body.style.backgroundColor = "rgb(255, 255, 0)";
    }
    if (weather.temp < 60) {
      document.body.style.backgroundColor = "rgb(0, 225, 255)";
    }
    if (weather.temp < 50) {
      document.body.style.backgroundColor = "rgb(0, 204, 255)";
    }
    if (weather.temp < 40) {
      document.body.style.backgroundColor = "rgb(0, 149, 255)";
    }
    if (weather.temp < 30) {
      document.body.style.backgroundColor = "rgb(0, 55, 255);";
    }
    if (weather.temp < 20) {
      document.body.style.backgroundColor = "rgb(0, 13, 255);";
    }
    if (weather.temp < 10) {
      document.body.style.backgroundColor = "rgb(21, 0, 255);";
    }
    if (weather.temp < 0) {
      document.body.style.backgroundColor = "rgb(47, 0, 255);";
    }
    if (weather.temp < -10) {
      document.body.style.backgroundColor = "rgb(106, 0, 255)";
    }
    if (weather.temp < -20) {
      document.body.style.backgroundColor = "rgb(76, 0, 255);";
    }
    if (weather.temp < -30) {
      document.body.style.backgroundColor = "rgb(0, 26, 255);";
    }
    if (weather.temp < -40) {
      document.body.style.backgroundColor = "rgb(149, 0, 255)";
    }
    location.textContent = weather.resolvedAddress;
    currentTemp.textContent = `${Math.round(weather.temp)}°`;
    currentConditions.textContent = weather.conditions;
    tempmax.textContent = `${Math.round(weather.tempmax)}°`;
    tempMin.textContent = `${Math.round(weather.tempmin)}°`;
    description.textContent = weather.description;
    for (let i = 0; i < days.length; i++) {
      const dayOfWeek = days[i].querySelector(".day-of-week");
      if (i === 0) {
        dayOfWeek.textContent = "Today";
      } else {
        dayOfWeek.textContent = weather.days[i].day;
      }
      days[i].querySelector(".day-min").textContent = `${Math.round(
        weather.days[i].tempmin
      )}°`;
      days[i].querySelector(".day-max").textContent = `${Math.round(
        weather.days[i].tempmax
      )}°`;
    }
  } else {
    weatherText.classList.add("hidden");
    location.textContent = `Could not find location: ${input.value}`;
  }
}

function convertToCelsius() {
  weather = convertAllWeatherToCelsius(weather);
  displayWeather();
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
  tempmax.classList.add("hidden");
  tempMin.classList.add("hidden");
  dayTemps.forEach((element) => {
    element.classList.add("hidden");
  });
}

function showDoneLoadingState() {
  loading.classList.add("hidden");
  loading.classList.remove("unhidden-loader");
  location.classList.remove("hidden");
  currentTemp.classList.remove("hidden");
  currentConditions.classList.remove("hidden");
  description.classList.remove("hidden");
  tempmax.classList.remove("hidden");
  tempMin.classList.remove("hidden");
  scaleSwitcher.textContent = `Switch to ${getOtherUnits()}`;
  scaleSwitcher.classList.remove("hidden");
  dayTemps.forEach((element) => {
    element.classList.remove("hidden");
  });
}

const getOtherUnits = () =>
  currentUnits === "Celsius" ? "Fahrenheit" : "Celsius";

function clearScreen() {
  weatherText.classList.add("hidden");
  location.classList.add("hidden");

  scaleSwitcher.classList.add("hidden");
}
