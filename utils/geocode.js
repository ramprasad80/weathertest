const request = require('postman-request');

const geocode = (address,callback)=>{
	//calling url string
	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmFtcHJhc2FkODAiLCJhIjoiY2tpYTE0eWJ4MDU1dDMwcGN2OWNnenNjbSJ9.x-BkSXTyxIIwjb1smgzIuw';

	request.get({url,json:true}, (err,data)=>{

		if(err){
			callback('Network Connection is not available for this service',undefined);
		}else if(!data.body.features.length){
			callback('Required parameters are missing',undefined);
		}else{
			let rdata = {
				longitude:data.body.features[0].center[0],
				latitude:data.body.features[0].center[1],
				location:data.body.features[0].place_name
			}
			callback(undefined,rdata);
		}
	})
}

module.exports = geocode;