function getMicData(){
	navigator.mediaDevices.getUserMedia({audio:true})
	.then(function(stream){
		var mediaRecorder = new MediaRecorder(stream);
		var chunks = [];
		alert(chunks);
		mediaRecorder.ondataavailable = function(e){
			chunks.push(e.data);
		};
		mediaRecorder.onstop = function(){
			alert(chunks);
			var blob = new Blob(chunks, {type: 'audio/webm'});
			processAudio(blob);
		};
		mediaRecorder.start();
		setTimeout(function(){
			mediaRecorder.stop();
		}, 5000);
	})
		.catch(function(error){
			alert(error);
		});
}

function processAudio(audioData){
	var recAudio = document.getElementById('recAudio');
	recAudio.src=URL.createObjectURL(audioData);
	alert(typeof(audiodata));
}

