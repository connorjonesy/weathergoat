const tenorkey = '' //INSERT YOUR TENOR API KEY HERE


const getGif = async (keyword) => {
    const base = 'https://tenor.googleapis.com/v2/search?'; //tenor gif api base url
    const query = `q=${keyword}&key=${tenorkey}&client_key=${'abc'}&limit=50`; //not rlly sure what my client key is but it works

    const response = await fetch(base+query);
    const data = await response.json();

    
    let rand = Math.floor(Math.random() * 50);
    console.log(data.results[rand].media_formats.gif.url); 
    return data.results[rand].media_formats.gif.url;
};








const cityForm = document.querySelector('form');
const card = document.querySelector('.card');

const updateCity = async (city) =>{
    const city_data = await getWeather(city);
    let h5 = document.querySelector('h5');
    h5.innerHTML = city_data.location.name;
    let condition = document.getElementById('cond');
    condition.innerHTML = city_data.current.condition.text;
    let temp = document.getElementById('temp');
    temp.innerHTML = city_data.current.temp_c + `&deg;C`;
    let icon = document.querySelector('.icon');
    icon.innerHTML = `<img src='${city_data.current.condition.icon}' alt="Weather icon">`;
    let weathergif = document.querySelector('.weathergif');
    let tenorgif = await getGif(city_data.current.condition.text);
    weathergif.innerHTML = `<img style="width: 300px; margin: auto; display: block; margin-top: 40px;" src="${tenorgif}">`;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};



cityForm.addEventListener('submit', e => {
    //prevents form from submitting and reloading the page
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset(); // clears out the form

    //update the ui with new city
    updateCity(city)
    .catch(err => window.alert("Weather Goat Says: Baaaaaaa...The Location you entered: "+city+", has not been found. Please try again and double check your spelling..."));
});