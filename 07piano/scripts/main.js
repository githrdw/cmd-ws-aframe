// You can also set which camera to use (front/back/etc)
const $video = document.querySelector('video')
const thor = [document.getElementById("thor"), document.getElementById("thor2")]
let isVideo = false
let model = null;
let handsVisible = 0

const modelParams = {
	// flipHorizontal: false, // flip e.g for video  
	maxNumBoxes: 1, // maximum number of boxes to detect
	iouThreshold: 0.5, // ioU threshold for non-max suppression
	scoreThreshold: 0.75, // confidence threshold for predictions.
}


function startVideo() {
	$video.width = $video.width || 640;
	$video.height = $video.height || $video.width * (3 / 4)
	// navigator.mediaDevices.getUserMedia({ video: { facingMode: { exact: "environment" } } })
	navigator.mediaDevices.getUserMedia({ video: true })
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

const notes = {
  a: [-10.9, -9.2, new Audio("a.wav")],
  bes: [-8, -7, new Audio("bes.wav")],
  b: [-6, -4.3, new Audio("b.wav")],
  c: [-3, -1.5, new Audio("c.wav")],
  cis: [-0.5, 0.5, new Audio("cis.wav")],
  d: [1.5, 3.3, new Audio("d.wav")],
  dis: [4, 5.3, new Audio("dis.wav")],
  e: [6.3, 8.3, new Audio("e.wav")],
  f: [9.3, 11.1, new Audio("f.wav")],
}
function playNote(x, y) {
  for (n in notes) {
    const [min, max, audio] = notes[n]
    if (x > min && x < max && y < 11.6 && y > 7.8) {
			console.warn(n)
			audio.play()
    }
  }
}

function runDetection() {
	model.detect($video).then(predictions => {
		handsVisible = predictions.length
		if (predictions.length) {
			for (i in predictions) {
				const hand = predictions[i]
				const [x, y, w, h] = hand.bbox
				const yP = 14.25 - (y / 326) * 25.5
				const xP = 19 - (x / 510) * 37
				playNote(xP, yP);
				thor[i].setAttribute("animation", `property: position; to: ${xP} ${yP} -15; dur: 200; easing: easeInQuad;`)
			}
		}
		if (isVideo) {
			setTimeout(runDetection, 200)
			// requestAnimationFrame(runDetection);
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