const input = document.getElementsByClassName("Search-Bar")[0];
const btn = document.getElementsByClassName("btn")[0];

btn.addEventListener("click", function () {
    const location = input.value.trim();
    console.log(location);

    input.value = "";
    //call the API
    fetch("https://api.weatherapi.com/v1/current.json?key=24f082d06eab418895c42819262301&q=pune&aqi=no")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

});
