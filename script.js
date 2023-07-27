let weather = {
    apiKey: "e94ae80ed519af45f35ccbcf752dfacd",
    fetchWeather: function (city, units) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units="
            + units +
            "&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data, units));
    },
    displayWeather: function(data, units) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + (units === "imperial" ? "°F" : "°C"); 
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + (units === "imperial" ? " mph" : " m/s");
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')";
    },
    search: function (units) {
        const city = (document.querySelector(".search-bar").value);
        this.fetchWeather(city, units);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
        weather.search("imperial");
    });

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search("imperial");
    }
});

function imperial () {
    weather.search("imperial");   
}

function metric () {
    weather.search("metric");
}

document.getElementById("imperial").addEventListener("click" , imperial);
document.getElementById("metric").addEventListener("click" , metric);