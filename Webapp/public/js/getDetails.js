(function(){




	document.getElementsByName("searchVid")[0].addEventListener("submit", function(e){
		e.preventDefault();
		
		document.getElementsByClassName("divDownload")[0].innerHTML = "";
		document.getElementsByClassName("unloaded")[0].className = "unloaded present";
		document.getElementsByClassName("error")[0].className = "error gone";
		startAnimation();

		var link = unescape(this.link.value.split("unescape('")[1].split("')")[0])
		var obj=[]
		link.split("#").forEach(element => {
			var b=element.split("$")
			obj.push({name:b[0],link:b[1]})
		});
		//console.log(unescape(this.link.value.split("unescape('")[1].split("')")[0]))
		//var req = new XMLHttpRequest();
		//req.onreadystatechange = function(){
			
			//if(req.readyState == 4){
				stopAnimation();
				//var obj = JSON.parse(a);
				console.log(obj)
				if(!obj.error){
					//document.getElementsByClassName("image")[0].src = obj.img;
					//document.getElementsByClassName("videoTitle")[0].innerHTML = obj.title;
					//document.getElementsByClassName("noViews")[0].innerHTML = obj.views + " Views";

					obj.forEach(function(item){
						var a = document.createElement("a");
						a.className = "downloadButton";
						a.download = "download";
						a.href = "/getvideolink/"+encodeURIComponent(item.link)+"/"+item.name;
						a.addEventListener("click", function(e){

						e.preventDefault();
						if(this.innerHTML=="downloading")
						return	
						
						
						
						
						self=this;
					
						var req = new XMLHttpRequest();
						req.onreadystatechange = function(){

						if(req.readyState == 4){
						var obj = JSON.parse(req.response);
						self.innerHTML=obj.state
						console.log(obj)

						}



						}

						req.open("get", this.href);
						req.send();	


						})
						a.appendChild(document.createTextNode(item.name))
						document.getElementsByClassName("divDownload")[0].appendChild(a);
					});



					
					document.getElementsByClassName("unloaded")[0].className = "unloaded gone";
					document.getElementsByClassName("error")[0].className = "error gone";
				}

				else {
					document.getElementsByClassName("unloaded")[0].className = "unloaded gone";
					document.getElementsByClassName("error")[0].className = "error present";
					document.getElementsByClassName("errorRight")[0].innerHTML = obj.msg;
				}
			//}
		//}
		//req.open("POST", "/getvideolink");
		//req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		//req.send("link=" + link);

		
	});
})();