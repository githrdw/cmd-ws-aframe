// You can also set which camera to use (front/back/etc)
const $video = document.querySelector('video')
const thor = document.getElementById("thor")
let isVideo = false
let model = null;

const modelParams = {
	flipHorizontal: true, // flip e.g for video  
	maxNumBoxes: 1, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.8, // confidence threshold for predictions.
}


function startVideo() {
	$video.width = $video.width || 640;
	$video.height = $video.height || $video.width * (3 / 4)
	navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
	// navigator.mediaDevices.getUserMedia({ video: true })
		.then(stream => {
			window.localStream = stream;

			$video.srcObject = stream
			$video.onloadedmetadata = (status) => {
				$video.play()
				if (status) {
					isVideo = true
					runDetection()
				}
			}
		})
}
function runDetection() {
	model.detect($video).then(predictions => {
		if (predictions[0]) {
			const hand = predictions[0]
			const [x, y, w, h] = hand.bbox
			console.warn("HAND", hand, { x, y })
			const yP = 5-9 / (480 / y)
			const xP = 5-15 / (640 / x)
			thor.setAttribute("position", `${xP} ${yP} -5`)
		}
		if (isVideo) {
			requestAnimationFrame(runDetection);
		}
	});
}

// Load the model.
handTrack.load(modelParams).then(lmodel => {
	// detect objects in the image.
	model = lmodel
	startVideo();
});

AFRAME.registerComponent('hand', {
  tick: function () {
    // `this.el` is the element.
    // `object3D` is the three.js object.

    // `rotation` is a three.js Euler using radians. `quaternion` also available.
    console.log(this.el.object3D.rotation);

    // `position` is a three.js Vector3.
    console.log(this.el.object3D.position);
  }
});