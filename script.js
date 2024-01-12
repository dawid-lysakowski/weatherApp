window.onload = function() {

    async function getCurrentWeather(city) {
        const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                let temp = data.main.temp;
                let feel = data.main.feels_like;
                let icon = data.weather[0].icon;
                let des = data.weather[0].description;
                let time = data.dt
                return [time, city, temp, feel, icon, des];
            });
    }

    function getFiveDayForecast(city) {
        const fiveDay = [];
        const apiKey = '7ded80d91f2b280ec979100cc8bbba94';
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`;

        return fetch(url)
            .then(response => response.json())
            .then(data => {
                data.list.forEach(item => {
                    fiveDay.push([item.dt, city, item.main.temp, item.main.feels_like, item.weather[0].icon, item.weather[0].description]);
                });
                return fiveDay;
            })
        }

    function drawBlock(time, city, temp, feel, icon, des) {
        const date = new Date(time * 1000);
        const datetime = `${date.toLocaleDateString('pl-PL')} ${date.toLocaleTimeString('pl-PL')}`;
        const iconImg = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="${des}">`;
        return `<div class="block"><div>${datetime}<br>${city}<br>Temp: ${temp}<br>Feel: ${feel}<br>${des} </div>${iconImg}</div>`;
    }
    
    document.querySelector('#check').addEventListener('click', function() {

        const result = document.querySelector('#result');
        const city = document.querySelector('#city').value;
        getCurrentWeather(city)
            .then(weatherInfo => {
                result.innerHTML = drawBlock(...weatherInfo);
            })
            .catch(() => {
                result.innerHTML = 'Wrong input!';
            });

        getFiveDayForecast(city)
            .then(weatherInfo => {
                weatherInfo.forEach(item => {
                    result.innerHTML += drawBlock(...item);
                });
            });
    });
}