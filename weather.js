if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(
            position=> {
          
                let	lat = position.coords.latitude;
                let	lon = position.coords.longitude;
          
            let date = new Date();
            
           // Get the current date and time
          let now = new Date();
    
          // Create a date time format object
          let dateTimeFormat = new Intl.DateTimeFormat();
    
          // Get the time zone information from the date time format object
          let timezone = dateTimeFormat.resolvedOptions().timeZone;
    
		//YOUR GOOGLE API KEY
          let API="AIzaJW1df8ed56zX8Bt20di1o2rnJmvyHtW4z6iVfk";
    
           // console.log(timezone);
            load(lat,lon,timezone);
            cityFromGeocode(lat,lon,API,timezone);
            }
        )
    }
    
    const cityFromGeocode = (lat, lng, API, timezone) => {
      // Make a request to the Google Maps API to get the city for the
      // given latitude and longitude
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // The API returns an array of results, so we need to find the
          // first result that has a "locality" type
          const city = data.results.find(result => result.types.includes('locality'));
          
          // If a city was found, return its name, otherwise return null
          document.getElementById("city_name").innerHTML = city ? city.formatted_address : "";
        
        });
    };
    
    
    const load = (lat,lon,timezone)=>{
      
    fetch("https://api.open-meteo.com/v1/forecast?latitude="+lat+"&longitude="+lon+"&timezone="+timezone+"&current_weather=true&hourly=apparent_temperature,weathercode&daily=apparent_temperature_max,apparent_temperature_min")
    .then(response=> response.json())
    .then(data=> {
    
        //console.log(data);
        
       // console.log(data);
       // let sub = data.hourly.apparent_temperature.reduce((a,b)=>a+b)/data.hourly.apparent_temperature.length;
      // let sub = roundNumbers(data.hourly.apparent_temperature);
      // let res = findMostRepeated(sub); 
       //console.log(res);
    
        document.getElementById("temp_now").innerHTML = Math.floor(data.current_weather.temperature) + "°C";
    
        WeatherType(data.current_weather.weathercode);
    
    }
    
    );
    
    
    }
    
    const WeatherType = (code) =>{
      
     
       var output;
    
    switch (code) {
      case 00:
      output = "Clear sky";
        break;
      case 01:
      case 02:
      case 03:
      output = "Mainly clear, partly cloudy, and overcast";
      break;
          
      case 04:
      case 05:
      case 06:
      case 07:
      case 08:
      case 09:
        output = "Cloud development, visibility, or dust";
        break;
      case 10:
        output = "Mist";
        break;
      case 11:
      case 12:
        output = "Fog or ice fog";
        break;
      case 13:
        output = "Lightning";
        break;
      case 14:
        output = "Precipitation";
        break;
      case 15:
      case 16:
      case 17:
        output = "Precipitation or thunderstorm";
        break;
      case 18:
        output = "Squalls";
        break;
      case 19:
        output = "Funnel cloud";
        break;
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
      case 27:
        output = "Precipitation or fog";
        break;
      case 28:
        output = "Fog or ice fog";
        break;
      case 29:
        output = "Thunderstorm";
        break;
      case 30:
      case 31:
      case 32:
      case 33:
      case 34:
      case 35:
      case 36:
      case 37:
      case 38:
      case 39:
        output = "Duststorm, sandstorm, or drifting snow";
        break;
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      case 47:
      case 48:
      case 49:
        output = "Fog or ice fog";
        break;
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
        output = "Rain or snow";
        break;
      case 60:
      case 61:
      case 62:
      case 63:
      case 64:
      case 65:
      output = "Rain: Slight, moderate and heavy intensity";
        break;
    
      case 66:
      case 67:
      case 68:
      case 69:
        output = "Freezing Rain: Light and heavy intensity";
        break;
      case 70:
      case 71:
      case 72:
      case 73:
      case 74:
      case 75:
      
      case 76:
      case 77:
      case 78:
      case 79:
        output = "Snow fall: Slight, moderate, and heavy intensity";
        break;
      case 80:
      case 81:
      case 82:
      case 83:
      case 84:
      output = "Rain showers: Slight, moderate, and violent";
      break;
    
      case 85:
      case 86:
      case 87:
      case 88:
      case 89:
        output = "Snow showers slight and heavy";
        break;
      case 90:
      case 91:
      case 92:
    case 93:
    case 94:
    case 95:
    output = "Thunderstorm: Slight or moderate";
        break;
    case 96:
    case 97:
    case 98:
    case 99:
      output = "Thunderstorm with slight and heavy hail";
      break;
    default:
      output = "";
    }
    
    document.getElementById("weather_type").innerHTML = output;
    
    }
    
    
    function findMostRepeated(numbers) {
      // create an object to store the number of occurrences of each number
      const occurrences = {};
    
      // loop through the array of numbers and update the occurrences object
      numbers.forEach(function(number) {
        if (occurrences[number]) {
          occurrences[number] += 1;
        } else {
          occurrences[number] = 1;
        }
      });
    
      // create a variable to hold the number with the most occurrences and initialize it to the first number in the array
      let mostRepeated = numbers[0];
    
      // loop through the properties in the occurrences object and update the mostRepeated variable if necessary
      for (let number in occurrences) {
        if (occurrences[number] > occurrences[mostRepeated]) {
          mostRepeated = number;
        }
      }
    
      // return the number with the most occurrences
      return mostRepeated;
    }