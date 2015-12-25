# chrome_screen_and_audio_mp3_recorder
Since the webrtc examples do not provide screen and audio recording at the same time in Chrome, this is a workaround to allow recording audio and screen recordings at the same time.

This is a fork of https://www.webrtc-experiment.com/RecordRTC/
and a combination with 
https://github.com/nusofthq/Recordmp3js

Please note: For this to work properly in Chrome, you will have to download and activate this extension: https://chrome.google.com/webstore/detail/screen-capturing/ajhifddimkapgcifgcodmmfdlknahffk

A demo will be available on http://www.portostar.com/chrome_screen_and_audio_mp3_recorder (currently you will have to download and install it locally).

Current bug: 
	- Playing and uploading does not work properly right now, but at least recording works - under construction.
	- media.getUserMedia is deprecated. This application really is only usable for a certain amount of time, until a new WebRTC demo with simulteneous audio and screen recording support comes out.
