const list = document.querySelector('api-section .cities')
const weatherApp = async () => {
    const response = await fetch(API_URL);
    const WEATHER_DATA = await response.json();

    const {main, name, sys, weather} = WEATHER_DATA;

    const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;  

    const li = document.createElement('li');
    li.classList.add('city');

    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${(Math.round(main.temp) * 9/5 + 32)}<sup>°F</sup></div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure> 
    `;

    list.innerHTML = markup;
    list.appendChild(li);

}