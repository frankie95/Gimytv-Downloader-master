var express = require('express'),
bodyParser = require('body-parser'),
handlebars = require('express-handlebars').create({
	defaultLayout: __dirname + '/views/layouts/main',
	helpers: {
		section: function(name, options){
			if(!this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
}),
getLinks = require('./lib/getLinks');
var m3u8ToMp4 = require("m3u8-to-mp4");
 
async function download(link,name) {
	await  new m3u8ToMp4()
	  .setInputFile(link)
	  .setOutputFile(name+".mp4")
	  .start();
	console.log(name+"converted");
  };
  

function main(){


	 var app = express();
	 app.set('port', process.env.PORT || 5000);
	 app.set('views', __dirname + "/views");
	 app.engine('handlebars', handlebars.engine);
	 app.set('view engine', 'handlebars');

	 app.use(express.static(__dirname + "/public"));
	 app.use(bodyParser.urlencoded({extended: true}));
	 app.use(bodyParser.json());

	 app.get("/", (req, res) => {
	 	res.render("index");
	 });

	 app.get("/getvideolink/:link/:name", (req, res) => {
		var link = req.params.link;
		var name=unescape(req.params.name)
		 console.log(link)
		 console.log(name)
		 download(link,name)
	 	//getLinks.getLinks(link);
	 	//getLinks.once('done', (urls) => {
	 		
		 //});
		 
		 res.json({state:"downloading"})
	 });

	 app.listen(app.get('port'), () => {
	 	console.log("------------------------------------");
	 	console.log("Server running on port " + app.get('port'));
	 	console.log("------------------------------------");
	 });	
}

module.exports = main;