const request = require('postman-request');

module.exports = (long,lat,callback)=>{
	const url = 'http://api.weatherstack.com/current?access_key=fe512544af0a9047b5d406259b1dee12&query='+lat+','+long;

	request({url,json:true},(err,res)=>{
		console.log(res.body.current);
		const {weather_descriptions,temperature} = res.body.current;
		if(err){
			callback('Please check network connection!!',undefined);
		} else if(res.body.error){
			callback(res.body.error.info,undefined)
		} else{
			callback(undefined,{weather_descriptions,temperature})
		}
	})	
}