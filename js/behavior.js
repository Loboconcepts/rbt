(function () {
	if (document.querySelector("#pet")) {
		return;
	}

	setCookie("browserBuddy", 0, 365);
	
	// START
	var bored = 0;
	var happiness = 0;
	var blueColor = 125 + happiness;
	var redColor = 125 - happiness;
	var whatDidIJustDo = "Nothing";
	var color = "rgb(" + redColor + ", 0, " + blueColor + ")";
	var saveCode = happiness;

	newGame();
	window.addEventListener("resize", resizeField);
	window.addEventListener("scroll", resizeField);

	function newGame() {
		console.log("create window script ran!");
		var createPet = document.createElement("canvas");
		createPet.id = "pet";
		createPet.dataTxt = "hey";
		createPet.style.left = "20px";
		createPet.style.top = "20px";
		createPet.style.position = "absolute";
		createPet.style.width = "50px";
		createPet.style.height = "50px";
		createPet.style.backgroundColor = color;
		document.body.insertBefore(createPet, document.body.firstElementChild);
	}
	// resize the field
	function resizeField() {
		document.body.style.width = (window.innerWidth) + "px";
		document.body.style.height = (window.innerHeight) + "px";
		console.log("resizing!");
	}

	if (document.cookie.search("browserBuddy") != -1) {
		console.log("cookie exists!");
		loadCode();
	}


	function loadCode() {
		happiness = parseInt(getCookie("browserBuddy"), 10);
		console.log(parseInt(getCookie("browserBuddy"), 10));
		blueColor = 125 + happiness;
		redColor = 125 - happiness;
		console.log(happiness + "\n" + blueColor + "\n" + redColor + "\n" + color);
		color = "rgb(" + redColor + ", 0, " + blueColor + ")";
		document.querySelector("#pet").style.backgroundColor = color;
	}

	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}

	function updateSaveCode() {
		saveCode = happiness;
		console.log("updating!");
		setCookie("browserBuddy", saveCode, 365);
	}

	// talk function
	function speak(sayWhat) {
		document.querySelector("#pet").dataset.txt = sayWhat;
		var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
		if (petPositionLeft >= window.innerWidth - 90) {
			document.querySelector("#pet").classList.add("speak-left");
			function removeWord() {
				document.querySelector('#pet').classList.remove("speak-left");
			}
			setTimeout(removeWord, ((sayWhat.length * 100) + 800));
		} else {
			document.querySelector("#pet").classList.add("speak-right");
			function removeWord() {
				document.querySelector('#pet').classList.remove("speak-right");
			}
			setTimeout(removeWord, ((sayWhat.length * 100) + 800));
		}
	}

	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}


	function generateCoordinates(ev) {
		clearInterval(thinkNow);
		var x = event.pageX;
		var y = event.pageY;
		dropFood(x, y);
		bored = 0;
		thinkNow = window.setInterval(ifFoodExists, 24);
	}

	function ifFoodExists() {
		if (document.querySelector(".food")) {
			bored = 0;
			thinkAboutEating();
		} else {
			clearInterval(thinkNow);
			thinkNow = window.setInterval(generalState, 5000);
		}
	}

	function dropFood(xCor, yCor) {
		if (!document.querySelectorAll(".food").item(3)) {
			var newFood = document.createElement("div");
			newFood.setAttribute("class", "food");
			newFood.style.left = xCor + "px";
			newFood.style.top = yCor + "px";
			newFood.addEventListener("mousedown", destroy);
			var currentDiv = document.getElementById("pet");
			document.body.insertBefore(newFood, currentDiv);
			whichFoodIsCloser();
		}
	}

	function whichFoodIsCloser() {
		var i = 0;
		while (i < document.querySelectorAll(".food").length) {
			var topItemLeft = parseInt((document.querySelectorAll(".food").item(i).style.left).replace("px", ""), 10);
			var newestItemLeft = parseInt((document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1).style.left).replace("px", ""), 10);
			var topItemTop = parseInt((document.querySelectorAll(".food").item(i).style.top).replace("px", ""), 10);
			var newestItemTop = parseInt((document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1).style.top).replace("px", ""), 10);
			var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
			var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px", ""), 10);
			if ((Math.abs(petPositionLeft - newestItemLeft)) + (Math.abs(petPositionTop - newestItemTop)) < (Math.abs(petPositionLeft - topItemLeft)) + (Math.abs(petPositionTop - topItemTop))) {
				document.body.insertBefore(document.querySelectorAll(".food").item(document.querySelectorAll(".food").length - 1), document.querySelectorAll(".food").item(i));
				break;
			} else {
				i++;
			}
		}
	}

	function thinkAboutEating() {
		var foodPositionLeft = parseInt((document.querySelector(".food").style.left).replace("px", ""), 10);
		var foodPositionTop = parseInt((document.querySelector(".food").style.top).replace("px", ""), 10);
		var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
		var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px", ""), 10);
		var distanceToFoodLeft = foodPositionLeft - petPositionLeft;
		var distanceToFoodTop = foodPositionTop - petPositionTop;
		if ((distanceToFoodLeft <= parseInt((document.querySelector("#pet").style.width).replace("px", ""), 10) && distanceToFoodLeft > -6) && (distanceToFoodTop <= parseInt((document.querySelector("#pet").style.height).replace("px", ""), 10) && distanceToFoodTop > -6)) {
			document.querySelector(".food").remove();
			speak("yum!");
			// changeColor(200000);
			whatDidIJustDo = "Eat";
			updateSaveCode();
			happyAdjust(1);
			ifFoodExists();
		} else {
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
	var dir = Math.floor(Math.random() * 4);

	function generalState() {
		bored = bored + 10
		if (bored == 20) {
			var rand = Math.floor(Math.random() * 2);
			if (rand == 1) {
				speak("RAWR");
				whatDidIJustDo = "Rawr";
			}
		}
		if (bored >= 40) {
			var rand = Math.floor(Math.random() * 4);
			if (rand == 1) {
				happyAdjust(-1)
			}
			dir = Math.floor(Math.random() * 4);
			clearInterval(thinkNow);
			thinkNow = window.setInterval(moveAroundRandomlyOutOfBoredom, 24);
		}
		updateSaveCode();
		console.log("The last thing I did was: " + whatDidIJustDo);

	}

	function petted() {
		somethingElseWasClicked = true;
		speak("^_^");
		happyAdjust(1);
		bored = 0;
		updateSaveCode();
		setTimeout(function () {
			somethingElseWasClicked = false;
		}, 1000);
	}

	function moveAroundRandomlyOutOfBoredom() {
		var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
		var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px", ""), 10);
		if (bored >= 11) {
			if (dir == 0) {
				if (petPositionTop > 30) {
					mvUp();
				} else {
					dir = 2;
				}
			}
			if (dir == 1) {
				if (petPositionLeft < window.innerWidth - 30) {
					mvRight();
				} else {
					dir = 3;
				}
			}
			if (dir == 2) {
				if (petPositionTop < window.innerHeight - 70) {
					mvDown();
				} else {
					dir = 0;
				}
			}
			if (dir == 3) {
				if (petPositionLeft > 30) {
					mvLeft();
				} else {
					dir = 1;
				}
			}
			bored = bored - 1;
		} else {
			clearInterval(thinkNow);
			thinkNow = window.setInterval(generalState, 5000);
		}
	}

	// directional
	function mvUp() {
		var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px", ""), 10);
		if (petPositionTop > 30) {
			petPositionTop = petPositionTop - 1;
			document.querySelector("#pet").style.top = petPositionTop + "px";
			whatDidIJustDo = "Move Up";
		}
	}

	function mvRight() {
		var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
		if (petPositionLeft < window.innerWidth - 30) {
			petPositionLeft = petPositionLeft + 1;
			document.querySelector("#pet").style.left = petPositionLeft + "px";
			whatDidIJustDo = "Move Right";
		}
	}

	function mvDown() {
		var petPositionTop = parseInt((document.querySelector("#pet").style.top).replace("px", ""), 10);
		if (petPositionTop < window.innerHeight - 70) {
			petPositionTop = petPositionTop + 1;
			document.querySelector("#pet").style.top = petPositionTop + "px";
			whatDidIJustDo = "Move Down";
		}
	}

	function mvLeft() {
		var petPositionLeft = parseInt((document.querySelector("#pet").style.left).replace("px", ""), 10);
		if (petPositionLeft > 30) {
			petPositionLeft = petPositionLeft - 1;
			document.querySelector("#pet").style.left = petPositionLeft + "px";
			whatDidIJustDo = "Move Left";
		}
	}



	function happyAdjust(val) {
		happiness = happiness + val;
		blueColor = 125 + happiness;
		redColor = 125 - happiness;
		color = "rgb(" + redColor + ", 0, " + blueColor + ")";
		document.querySelector("#pet").style.backgroundColor = color;
	}

	function destroy() {
		somethingElseWasClicked = true;
		this.remove();
		setTimeout(function () {
			somethingElseWasClicked = false;
		}, 1000);
	}


	// Click handling
	document.body.addEventListener('mouseup', makeSureNothingImportantWasClicked, true);

	document.querySelector("#pet").addEventListener('mousedown', petted, true);


	var somethingElseWasClicked = false;

	// document.querySelector("#pet").mousesdown = function() {
	// 	somethingElseWasClicked = true;
	// 	console.log(somethingElseWasClicked);
	// 	petted();
	// }

	// document.querySelector("input").onclick = function() {
	// 	somethingElseWasClicked = true;
	// 	console.log(somethingElseWasClicked);
	// }

	// document.querySelector("a").onclick = function() {
	// 	somethingElseWasClicked = true;
	// 	console.log(somethingElseWasClicked);
	// }


	// document.body.onclick = function() {
	// 	if (!somethingElseWasClicked) {
	// 		generateCoordinates();
	// 	}
	// }

	function makeSureNothingImportantWasClicked() {
		if (document.activeElement == document.body && !somethingElseWasClicked) {
			generateCoordinates();
		}
	}


	// Thinking twice a second
	var thinkNow = window.setInterval(generalState, 5000);

})();
