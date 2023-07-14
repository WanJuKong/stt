<?php

$api = "                 api                 ";
$audio = 'audio.mp3';
//$audio = $_FILES['audio']['tmp_name'];
$sttUrl = "https://speech.googleapis.com/v1/speech:recognize?key=$api";

$reqData = array(
	'audio' => array(
		'content' => base64_encode(file_get_contents($audio))
	),
	'config' => array(
		'encoding' => 'LINEAR16',
		'sampleRateHertz' => 48000,
		'languageCode' => 'en-US'
	)
);
$reqJson = JSON_ENCODE($reqData);

$ch = cURL_init($sttUrl);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $reqJson);
$response = cURL_exec($ch);
curl_close($ch);

echo $response;

?>
