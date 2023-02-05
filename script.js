const form = document.querySelector('.top-banner form');
const input = document.querySelector('.top-banner input');
const msg = document.querySelector('.top-banner .msg');
const list = document.querySelector('.api-section .cities');

const apiKey = '57f0fcc360ec79e84b20740b83d63117';

const weatherApp = async (url) => {
  try {
    const response = await fetch(url);
    const WEATHER_DATA = await response.json();

    const {
      main, name, sys, weather,
    } = WEATHER_DATA;

    const icon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const li = document.createElement('li');
    li.classList.add('city');

    const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${((Math.round(main.temp) * (9 / 5)) + 32)}<sup>°F</sup></div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0].main}>
            <figcaption>${weather[0].description}</figcaption>
        </figure> 
    `;

    li.innerHTML = markup;
    list.appendChild(li);
  } catch (error) {
    msg.textContent = 'Please search for a valid city 😩';
  }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const listItems = list.querySelectorAll('.api-section .city');
  let inputVal = input.value;
  const listItemsArray = Array.from(listItems);
  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter((el) => {
      let content = '';
      if (inputVal.includes(',')) {
        if (inputVal.split(',')[1].length > 2) {
          // eslint-disable-next-line prefer-destructuring
          inputVal = inputVal.split(',')[0];
          content = el.querySelector('.city-name span').textContent.toLowerCase();
        } else {
          content = el.querySelector('.city-name').dataset.name.toLowerCase();
        }
      } else {
        content = el.querySelector('.city-name span').textContent.toLowerCase();
      }
      return content === inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector('.city-name span').textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  weatherApp(url);

  msg.textContent = '';
  form.reset();
  input.focus();
});
