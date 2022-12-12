
function replaceVal(orgVal) {
    $('#curr-temp span').html(` ${(orgVal.main.temp-273.15).toFixed(2)} &deg;`);
    $('#max-min').html(`Min ${(orgVal.main.temp_min-273.15).toFixed(2)} &deg; 
                    | Max ${(orgVal.main.temp_max-273.15).toFixed(2)} &deg;`);
    $('#address span').html( `${orgVal.name},${orgVal.sys.country}`) ;
    $('#box p').eq(0).html(`Sunrise: ${unixtogmt(orgVal.sys.sunrise)}`);
    $('#box p').eq(1).html(`Sunset: ${unixtogmt(orgVal.sys.sunset)}`);
    $('#box p').eq(2).html(`Feels like: ${(orgVal.main.temp-273.15).toFixed(2)}&deg;`);
    $('#box p').eq(3).html(`Humidity: ${orgVal.main.humidity}%`);
    $('#box p').eq(4).html(`Wind speed: ${orgVal.wind.speed}mi/h`);
    $('#box p').eq(5).html(`Wind direction: ${winddirection(orgVal.wind.deg)}`);
    $('#box p').eq(6).html(`Visibility: ${(orgVal.visibility)/1000}km`);
}
// 26.142104779468674 85.36941569139391
function value() {
    let a,b;
    navigator.geolocation.getCurrentPosition((position) => {
        a = position.coords.latitude;
        b = position.coords.longitude;
        console.log(a,b)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&appid=a73fe230f18b345162c8deb0d876205d`,)
    .then((response) =>{
        return response.json();
    })
    .then((data) => {
        replaceVal(data);
    })
    .catch((error) =>{
        document.write('cannot fetch')
        console.log(error)
    })
    })

}

function unixtogmt(unixTimestamp) {

        // convert to milliseconds
        // and then create a new Date object
        let dateObj = new Date(unixTimestamp * 1000);

        // Get hours from the timestamp
        let hours = dateObj.getHours();

        // Get minutes part from the timestamp
        let minutes = dateObj.getMinutes();

        // Get seconds part from the timestamp
        let seconds = dateObj.getSeconds();

        var mid_day;
        if(hours>=12) {
            hours-=12;
            mid_day = 'PM';
        }
        else 
            mid_day = 'AM';

        let formattedTime = hours.toString().padStart(2, '0') + ':' +
            minutes.toString().padStart(2, '0') +' '+ mid_day;

        return formattedTime
}

function winddirection(deg) {
    if(deg<25 && deg>335) {
        return 'N'
    } else if(deg>25 && deg<65) {
        return 'NE'
    } else if(deg>65 && deg<105) {
        return 'E'
    } else if(deg>105 && deg<155) {
        return 'SE'
    } else if(deg>155 && deg<205) {
        return 'S'
    } else if(deg>205 && deg<245) {
        return 'SW'
    } else if(deg>245 && deg<290) {
        return 'W'
    } else if(deg>290 && deg<335) {
        return 'NE'
    }
}

value();


