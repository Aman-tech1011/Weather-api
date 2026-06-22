const apiKey = "164ae627b77a7fcb7ce49ff30ae163cd";

async function getWeather() {
    const cityInput = document.getElementById("city");
    const city = cityInput.value.trim();
    const weatherCard = document.getElementById("weatherCard");

    if (!city) {
        alert("Please enter a city name.");
        cityInput.focus();
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "City not found");
        }

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temp").textContent = `${Math.round(data.main.temp)} °C`;
        document.getElementById("condition").textContent = data.weather[0].main;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("wind").textContent = data.wind.speed;
        weatherCard.style.display = "block";
    }
    catch(error) {
        weatherCard.style.display = "none";
        alert("City not found!");
    }
}

document.getElementById("searchButton").addEventListener("click", getWeather);
document.getElementById("city").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});
