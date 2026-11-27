window.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'd77e8a80bfcc7551c3135a39d716ce92';

    const weatherElement = document.getElementById('weather');
    const iconw = document.getElementById('img');
    const cit = document.getElementById('city');

    const input = document.getElementById('cityInput');
    const button = document.getElementById('searchBtn');

    function getWeather() {
        const city = input.value.trim();

        if (!city) {
            alert('Введите название города!');
            return;
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ru`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Город не найден!');
                }
                return response.json();
            })
            .then(data => {
                const temperature = data.main.temp;
                const description = data.weather[0].description;

                cit.innerText = data.name + ' Страна: ' + data.sys.country;

                iconw.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

                weatherElement.innerHTML = `
                    Текущая температура: ${temperature}°C
                    <br>
                    Описание: ${description}
                `;
            })
            .catch(error => {
                weatherElement.innerHTML = error.message;
                cit.innerText = '';
                iconw.src = '';
            });
    }

    button.addEventListener('click', getWeather);

    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
});