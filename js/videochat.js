$(document).ready(function() {

    navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	var constraints = {audio: true, video: true};

	function successCallback(localMediaStream) {
		window.stream = localMediaStream; // stream available to console
		// get the html dom element, not the jquery object
		var video = $('#selfVideo')[0];
		//var video = document.getElementById("selfVideo");
		video.src = window.URL.createObjectURL(localMediaStream);
		video.play();
		console.log('playing...');
	}

	//window.stream.stop()
	function errorCallback(error){
		console.log("navigator.getUserMedia error: ", error);
	}

	navigator.getUserMedia(constraints, successCallback, errorCallback);


});
