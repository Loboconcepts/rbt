var W = H = 1000;
var canvas = document.getElementById("pet");
canvas.width = W;
canvas.height = H;
// canvas.style.width = "220px";
// canvas.style.height = "250px";
// canvas.style.left = (window.innerWidth * 0.5 - W * scale * 0.5) + "px";
// canvas.style.top = (window.innerHeight * 0.5 - H * scale * 0.5) + "px";

var ctx = canvas.getContext("2d");

// drawFace();
	ctx.rect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = "rgb("+ Math.floor(Math.random() * 125) + "," + Math.floor(Math.random() * 125) + "," + Math.floor(Math.random() * 125) + ")";
	// ctx.fill();
	ctx.save();
	ctx.translate(canvas.width/2, canvas.height/2);
    ctx.restore();