exports.merge = function(audioFileName, videoFileName) {
	
    var FFmpeg = require('fluent-ffmpeg');
	var knox = require('knox');
	var path = require("path");
	var fs = require("fs");
	var util = require("util");
	
	console.log("path:"+path);
    var audioFile = path.join(__dirname, 'files', audioFileName),
        videoFile = path.join(__dirname, 'files', videoFileName),
        mergedFile = path.join(__dirname, 'files', videoFileName + '-merged.webm');

    fs.rename(audioFile, audioFile+".mp3");
	fs.rename(videoFile, videoFile+".webm");
	audioFile=audioFile+".mp3";
	videoFile=videoFile+".webm";

	var destFileName = path.join(__dirname, 'files', videoFileName + '.done');
		

	var ffmpeg = 
    new FFmpeg({
            source: videoFile
        });
			
			ffmpeg.setFfmpegPath("/var/lib/openshift/568140c27628e166960000cc/app-root/data/ffmpeg/ffmpeg"); // Path to directory, on Windows with .exe, on Linux without ffmpeg
			//ffmpeg.setFfmpegPath("C:\\ffmpeg\\bin\\ffmpeg.exe"); // Path to directory, on Windows with .exe, on Linux without ffmpeg
			
        ffmpeg.addInput(audioFile)
        .on('error', function (err,firstout,secondout) {
			fs.writeFile(destFileName, "ERROR"+err+firstout+secondout);
			console.log(err+firstout+secondout);
        })
        .on('progress', function (progress) {
          						  console.log("Writing "+Math.round(progress.percent)+" to "+destFileName);

								 
									 //fs.writeFile(destFileName, Math.round(progress.percent)+"%"
									   fs.writeFile(destFileName, progress.timemark
										 , function(err) {
									if(err) {
										console.log(err);
									  }
								  });
        })
        .on('end', function () {
		
            console.log('Merging finished!!! !');

						
						
						console.log('Reading file '+mergedFile);
						
						var buf = fs.readFile(mergedFile, function(err, buf) {
						
					

						console.log("File size: "+buf.length);

								var client = knox.createClient({
    key: ''
  , secret: ''
  , bucket: '
});
console.log("PUT "+path.basename(mergedFile));
							console.log("CLIENT:"+client);
							
							  req = client.put(path.basename(mergedFile), {
								  'Content-Length': buf.length
								, 'Content-Type': 'video/webm',
								 'x-amz-acl': 'public-read' 
							  });
								  console.log("REQ:"+req);
								  console.log('Uploading '+path.basename(mergedFile));
							  req.on('response', function(res){
								  console.log('res.statusCode');
								  console.log(res.statusCode);
								if (200 == res.statusCode) {
								  console.log('saved to %s', req.url);
								  /*response.statusCode = 200;
								  response.setHeader("Access-Control-Allow-Origin", "*");
								  response.writeHead(200, {
									'Content-Type': 'application/json'
								  });*/
								
								 fs.unlinkSync(mergedFile);
								 fs.unlinkSync(audioFile);
								 fs.unlinkSync(videoFile);

								  console.log("Writing "+destFileName);
								  fs.writeFile(destFileName, "DONE", function(err) {
									if(err) {
										console.log(err);
									  }
								  });
								}
							  });
							    req.end(buf);
						});
								
								

            // removing audio/video files
           // fs.unlink(audioFile);
         //   fs.unlink(videoFile);
        })
        .saveToFile(mergedFile);
}

