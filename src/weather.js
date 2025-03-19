const api_key = "6ZUJY3SDN5235PFCJT736HJTT";

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export let currentUnits = "Fahrenheit";
export async function getWeather(location) {
  const result = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${api_key}`
  );
  try {
    const weatherData = await result.json();
    console.log(weatherData);
    // const date = new Date().toUTCString();
    const dateString = `${weatherData.days[0].datetime}T${weatherData.currentConditions.datetime}`;
    const date = new Date(dateString);
    console.log(dateString);
    console.log(date);
    console.log(date.getTimezoneOffset());
    console.log(`Hour: ${date.getHours()}`);
    currentUnits = "Fahrenheit";
    const weather = {
      temp: weatherData.currentConditions.temp,
      conditions: weatherData.currentConditions.conditions,
      resolvedAddress: weatherData.resolvedAddress,
      tempmax: weatherData.days[0].tempmax,
      tempmin: weatherData.days[0].tempmin,
      description: weatherData.description,
      days: weatherData.days.slice(0, 10).map((day) => {
        return {
          day: daysOfWeek[new Date(day.datetime).getDay()],
          tempmax: day.tempmax,
          tempmin: day.tempmin,
        };
      }),
    };
    console.log("Weather data is good");
    return weather;
  } catch {
    return null;
  }
}

const convertToCelsius = (temp) => ((temp - 32) * 5) / 9;

const convertToFahrenheit = (temp) => (temp * 9) / 5 + 32;

function convertWeather(weather, conversion) {
  if (!weather) {
    console.log("No weather");
    return weather;
  }
  console.log(conversion);
  const { temp, tempmax, tempmin, days } = weather;
  weather = {
    ...weather,
    temp: conversion(temp),
    tempmax: conversion(tempmax),
    tempmin: conversion(tempmin),
    days: days.map((day) => ({
      ...day,
      tempmax: conversion(day.tempmax),
      tempmin: conversion(day.tempmin),
    })),
  };
  console.log(weather);
  return weather;
}

export function convertAllWeatherToCelsius(weather) {
  console.log("yo");
  currentUnits = "Celsius";
  return convertWeather(weather, convertToCelsius);
}
export function convertAllWeatherToFahrenheit(weather) {
  console.log("sup");
  currentUnits = "Fahrenheit";
  return convertWeather(weather, convertToFahrenheit);
}
