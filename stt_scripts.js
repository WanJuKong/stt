

function getAudioData() {
	navigator.mediaDevices.getUserMedia({audio:true})
	.then(function(stream){
		var mediaRecorder = new MediaRecorder(stream);
		var chunks = []
		mediaRecorder.ondataavailable = function(e){
                        chunks.push(e.data);
                };
                mediaRecorder.onstop = function(){
                        var blob = new Blob(chunks, {type: 'audio/webm'});
                        processAudio(blob);
                };
                mediaRecorder.start();
                setTimeout(function(){
                        mediaRecorder.stop();
                }, 1000);
        })
                .catch(function(error){
                        alert(error);
                });
}

function processAudio(audioData){
	const form = new FormData();
	form.append('audio', audioData, 'recorded_audio.wav');

	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'stt.php', 'true');
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200){
			var response = xhr.responseText;
			alert(response);
		}
	};
	xhr.send(form);
}

