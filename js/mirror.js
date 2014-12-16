$(document).ready(function() {

    navigator.getUserMedia = navigator.getUserMedia ||
	  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

	var constraints = {audio: true, video: true};
	var info = $('#infoBox');
	info.text('Starting');

	function successCallback(localMediaStream) {
		window.stream = localMediaStream; // stream available to console
		// get the html dom element, not the jquery object
		var video = $('#selfVideo')[0];
		//var video = document.getElementById("selfVideo");
		video.src = window.URL.createObjectURL(localMediaStream);
		video.play();
		info.text('playing...');
	}

	//window.stream.stop()
	function errorCallback(error){
		info.text("navigator.getUserMedia error: ", error);
	}

	navigator.getUserMedia(constraints, successCallback, errorCallback);


});
