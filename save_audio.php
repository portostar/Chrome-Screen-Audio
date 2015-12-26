<?php

if(!is_dir("uploads_audio")){
	$res = mkdir("uploads_audio",0777); 
}
$globalFilename = date( 'Y-m-d-H-i-s' );
if (isset($_POST['fname'])) $globalFilename=$_POST['fname'];

// pull the raw binary data from the POST array
$data = substr($_POST['data'], strpos($_POST['data'], ",") + 1);
// decode it
$decodedData = base64_decode($data);
// print out the raw data, 
//echo ($decodedData);
$filename = 'audio_recording_' . $globalFilename .'.mp3';
// write the data out to the file
$fp = fopen('uploads_audio/'.$filename, 'wb');
fwrite($fp, $decodedData);
fclose($fp);
?>
