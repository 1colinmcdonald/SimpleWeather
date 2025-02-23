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
    };
    console.log(weatherData);
    return weather;
  } catch {
    console.log("Invalid location");
    return null;
  }
}

