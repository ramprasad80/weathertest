console.log('client side js is loaded');

//lets find the weather by address
const form  = document.getElementsByTagName('form');

const search = document.getElementById('search');

const searchResult = document.getElementById('search-result');


form[0].addEventListener('submit',(e) => {
	e.preventDefault();
	searchResult.innerHTML = 'Loading...';
	fetch('http://localhost:3000/weather?address='+encodeURIComponent(search.value)).then( (res) => {
		res.json().then( (data)=>{
			const {location,forcast,error = undefined} = data;
			if(error){ searchResult.innerHTML = error; return;}
			if(location){
				searchResult.innerHTML = 'Location::'+location+'<br/><br/> Forcast::'+'The weather is '+forcast.weather_descriptions[0]+' and Temprature is '+forcast.temperature+' Degree celcious';
			}
			
		})
	})
})

