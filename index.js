const weatherLocation = document.getElementById('location');
const searchBtn = document.querySelector('button');

async function fetchWeatherData(locationValue) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationValue}?key=BW6YSKFATY4DVP95GN9EGPGTB`);

    const returnedData = await response.json();

    const weatherData = extractLocationData(returnedData);
    console.log(weatherData);
}

searchBtn.addEventListener('click', () => fetchWeatherData(weatherLocation.value));

function extractLocationData(responseObj) {
    let data = {};

    data.condition = responseObj.currentConditions.conditions;
    data.temperature = responseObj.currentConditions.temp;
    data.feelsLike = responseObj.currentConditions.feelslike;
    data.humidity = responseObj.currentConditions.humidity

    return data;
}
