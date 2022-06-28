//selector
const wrapper=document.querySelector('.wrapper'),
infoText=document.querySelector('.pending'),
inputPart=document.querySelector('.input-part'),
input=document.querySelector('input'),
locationBtn=document.querySelector('.device-location'),
liveTemp=document.querySelector('.live-temperature'),
liveWeather=document.querySelector('.live-weather'),
searchedLocation=document.querySelector('.location'),
humidityDetails=document.querySelector('.humidity-details'),
feelsLike=document.querySelector('.feels-like-details')


//eventListener
input.addEventListener('keyup',(e)=>{
    if(e.key=='Enter' && input.value!=''){
        let city=input.value
        apiCall(city)
        input.value=''
    }
    return;
})


locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess,onError)
    }else{
        alert("your browser doesn\'t support geolocation" );
    }
})

//function
function apiCall(cityName){
    let apiKey='fe12a7a9466fa646a7d963c0f1b569d7';
    infoText.classList.add('active')
    let api=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
    fetch(api).then(response=>response.json()).then(data=>weatherDetails(data));
}

function onError(error){
    infoText.classList.remove('pending');
    infoText.classList.add('error')
    infoText.innerText=error
    infoText.classList.add('active')
}

function onSuccess(result){
    const {latitude,longitude}=result.coords;
    let apiKey='fe12a7a9466fa646a7d963c0f1b569d7';
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    fetch(api).then(response=>response.json()).then(data=>weatherDetails(data));
}

function weatherDetails(data){
    console.log(data)
    const {description}=data.weather
    const {feels_like,humidity,temp}=data.main
    liveWeather.innerText=description
    liveTemp.innerHTML=`${Math.round(toCelcius(temp))}&#8451;`
    feelsLike.innerHTML=`${Math.round(toCelcius(feels_like))}&#8451;`
    humidityDetails.innerText=humidity+'%'
    infoText.classList.add('inactive')
    infoText.classList.remove('active')

}

function toCelcius(kelvins){
    return kelvins-273.15 
}