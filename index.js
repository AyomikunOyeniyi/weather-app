const weatherLocation = document.getElementById('location');
const searchBtn = document.querySelector('.search-btn');
const celBtn = document.querySelector('.c-btn');
const fahrBtn = document.querySelector('.f-btn');
const resultsDisplay = document.querySelector('.result-display');

export default function checkMetrics(fahrenheitState) {
    if (fahrenheitState) {
        return 'us';
    } else {
        return 'uk';
    }
}

let isFahrenheit = true;

async function fetchWeatherData(locationValue) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationValue}?&unitGroup=${checkMetrics(isFahrenheit)}&key=BW6YSKFATY4DVP95GN9EGPGTB`);

    const returnedData = await response.json();

    const weatherData = extractLocationData(returnedData);
    populateResultsDisplay(weatherData);
}

searchBtn.addEventListener('click', () => {
    fetchWeatherData(weatherLocation.value)
});

celBtn.addEventListener('click', () => {
    isFahrenheit = false;
    fetchWeatherData(weatherLocation.value);
});

fahrBtn.addEventListener('click', () => {
    isFahrenheit = true;
    fetchWeatherData(weatherLocation.value);
});

function extractLocationData(responseObj) {
    let data = {};

    data.condition = responseObj.currentConditions.conditions;
    data.temperature = responseObj.currentConditions.temp;
    data.feelsLike = responseObj.currentConditions.feelslike;
    data.humidity = responseObj.currentConditions.humidity

    return data;
}

function populateResultsDisplay(weatherObj) {
    const condPara = document.querySelector('.condition');
    const tempPara = document.querySelector('.temperature');
    const feelPara = document.querySelector('.feels-like');
    const humPara = document.querySelector('.humidity');

    condPara.textContent += `${weatherObj.condition}`
    tempPara.textContent += `${weatherObj.temperature}`
    feelPara.textContent += `${weatherObj.feelsLike}`
    humPara.textContent += `${weatherObj.humidity}`
}