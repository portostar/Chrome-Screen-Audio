# Chrome Screen and Audio
At this moment, there is no way get a single recorded file which contains both audio and screen in Chrome. The reason, it can be done in firefox is MediaRecorder API.
So, either we have to wait, or we implement audio recording to the screen recorder. To do this, we have to send all audio to a nodejs server in an extra step.

Have a look yourself at the used technology:

This is a fork of https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-to-PHP for screen recording and https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-over-Socketio for sending both audio and video to a nodejs server. 
As soon as the recording stops, the video file (.webm) and the audio file (.wav) gets uploaded using socket.io. After notification, the nodeJS server converts the .webm and the .wav to a single file using ffmpeg. 
It's also possible to have the .mp3 file automatically stored on a Amazon S3 Bucket by setting it up in config.js.

Please note: For screen recording to work properly in Chrome, every user will first have to download and activate this extension: 
https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk

This is only for screen and audio recording at the same time. If you need further support, you should check out the demos on https://github.com/muaz-khan/RecordRTC. 

If you're looking for further solutions to provide more recording options, i.e. "Video and Audio" or "Screen only without audio", you will have to make use of the other WebRTC examples. This is, like said, for Screen and Audio.
Recording audio only also is possible. 

For developing locally, you will first have to call npm install, then load the server using node server.js. It will output the current port, which will be 8080 by default.

# Installation of the nodeJS app

By default, you can access all .wav files and .mp3 files by calling http://localhost:8080/uploads/{name_of_file}. If you enable S3 bucket uploading in config.js, the files will get removed from that directory and will
be available in your bucket only.

You will have to adjust ine 93 in index.html:

   var socketio = io.connect('https://xing-nib.rhcloud.com:8443', {secure:true});

and change the URL to http://localhost:8080 and remove the {secure:true}.

Also, ffmpeg is set up to do the conversion on the server. Besides having to setup the port and ip, most importantly you will also have to adjust the path to ffmpeg inside server.js. If you need ffmpeg
you can get the newest version from http://johnvansickle.com/ffmpeg/ - just wget and untar it and set up the path, and you're ready to go.

# Bugs

Currently, uploading of large files (more than 10 seconds) will not work. I'm working on an uploader.