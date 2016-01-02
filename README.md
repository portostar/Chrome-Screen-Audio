# Chrome Screen and Audio
At this moment, there is no way get a single recorded file which contains both audio and screen in Chrome. The reason that it can be done in Firefox is that it already has a MediaRecorder API.
For functionality for other cases, have a look at the WebRTC examples. This example is specifically for Chrome and Screen recording with audio recording.

# Demo

https://example-screencaster.rhcloud.com

# Used technology:

This is a fork of https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-to-PHP for screen recording, https://github.com/muaz-khan/RecordRTC/tree/master/RecordRTC-over-Socketio for wav recording,
https://github.com/zhuker/lamejs for convert WAV to MP3 in the browser, and https://github.com/vayam/brewtus for uploading. 
As soon as the recording stops, the video file (.webm) and the audio file (.mp3) gets uploaded using tus.io. After notification, the nodeJS server converts the .webm and the .mp3 to a single file using ffmpeg. 

# What you need
- Amazon Bucket: The .mp3 file gets automatically stored on a Amazon S3 Bucket by setting it up in config.js. You must set up the keys in ffmpeg_merge.js.
- if you decide to remove the code of the Amazon Bucket, you must make make sure to set the correct URL in line 189 of index.html
- Openshift (http://www.openshift.com) account or another hosting environment for NodeJS
- ffmpeg locally installed, and the correct paths set up in ffmpeg_merge.js in line 27. For more details see the headline "ffmpeg".

# running locally

To run it locally, set the port to ":8080" in line 20, do a npm install and call node server.js. Then in your browser call http://localhost:8080.

# index.html

When you start the application locally, you will have to set the variable "port" in line 20. Also, when you make use of an Amazon Bucket, set the URL in line 189 of index.html. You can also
set it to 'http://localhost:8080/files/'+filename+'-merged.webm' if you remove uploading to the bucket and remove the unlinkSync calls in ffmpeg_merge.js. Then all files will get uploaded to the /files directory.

# ffmpeg_merge.js

Do not forget to set the Amazon S3 keys in line 162 of ffmpeg_merge.js.

If you do not make use of Amazon Buckets.
1. remove the calls to fs.unlinkSync in ffmpeg_merge.js.
2. remove the code for uploading and the files in ffmpeg_merge.js, and set the URL in line 189 of index.html to the filenames in /files. 

# Online requirements

Please note: For screen recording to work properly in Chrome, every user will first have to download and activate this extension: 
https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk

This is only for screen and audio recording at the same time.

If you're looking for further solutions to provide more recording options, i.e. "Video and Audio" or "Screen only without audio", you will have to make use of the other WebRTC examples. This is, like said, for Screen and Audio.

# Installation of the nodeJS app

By default, you can access all .wav files and .mp3 files by calling http://localhost:8080/files/{name_of_file}. By default S3 bucket uploading is enabled, please set up the keys. After upload, the files will get removed from /files and will
be available in your bucket only.

#ffmpeg

ffmpeg is set up to do the conversion on the server. It is needed to merge the audio and the video. You must make sure that the correct path is set in ffmpeg_merge.js. If you develop on a Windows machine,
there already is a default path setup which could work on a Windows machine.

You can get the newest version from http://johnvansickle.com/ffmpeg/ - get the precompiled library, most likely the 32 bit version. On the server, use wget {url}, and call

tar -xvf ffmpeg*.*
mv ffmpeg{version} ffmpeg

If you deploy to openshift, the environment variable process.env.OPENSHIFT_DATA_DIR is already setup. Otherwise, you must make sure that the correct path to ffmpeg is set.

# Bugs

The resulting .webm file can only get opened by Chrome and Firefox, not by a media player. More configuration options would be needed to create a proper .webm or .mp4 file.