//selector
const wrapper=document.querySelector('.wrapper'),
infoText=document.querySelector('.pending'),
inputPart=document.querySelector('.input-part'),
weatherPart=document.querySelector('.weather-part')
input=document.querySelector('input'),
locationBtn=document.querySelector('.device-location'),
liveTemp=document.querySelector('.live-temperature'),
liveWeather=document.querySelector('.live-weather'),
searchedLocation=document.querySelector('.location'),
humidityDetails=document.querySelector('.humidity-details'),
feelsLike=document.querySelector('.feels-like-details')
home=document.querySelector('.home'),
weatherIcon=document.querySelector('.weather-icon')


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

home.addEventListener('click',()=>{
    toggleHome()
    mainToggle()
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
    const {country}=data.sys
    const {description}=data.weather[0]
    const {feels_like,humidity,temp}=data.main
    liveWeather.innerText=description
    liveTemp.innerHTML=`${Math.round(toCelcius(temp))}&#8451;`
    feelsLike.innerHTML=`${Math.round(toCelcius(feels_like))}&#8451;`
    humidityDetails.innerText=humidity+'%'
    infoText.classList.add('inactive')
    infoText.classList.remove('active')
    searchedLocation.innerText=data.name +", "+ country
    

    //change weather icon
    var iconcode = data.weather[0].icon;
    var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    weatherIcon.src=iconurl



    //show main content 
    toggleHome()
    mainToggle()

}

function mainToggle(){
    inputPart.classList.toggle('inactive')
    weatherPart.classList.toggle('inactive')
}

function toggleHome(){
    home.classList.toggle('fa-arrow-left')
}

function toCelcius(kelvins){
    return kelvins-273.15 
}