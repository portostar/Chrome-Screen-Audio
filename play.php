<?php
$id="";
if (isset($_GET['id'])) $id=$_GET['id'];
if (strlen($id)==0) die("No id given");

if (true) {
		$audio_file="node_modules/record-audio/uploads/".$id.".wav";
		$video_file="uploads_video/".$id.".webm";
		if (!is_file($audio_file)) {
		   die($audio_file." not found");
		}
		if (!is_file($video_file)) {
		   die($video_file." not found");
		}
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
  $(function() {

	  	$('video').mediaelementplayer({
		alwaysShowControls: true,
    iPadUseNativeControls: true,
    iPhoneUseNativeControls: true,
    AndroidUseNativeControls: true,
    plugins: ['flash', 'silverlight'],
    success: function(mediaElement, domObject) {
                // Player is ready
                
				
			

    },
    error: function() {
        alert('Error setting media!');
    }
});	


	$('audio').mediaelementplayer({
	alwaysShowControls: true,
    features: ['playpause','progress','volume'],
    audioVolume: 'horizontal',
    iPadUseNativeControls: true,
    iPhoneUseNativeControls: true,
    AndroidUseNativeControls: true,
    plugins: ['flash', 'silverlight'],
    success: function(mediaElement, domObject) {
                // Player is ready
           
				
		

    },
    error: function() {
        alert('Error setting media!');
    }
});	
  });

</script>
</head>

<body>
<video id="video" width="100%" height="100%" autoplay>
  <source src="uploads_video/<?=$id?>.webm" type="video/webm">
Your browser does not support the video tag.
</video>
<audio id="audio" src="<?=$audio_file?>" type="audio/wav" controls="controls" autoplay></audio>
</body>
</html>

