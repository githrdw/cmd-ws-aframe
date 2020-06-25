
var rotationSpeed = 0.001;
var myOtherBox = document.getElementById('myOtherBox');




function spin() {
	myOtherBox.object3D.rotation.x += rotationSpeed;
	myOtherBox.object3D.rotation.y += rotationSpeed;
	myOtherBox.object3D.rotation.z += rotationSpeed / 2;
	//console.log(myOtherBox.object3D.rotation);
}
setInterval(spin, 10);


// You can also set which camera to use (front/back/etc)
navigator.mediaDevices
	.getUserMedia({
		video: 1
	})
	.then(stream => {
		let $video = document.querySelector('video')
		$video.srcObject = stream
		$video.onloadedmetadata = () => {
			$video.play()
		}
	})

myOtherBox.addEventListener('mouseenter', function () {
	rotationSpeed = 0.01;
	console.log('entered');
});

myOtherBox.addEventListener('mouseleave', function () {
	rotationSpeed = 0.001;
	console.log('left');
});




/*
 * click-events can use a fuse (default on mobile). So the event only fires, if the cursor is on the object for a specified time.
 */

var growspeed = 1.2;

function grow(){
	myOtherBox.object3D.scale.x *= growspeed;
	myOtherBox.object3D.scale.y *= growspeed;
	myOtherBox.object3D.scale.z *= growspeed;
	setInterval(() => {
		myOtherBox.setAttribute("color", "red")
		setTimeout(() => myOtherBox.setAttribute("color", "green"), 100)
		setTimeout(() => myOtherBox.setAttribute("color", "violet"), 200)
		setTimeout(() => myOtherBox.setAttribute("color", "lightgrey"), 300)
		setTimeout(() => myOtherBox.setAttribute("color", "darkred"), 400)
		setTimeout(() => myOtherBox.setAttribute("color", "green"), 500)
		setTimeout(() => myOtherBox.setAttribute("color", "blue"), 600)
		setTimeout(() => myOtherBox.setAttribute("color", "yellow"), 700)
		setTimeout(() => myOtherBox.setAttribute("color", "purple"), 800)
		setTimeout(() => myOtherBox.setAttribute("color", "black"), 900)
		setTimeout(() => myOtherBox.setAttribute("color", "brown"), 1000)
		setTimeout(() => myOtherBox.setAttribute("color", "cyan"), 1100)
		setTimeout(() => myOtherBox.setAttribute("color", "indigo"), 1200)
		setTimeout(() => myOtherBox.setAttribute("color", "grey"), 1300)
		setTimeout(() => myOtherBox.setAttribute("color", "lightgreen"), 1400)
	}, 1500)
	console.warn(myOtherBox)
	//console.log(myOtherBox.object3D.scale);
}

myOtherBox.addEventListener('click', function(){ // uses a fuse
	grow();
	console.log('grew');
});