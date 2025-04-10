const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "1f14e9f5498def2638bc8592073e6bc5";


card.style.display = "none";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.log(error);
            displayError("Could not fetch weather data. Please try again.");
        }
    } else {
        displayError("Please enter a city");
    }
});

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    const response = await fetch(apiurl);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description } = data.weather[0];
    const emoji = getWeatherEmoji(data.weather[0].main);

    card.innerHTML = `
        <h1 class="cityDisplay">${name}</h1>
        <p class="tempDisplay">${Math.round(temp)}°C</p>
        <p class="humidityDisplay">Humidity: ${humidity}%</p>
        <p class="descDisplay">${description}</p>
        <p class="weatherEmoji">${emoji}</p>
    `;

    card.style.display = "flex";
}

function displayError(message) {
    card.innerHTML = `
        <p class="errorDisplay">${message}</p>
    `;
    card.style.display = "flex";
}

function getWeatherEmoji(condition) {
    switch (condition.toLowerCase()) {
        case "clear":
            return "☀️";
        case "clouds":
            return "☁️";
        case "rain":
            return "🌧️";
        case "snow":
            return "❄️";
        case "thunderstorm":
            return "⛈️";
        case "drizzle":
            return "🌦️";
        case "mist":
        case "fog":
            return "🌫️";
        default:
            return "🌈";
    }
}
