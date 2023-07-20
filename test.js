var record = null;
var chunks = []
function startRec(){
	navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
		recorder = new MediaRecorder(stream);
		chunks = []
		recorder.ondataavailable = function(e){
			chunks.push(e.data);
		};
		recorder.start();
	});
}


function stopRec(){
	recorder.onstop = function(){
		var blob = new Blob(chunks, {type: 'audio/webm'});
		sendAudio(blob);
	};
	recorder.stop();
}


function sendAudio(blob){
	const reader = new FileReader();
	reader.readAsDataURL(blob);
	reader.onloadend = function(){
		let base64 = reader.result;
		let data = base64.split(',')[1]
		const xhr = new XMLHttpRequest();
		xhr.onload = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				let result=JSON.parse(xhr.responseText);
				console.log(result);
			}
		};
		const url = 'https://speech.googleapis.com/v1/speech:recognize?key=';
		const api = 'AIzaSyA8QbOto_sAahejrQLULtJRzQRXyoKvNAo';
		xhr.open('POST', url + api, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		const requestBody = JSON.stringify({
			config : {
				encoding : 'LINEAR16',
				sampleRateHertz : 48000,
				audio_channel_count : 1,
				languageCode : 'ko-KR'
			},
			audio : {
				content : data
			}
		});
		xhr.send(requestBody);
	};
}
