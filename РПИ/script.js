async function bg() {
    const url = `https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=wallpapers&client_id=Gd3WjQFyiLYWcpTQ256yiVIs5R2wzsBgQxHrxz3y0pc`;
    const res = await fetch(url);
    const data = await res.json();
    document.body.style.backgroundImage = "url(" + data.urls.regular + ")";
}
var city = '';
if (localStorage.getItem('city')!=null){
    city = localStorage.getItem('city');
}
async function posi() {
    if (city == ''){
    let url = `https://ipinfo.io/46.56.246.94/json?token=e18ec6f533b0cd`;
    let res = await fetch(url);
    let data = await res.json();
    city = data.city;
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${l[lan]}&units=${grad[cf]}&APPID=714a0fde1333d13a6e2ec3fc37ade244`;
    res = await fetch(url);
    data = await res.json();
    city = data.city.name;
    localStorage.setItem('city',city);
    getCoord();
    document.getElementsByClassName('city')[0].textContent = city.toUpperCase();
    } else {
        document.getElementsByClassName('city')[0].textContent = city.toUpperCase();
        getCoord();
    }
    weather();
}
async function swichLang(){
    if (lan==0) {
        localStorage.setItem('lan',1);
    } else {
        localStorage.setItem('lan',0);
    }
    lan = (lan+1)%2;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${l[lan]}&units=${grad[cf]}&APPID=714a0fde1333d13a6e2ec3fc37ade244`;
    const res = await fetch(url);
    const data = await res.json();
    city = data.city.name;
    localStorage.setItem('city','');
    location.reload();
}
var lat = 0;
var lng = 0;
async function getCoord(){
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=c6b6da0f80f24b299e08ee1075f81aa5&pretty=1&no_annotations=1`;
    const res = await fetch(url);
    const data = await res.json();
    lat = data.results[0].geometry.lat;
    lng = data.results[0].geometry.lng;
    
    var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11', 
            center:  [lng, lat],
            zoom: 16 
        });
    document.getElementById("lat").textContent = lata[lan]+': '+lat;
    document.getElementById("lng").textContent = long[lan]+': '+lng;
}
var lan = 0;
if (localStorage.getItem('lan')!=null){
   lan = localStorage.getItem('lan');
}
function smenGrad(e){
    if(e==1){
       cf = 1; 
        document.getElementsByClassName('wb')[2].classList.add('on');
        document.getElementsByClassName('wb')[3].classList.remove('on');
        document.getElementsByClassName('wb')[2].classList.remove('off');
        document.getElementsByClassName('wb')[3].classList.add('off');
        localStorage.setItem('cf',1);
    } else {
       cf = 0; 
        document.getElementsByClassName('wb')[2].classList.add('off');
        document.getElementsByClassName('wb')[3].classList.remove('off');
        document.getElementsByClassName('wb')[2].classList.remove('on');
        document.getElementsByClassName('wb')[3].classList.add('on');
        localStorage.setItem('cf',0);
    }
    weather();
}
var l = ['en', 'ru'];
var lata = ['Latitude','Широта'];
var long = ['Longitude','Долгота'];
var poiskText = ['Search city','Поиск города'];
var poisk = ['SEARCH','ПОИСК'];
document.getElementsByTagName('input')[0].placeholder = poiskText[lan];
document.getElementsByTagName('input')[1].value = poisk[lan];
var cf = 0;
if (localStorage.getItem('cf')!=null){
   cf = localStorage.getItem('cf');
}
if(cf==1){
        document.getElementsByClassName('wb')[2].classList.add('on');
        document.getElementsByClassName('wb')[3].classList.remove('on');
        document.getElementsByClassName('wb')[2].classList.remove('off');
        document.getElementsByClassName('wb')[3].classList.add('off');
    }
document.getElementById('lang').value = l[lan];
var feels_like = ['FEELS LIKE','ПО ОЩУЩЕНИЯМ'];
var veter = ['WIND','ВЕТЕР'];
var grad = ['metric','imperial'];
var humidity = ['HUMIDITY','ВЛАЖНОСТЬ'];
async function weather() {
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=${l[lan]}&units=${grad[cf]}&APPID=714a0fde1333d13a6e2ec3fc37ade244`;
    let res = await fetch(url);
    let data = await res.json();
    document.getElementsByClassName('tmp')[0].textContent =  Math.round(data.list[0].main.temp)+'°';
    document.getElementsByClassName('desk')[0].textContent = data.list[0].weather[0].description.toUpperCase();
    document.getElementsByClassName('like')[0].textContent = feels_like[lan]+': ' + Math.round(data.list[0].main.feels_like) + '°';
    document.getElementsByClassName('wind')[0].textContent = veter[lan]+': ' + Math.round(data.list[0].wind.speed) + ' m/s';
    document.getElementsByClassName('humi')[0].textContent = humidity[lan]+': ' + data.list[0].main.humidity + '%';
    url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=en&units=${grad[cf]}&APPID=714a0fde1333d13a6e2ec3fc37ade244`;
    res = await fetch(url);
    data = await res.json();
    let name = data.list[0].weather[0].main.toLowerCase();
    const b = {
        "rain":"rain",
        "clouds":"cloudy",
        "clear":"clear"
    }
    name = b[name];
    document.getElementsByClassName('img')[0].style.backgroundImage = 'url(https://wxeka.mrmarkel.com/pws/css/icons/'+name+'.svg)';
    let ti = 0;
    while (data.list[ti].dt_txt.split(' ')[1] != '00:00:00')
    {
          ti++; 
    }
    ti+=4;
    document.getElementsByClassName('tempDay')[0].textContent = Math.round(data.list[ti].main.temp) + '°';
    name = data.list[ti].weather[0].main.toLowerCase();
    name = b[name];
    document.getElementsByClassName('imgDay')[0].style.backgroundImage = 'url(https://wxeka.mrmarkel.com/pws/css/icons/'+name+'.svg)';
    ti+=8;
    document.getElementsByClassName('tempDay')[1].textContent = Math.round(data.list[ti].main.temp) + '°';
    name = data.list[ti].weather[0].main.toLowerCase();
    name = b[name];
    document.getElementsByClassName('imgDay')[1].style.backgroundImage = 'url(https://wxeka.mrmarkel.com/pws/css/icons/'+name+'.svg)';
    ti+=8;
    document.getElementsByClassName('tempDay')[2].textContent = Math.round(data.list[ti].main.temp) + '°';
    name = data.list[ti].weather[0].main.toLowerCase();
    name = b[name];
    document.getElementsByClassName('imgDay')[2].style.backgroundImage = 'url(https://wxeka.mrmarkel.com/pws/css/icons/'+name+'.svg)';
}
async function setCity(){
    if (document.getElementsByTagName('input')[0].value == ''){
        alert('Пустая строка');
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${document.getElementsByTagName('input')[0].value}&lang=${l[lan]}&units=${grad[cf]}&APPID=714a0fde1333d13a6e2ec3fc37ade244`;
    const res = await fetch(url);
    const data = await res.json();
    if(res.ok){
        city = data.city.name;
        localStorage.setItem('city',city);
        getCoord();
        posi();
    }else{
        alert('Такой город не найден');
    }
}
bg();
posi();
var namesDay = [['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']];
var nameDay = [['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']];
var monthName = [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']];


function addZero(n) {
    return (n < 10 ? '0' : '') + n;
}

function showTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        day = today.getDate(),
        week = today.getDay(),
        month = today.getMonth(),
        sec = today.getSeconds();
    document.getElementsByClassName('day')[0].textContent = `${nameDay[lan][week]} ${day} ${monthName[lan][month]} ${addZero(hour)}:${addZero(min)}:${addZero(sec)}`;
    document.getElementsByClassName('nameDay')[0].textContent = namesDay[lan][(week+1)%7].toUpperCase();
    document.getElementsByClassName('nameDay')[1].textContent = namesDay[lan][(week+2)%7].toUpperCase();
    document.getElementsByClassName('nameDay')[2].textContent = namesDay[lan][(week+3)%7].toUpperCase();
    setTimeout(showTime, 1000);
}

mapboxgl.accessToken = 'pk.eyJ1IjoicG92ZWxpdGVsdmxhc3R5IiwiYSI6ImNrcDFld3Y3NTB6OHoydm1yM2QwNGRjMGwifQ.ggKLvVnPZnUBrGDzfVj5GQ';
        
showTime();