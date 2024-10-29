const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
const API_KEY = 'API KEY HERE';
const diffKelvin = 273.15;

// When the Search button is cliked, it will call the fetchWeather function
// and pass the city name as an argument
// If the city name is empty, it will show an alert
document.getElementById('searchButton').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value;
    if(city) {
        fetchWeather(city)
    } else {
        alert("Please enter a city")
    }
})

// Fetches the weather data from the OpenWeatherMap API
// with the city name as a parameter
function fetchWeather(city) {
    fetch(`${baseURL}?q=${city}&appid=${API_KEY}`)
    .then(data => data.json())
    .then(data => showWeatherData(data))
}

function showWeatherData(data) {
    // Div where the info will be displayed
    const divResponseData = document.getElementById('responseData')
    divResponseData.innerHTML = ''

    // Info form the OpenWeatherMap API
    const cityName = data.name
    const countryName = data.sys.country
    const temp = data.main.temp
    const humidity = data.main.humidity
    const description = data.weather[0].description
    const icon = data.weather[0].icon   

    // Create the elements that will be displayed
    const cityInfo = document.createElement('h2')
    cityInfo.textContent = `${cityName}, ${countryName}`

    const tempInfo = document.createElement('p')
    tempInfo.textContent = `Temperature: ${Math.floor(temp - diffKelvin)} °C`

    const humidityInfo = document.createElement('p')
    humidityInfo.textContent = `Humidity: ${humidity}%`

    const icoInfo = document.createElement('img')
    icoInfo.src = `http://openweathermap.org/img/wn/${icon}@2x.png`

    const descriptionInfo = document.createElement('p')
    descriptionInfo.textContent = `Description: ${description}`

    // Append the elements to the div
    divResponseData.appendChild(cityInfo)
    divResponseData.appendChild(tempInfo)
    divResponseData.appendChild(humidityInfo)
    divResponseData.appendChild(icoInfo)
    divResponseData.appendChild(descriptionInfo)
}