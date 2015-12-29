# Chrome Screen and Audio
At this moment, there is no way get a single recorded file which contains both audio and screen in Chrome. The reason, it can be done in firefox is MediaRecorder API.
So, either we have to wait, or we implement audio recording to the screen recorder. To do this, we have to install a streaming application which will be responsible to send all audio to a nodejs server.
The advantage is that only the video file is stored on your server, and that no audio needs to get encoded additionally. Although webm has better audio encoding than the mp3 solution used here,
it might be that the data transfer of the audio track does not need to get made because it is getting streamed using a nodejs app. This saves time.

Have a look yourself at the used technology:

This is a fork of https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-to-PHP for screen recording and https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-to-Nodejs for recording audio on a nodejs server. 
As soon as the recording stops, the video gets uploaded to a PHP server using ajax, and the audio track was streamed using nodeJS (using binaryJS). After notification, the nodeJS server converts the .wav
file to .mp3 inside the uploads directory. It's also possible to have the .mp3 file automatically stored on a Amazon S3 Bucket by setting it up in config.js.

Please note: For screen recording to work properly in Chrome, every user will first have to download and activate this extension: 
https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk

This is only for screen and audio recording at the same time. If you need further support, you should check out the demos on https://github.com/muaz-khan/RecordRTC. 
Don't try to get Screen and Audio recording running by combining RecordRTC and getUserMedia() - it didn't work.

If you're looking for further solutions to provide more recording options, i.e. "Video and Audio" or "Screen only without audio", you will either have to implement it yourself here, or have to make use of the other WebRTC examples.
Recording audio only also is possible. This happens by calling index page of the nodeJS application "record-audio" inside the node_modules directory. When calling http://localhost:8080 directly, an audio only recorder gets shown.

Contrary, for recording both screen and audio, please use index.html. 

Installation of the nodeJS app

To record audio at all, you will have to change to the node_modules\record-audio directory and call npm install, then call node index.js and make sure the nodeJS has started. Since the application makes use
of lame, npm install will compile the libraries. If you install this in a cloud, this should happen automatically. If you haven't installed the right compilers, you will have to do this first.

If you install the record-audio package in the cloud, you will have to adjust the variable serverURL in index.html, which by default is http://localhost:8080. Also, if you change this, modify the IP inside config.js and
the URL and IP inside server.js (lines 26 and 27).

By default, you can access all .wav files and .mp3 files by calling http://localhost:8080/uploads/{name_of_file}. If you enable S3 bucket uploading in config.js, the files will get removed from that directory and will
be available in your bucket only.