const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forcast = require('../utils/forcast');

const app = express();
const publicPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Register partials with hbs
hbs.registerPartials(partialsPath);

//Setup handlebars and other settings
//set view engine for express
app.set('view engine','hbs');
//view forlder path
app.set('views',viewPath);
//Setup Static Directory for the express engine
app.use(express.static(publicPath));
//define a rout

//check dynamin page load from views
app.get('',( req, res) =>{
	res.render('index',{ title:'Weather App','author':'Ram prasad'});
})
//get dynamic page for about
app.get('/about', ( req, res) => {
	res.render('about',{title:'Weather App:: About', author:'Ram Prasad'})
})
app.get('/help', (req,res) => {
	res.render('help',{title:'Weather App:Help',helptxt:'Its help page',author:'Ram Prasad'});
})

//weather page
app.get('/weather', (req,res) =>{
	const {address} = req.query;
	console.log(address);
	if(!address){
		return res.send({error:"Your address is required to get weather forcast."});
	}

	geocode(address,( err,data)=>{
		if( err){
			return res.send({error:err});
		} else{
			forcast(data.longitude,data.latitude,( err,forcst) =>{
				console.log("for cast"+forcst);
				if( err){return res.send({error:err});}
				 else {res.send({
						location:data.location,
						forcast:forcst,
						address:address
					})
				}
			})		
		} 
	})


	
})
app.get( '/help/*', (req, res) => {
	res.render('page404',{title:'404:Help',pageerror:'The specific help article not found',author:'Ram Prasad'})
})
//404 page routing
app.get('*', (req,res) => {
	res.render('page404',{title:'404',pageerror:'The specific page does not found',author:'Ram Prasad'})
})
//lesten on a specific port

app.listen(3000, () => {
	console.log('The server is up and running on port 3000.');
});