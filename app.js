const API_KEY = "7aad99a9c46f84568c55868fbd3435ce";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    getWeather();
  }
});
async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found!");
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `🌡️ Temperature: ${data.main.temp}°C`;
  document.getElementById("description").textContent = `☁️ ${data.weather[0].description}`;
  document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `🌬️ Wind: ${data.wind.speed} m/s`;

  document.getElementById("weather").classList.remove("hidden");
}
