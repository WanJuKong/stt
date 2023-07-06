function getMicData(){
	navigator.mediaDevices.getUserMedia({audio:true})
	.then(function(stream){
		var mediaRecorder = new MediaRecorder(stream);
		var chunks = [];
		mediaRecorder.ondataavailable = function(e){
			chunks.push(e.data);
		};
		mediaRecorder.onstop = function(){
			var blob = new Blob(chunks, {type: 'audio/mpeg-3'});  //webm
			processAudio(blob);
		};
		mediaRecorder.start();
		setTimeout(function(){
			mediaRecorder.stop();
		}, 5000);
	}).catch(function(error){
		alert(error);
	});
}

function processAudio(audioData){
	//document.getElementById('id').innerHTML = audioData;
	recAudio.src=URL.createObjectURL(audioData);
}
