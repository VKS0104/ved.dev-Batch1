const input = document.getElementsByClassName("Search-Bar")[0];
const btn = document.getElementsByClassName("btn")[0];

const city = document.querySelector("#city");
const temp = document.querySelector("#temp");

const time = document.querySelector("#time");

const date = document.querySelector("#date");

const weatherCondition = document.querySelector("#weather-condition");

const day = document.querySelector("#day");

const iconWrap = document.querySelector(".icon-wrap");

btn.addEventListener("click", function () {
    const location = input.value.trim();
    console.log(location);

    function getDayFromEpoch(epoch) {
        // if epoch is in seconds, convert to milliseconds
        if (epoch.toString().length === 10) {
            epoch = epoch * 1000;
        }

        const date = new Date(epoch);

        const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        return days[date.getDay()];
    }


    //call the API
    fetch(`https://api.weatherapi.com/v1/current.json?key=24f082d06eab418895c42819262301&q=${location}&aqi=no`)
        .then(response => response.json())
        .then(data => {
            // Check if API returned an error
            if (data.error) {
                showError();
                return;
            }

            // Hide error notification if it was showing
            hideError();

            console.log(data);
            city.innerText = `${data.location.name}`;
            temp.innerText = `${data.current.temp_c}°C`;
            const arr = data.location.localtime.split(" ");
            time.innerText = `${arr[1]}`;
            date.innerText = `${arr[0]}`
            weatherCondition.innerText = `${data.current.condition.text}`;

            // Replace SVG with API weather icon
            iconWrap.innerHTML = `<img src="https:${data.current.condition.icon}" alt="weather icon" class="weather-icon" />`;

            day.innerText = getDayFromEpoch(data.location.localtime_epoch);
        })
        .catch(error => {
            console.error(error);
            showError();
        });
    input.value = "";
});

// Error handling functions
function showError() {
    const errorNotification = document.getElementById('error-notification');
    errorNotification.classList.remove('hidden');
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    const errorNotification = document.getElementById('error-notification');
    errorNotification.classList.add('hidden');
}