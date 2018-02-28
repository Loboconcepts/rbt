console.log("loaded!")
    var bored = 0;
		var happiness = 0;
		var blueColor = 125 + happiness;
		var redColor = 125 - happiness;
		var whatDidIJustDo = "Nothing";
		var color = "rgb(" + redColor + ", 0, " + blueColor + ")";
		var command;
		// 0=greeting, 1=curse
		var learnArray = [0,0];
		var knownArray = ["",""];
		document.getElementById("window").style.width = (window.innerWidth - 20) + "px";
		document.getElementById("window").style.height = (window.innerHeight - 50) + "px";
		document.querySelector("#pet").style.backgroundColor = color;

		// talk function
		function speak(sayWhat) {
			document.querySelector("#pet").dataset.txt = sayWhat;
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
			if (petPositionLeft >= window.innerWidth - 90) {
				document.querySelector("#pet").classList.add("speak-left");
				function removeWord() {document.querySelector('#pet').classList.remove("speak-left");}
				setTimeout(removeWord, ((sayWhat.length * 100) + 800));
			}
			else {
				document.querySelector("#pet").classList.add("speak-right");
				function removeWord() {document.querySelector('#pet').classList.remove("speak-right");}
				setTimeout(removeWord, ((sayWhat.length * 100) + 800));
			}
		}

		// resize the field
		function resizeField() {
			document.getElementById("window").style.width = (window.innerWidth - 20) + "px";
			document.getElementById("window").style.height = (window.innerHeight - 50) + "px";
		}
		function generateCoordinates(ev) {
			clearInterval(thinkNow);
			var x = event.clientX;
    		var y = event.clientY;
    		dropFood(x, y);
    		bored = 0;
    		thinkNow = window.setInterval(ifFoodExists, 24);
		}

		function ifFoodExists() {
			if (document.querySelector(".food")) {
				bored = 0;
				thinkAboutEating();
			}
			else {
				clearInterval(thinkNow);
				thinkNow = window.setInterval(generalState, 5000);
			}
		}

		function dropFood(xCor, yCor) {
			if (!document.querySelectorAll(".food").item(3)) {
				var newFood = document.createElement("div");
				newFood.setAttribute("class","food");
				newFood.style.left = xCor + "px";
				newFood.style.top = yCor + "px";
				var currentDiv = document.getElementById("anchor");
		  		document.getElementById("window").insertBefore(newFood, currentDiv);
		  		whichFoodIsCloser();
			}
		}
		
		function whichFoodIsCloser() {
			var i = 0;
			while (i < document.querySelectorAll(".food").length ) {
				var topItemLeft = parseInt((document.querySelectorAll(".food").item(i).style.left).replace("px",""),10);
				var newestItemLeft = parseInt((document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1).style.left).replace("px",""),10);
				var topItemTop = parseInt((document.querySelectorAll(".food").item(i).style.top).replace("px",""),10);
				var newestItemTop = parseInt((document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1).style.top).replace("px",""),10);
				var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
				var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px",""),10);
				if ((Math.abs(petPositionLeft - newestItemLeft)) + (Math.abs(petPositionTop - newestItemTop)) < (Math.abs(petPositionLeft - topItemLeft)) + (Math.abs(petPositionTop - topItemTop))) {
					document.getElementById("window").insertBefore(document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1), document.querySelectorAll(".food").item(i));
					break;
				}
				else {
					i++;
				}
			}
		}
		
		function thinkAboutEating() {
			var foodPositionLeft = parseInt((document.querySelector(".food").style.left).replace("px",""),10);
			var foodPositionTop = parseInt((document.querySelector(".food").style.top).replace("px",""),10);
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
			var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px",""),10);
			var distanceToFoodLeft = foodPositionLeft - petPositionLeft;
			var distanceToFoodTop = foodPositionTop - petPositionTop;
			if ((distanceToFoodLeft <= parseInt((document.querySelector("#pet").style.width).replace("px",""),10) && distanceToFoodLeft > -6) && (distanceToFoodTop <= parseInt((document.querySelector("#pet").style.height).replace("px",""),10) && distanceToFoodTop > -6))  {
				document.querySelector(".food").remove();
				speak("yum!");
				// grow(1);
				// changeColor(200000);
				whatDidIJustDo = "Eat";
				happyAdjust(1);
				ifFoodExists();
			}
			else {
				if (petPositionLeft < foodPositionLeft) {
					petPositionLeft = petPositionLeft + 1;
					document.querySelector("#pet").style.left = petPositionLeft + "px";
				}
				if (petPositionTop < foodPositionTop) {
					petPositionTop = petPositionTop + 1;
					document.querySelector("#pet").style.top = petPositionTop + "px";
				}
				if (petPositionLeft > foodPositionLeft) {
					petPositionLeft = petPositionLeft - 1;
					document.querySelector("#pet").style.left = petPositionLeft + "px";
				}
				if (petPositionTop > foodPositionTop) {
					petPositionTop = petPositionTop - 1;
					document.querySelector("#pet").style.top = petPositionTop + "px";
				}
			}
		}
		var dir = Math.floor(Math.random()*4);
		
		function grow(howMuch) {
		  var petWidth = parseInt((document.querySelector("#pet").style.width).replace("px",""),10);
		  var petHeight = parseInt((document.querySelector("#pet").style.height).replace("px",""),10);
		  document.querySelector("#pet").style.width = (petWidth + howMuch) + "px";
		  document.querySelector("#pet").style.height = (petHeight + howMuch) + "px";
		}
		
		function changeColor(howMuch) {
		  color = "#" + ((parseInt((color).replace("#",""),16) + howMuch).toString(16));
		  document.querySelector("#pet").style.backgroundColor = color;
		}

		function generalState() {
			bored = bored + 10
			if (bored == 20) {
				var rand = Math.floor(Math.random()*2);
				if(rand == 1) {
					speak("RAWR");
					whatDidIJustDo = "Rawr";
				}
			}
			if (bored >= 40) {
				var rand = Math.floor(Math.random()*4);
				if(rand == 1) {
					happyAdjust(-1)
				}
				dir = Math.floor(Math.random()*4);
				clearInterval(thinkNow);
				thinkNow = window.setInterval(moveAroundRandomlyOutOfBoredom, 24);
			}
			console.log("The last thing I did was: " + whatDidIJustDo);
		}

		function petted() {
			speak("◠‿◠");
			happyAdjust(1);
			bored = 0
		}

		function moveAroundRandomlyOutOfBoredom () {
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
			var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px",""),10);
			if (bored >= 11) {
				if (dir == 0) {
					if (petPositionTop > 30) {mvUp();}
					else {dir = 2;}
				}
				if (dir == 1) {
					if (petPositionLeft < window.innerWidth - 30) {mvRight();}
					else {dir = 3;}
				}
				if (dir == 2) {
					if (petPositionTop < window.innerHeight - 70) {mvDown();}
					else {dir = 0;}
				}
				if (dir == 3) {
					if (petPositionLeft > 30) {mvLeft();}
					else {dir = 1;}
				}
				bored = bored - 1;
			}
			else {
				clearInterval(thinkNow);
				thinkNow = window.setInterval(generalState, 5000);
			}
		}

		// directional
		function mvUp() {
			var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px",""),10);
			if (petPositionTop > 30) {
				petPositionTop = petPositionTop - 1;
				document.querySelector("#pet").style.top = petPositionTop + "px";
				whatDidIJustDo = "Move Up";
			}
		}
		function mvRight() {
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
			if (petPositionLeft < window.innerWidth - 30) {
				petPositionLeft = petPositionLeft + 1;
				document.querySelector("#pet").style.left = petPositionLeft + "px";
				whatDidIJustDo = "Move Right";
			}
		}
		function mvDown() {
			var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px",""),10);
			if (petPositionTop < window.innerHeight - 70) {
				petPositionTop = petPositionTop + 1;
				document.querySelector("#pet").style.top = petPositionTop + "px";
				whatDidIJustDo = "Move Down";
			}
		}
		function mvLeft() {
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px",""),10);
			if (petPositionLeft > 30) {
				petPositionLeft = petPositionLeft - 1;
				document.querySelector("#pet").style.left = petPositionLeft + "px";
				whatDidIJustDo = "Move Left";
			}
		}

		// conversation
		clickButtonToTalk = function() {
			bored = 0;
			command = " " + document.querySelector("#speech-box").value.toLowerCase() + " ";
			document.querySelector("#speech-box").value = "";
			switch (true) {
				case / fuck | shit | bitch | cunt | ass | asshole | damnit | dammit /.test(command):
					speak(">_<");
					happyAdjust(-1);
					break;
				case / sup | how are you | whats up /.test(command):
					if (happiness > 0) {
						speak("•◡•");
					}
					if (happiness == 0) {
						speak("•_•");
					}
					if (happiness < 0) {
						speak(">_<");
					}
					break;
				case / hi | hello | howdy | yo | hey /.test(command):
					learnArray[0] = learnArray[0] + 1;
					if (learnArray[0] == 4) {
						knownArray[0] = command;
						speak(knownArray[0]);
					}
					else if (knownArray[0] != "") {
						speak(knownArray[0]);
					}
					else {
						speak("!");
						console.log(learnArray[0]);
					}
					break;
				default:
					speak("?");
			}
		}

		function happyAdjust(val) {
			happiness = happiness + val;
			blueColor = 125 + happiness;
			redColor = 125 - happiness;
			color = "rgb(" + redColor + ", 0, " + blueColor + ")";
			document.querySelector("#pet").style.backgroundColor = color;
		} 

		document.querySelector("#speech-box").addEventListener("keyup", function(ev) {
	      ev.preventDefault();
	      if (ev.keyCode === 13) {
	        document.querySelector("#speech-button").click();
	      }
	    });

	    // Prevent scrolling
	    document.body.addEventListener("touchmove", function(event) {
		    event.preventDefault();
		    event.stopPropagation();
		}, false);


		document.getElementById("window").onclick = generateCoordinates;
		document.querySelector("#pet").onclick = petted;

		// Thinking twice a second
		var thinkNow = window.setInterval(generalState, 5000);
