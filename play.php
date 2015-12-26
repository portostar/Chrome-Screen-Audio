<?php
$id="";
if (isset($_GET['id'])) $id=$_GET['id'];
if (strlen($id)==0) die("No id given");
$file1="uploads_audio/audio_recording_".$id.".mp3";
$file2="uploads_video/".$id.".webm";
if (!is_file($file1)) {
   die($file1." not found");
}
if (!is_file($file2)) {
   die($file2." not found");
}
?>
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Simultaneous Audio and Video player</title>
  <meta name="description" content="The HTML5 Herald">
  <meta name="author" content="SitePoint">
  <script src="mediaelement_player/jquery.js"></script>
  <script src="mediaelement_player/mediaelement-and-player.min.js"></script>
  <link rel="stylesheet" href="mediaelement_player/mediaelementplayer.css" /></code>
  <!--[if lt IE 9]>
  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->
  <script>
	$('video,audio').mediaelementplayer({
    plugins: ['flash', 'silverlight'],
    success: function(mediaElement, domObject) {
        if (mediaElement.pluginType == 'flash') {
            mediaElement.addEventListener('canplay', function() {
                // Player is ready
                mediaElement.play();
            }, false);
        }
    },
    error: function() {
        alert('Error setting media!');
    }
});	
</script>
</head>

<body>
<video width="100%" height="100%" autoplay>
  <source src="uploads_video/<?=$id?>.webm" type="video/webm">
Your browser does not support the video tag.
</video>
<audio src="uploads_audio/audio_recording_<?=$id?>.mp3" type="audio/mp3" controls="controls" autoplay></audio>
</body>
</html>

