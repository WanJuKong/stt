function recVoice(stream){
        var mediaRecorder = new MediaRecorder(stream);
        var chunks = [];
        mediaRecorder.ondataavilable = function(e){
                chunks.push(e.data);
        };
        mediaRecorder.onstop = function(){
                //var blob = new Blob(chunks, {type: 'audio/webm'});
                var blob = new Blob(chunks, {type : 'audio/mpeg-3'});
                processAudio(blob);
        };
        mediaRecorder.start();
        setTimeout(mediaRecorder.stop();, 5000);
function getMicData(){
        navigator.mediaDevices.getUserMedia({audio:true})
        .then(recVoice(stream);).catch(function(error){
                alert(error);
        });
}

function processAudio(audioData){
        //document.getElementById('id').innerHTML = audioData;
        recAudio.src=URL.createObjectURL(audioData);
}

