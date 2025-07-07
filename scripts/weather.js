const key = ''; //INSERT YOUR WEATHERAPI KEY HERE


const getWeather = async (city) => {
    const base = 'http://api.weatherapi.com/v1/'; //weatherapi.com thank you for free api
    const query = `current.json?key=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();

    console.log(data); 
    return data;
};