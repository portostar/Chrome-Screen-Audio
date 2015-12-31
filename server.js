// Last time updated at July 07, 2014, 19:21:23

// Muaz Khan      - www.MuazKhan.com
// MIT License    - www.WebRTC-Experiment.com/licence
// Experiments    - github.com/muaz-khan/WebRTC-Experiment
// RecordRTC      - github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC

// RecordRTC over Socket.io - github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC/RecordRTC-over-Socketio
var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    uuid = require('node-uuid');
    var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
	var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
console.log(port+"/"+ip);
var app = http.createServer(function (request, response) {

    var uri = url.parse(request.url).pathname,
        filename = path.join(process.cwd(), uri);

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                "Content-Type": "text/plain"
            });
            response.write('404 Not Found: ' + filename + '\n');
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, 'binary', function (err, file) {
            if (err) {
                response.writeHead(500, {
                    "Content-Type": "text/plain"
                });
                response.write(err + "\n");
                response.end();
                return;
            }

			var ext = filename.substr(filename.lastIndexOf('.') + 1);
			if (ext=="webm")
			{
				ext="video/webm";
			}
			else
			if (ext=="webm") {
				ext="audio/wav";
			} else {
				ext="text/html";
			}


            response.writeHead(200, {'Content-Type': ext});
            response.write(file, 'binary');
            response.end();
        });
    });
});

app.listen(port, ip);
var io = require('socket.io')(app);

var sys = require('sys'),
    path = require('path'),
    exec = require('child_process').exec;



io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
        var fileName = uuid.v4();
        
        socket.emit('ffmpeg-output', 0);

        writeToDisk(data.audio.dataURL, fileName + '.wav');

        // if it is chrome
        if (data.video) {
			console.log("WRITING TO DISK");
            writeToDisk(data.video.dataURL, fileName + '.webm');
			console.log("MERGING");
            merge(socket, fileName);
        }

        // if it is firefox or if user is recording only audio
        else socket.emit('merged', fileName + '.wav');
    });
});


function writeToDisk(dataURL, fileName) {
    var fileExtension = fileName.split('.').pop(),
        fileRootNameWithBase = './uploads/' + fileName,
        filePath = fileRootNameWithBase,
        fileID = 2,
        fileBuffer;

    // @todo return the new filename to clientf
    while (fs.existsSync(filePath)) {
        filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
        fileID += 1;
    }

    dataURL = dataURL.split(',').pop();
    fileBuffer = new Buffer(dataURL, 'base64');
    fs.writeFileSync(filePath, fileBuffer);

    console.log('filePath', filePath);
}

function merge(socket, fileName) {
	console.log("MERGING");
    var FFmpeg = require('fluent-ffmpeg');

    var audioFile = path.join(__dirname, 'uploads', fileName + '.wav'),
        videoFile = path.join(__dirname, 'uploads', fileName + '.webm'),
        mergedFile = path.join(__dirname, 'uploads', fileName + '-merged.webm');
	var ffmpeg = 
    new FFmpeg({
            source: videoFile
        });

			
			ffmpeg.setFfmpegPath("/var/lib/openshift/568140c27628e166960000cc/app-root/data/ffmpeg/ffmpeg"); // Path to directory, on Windows with .exe, on Linux without ffmpeg
        ffmpeg.addInput(audioFile)
        .on('error', function (err,firstout,secondout) {
			console.log(err);
            socket.emit('ffmpeg-error', 'ffmpeg : An error occurred: ' + err.message+firstout+secondout);
        })
        .on('progress', function (progress) {
            socket.emit('ffmpeg-output', Math.round(progress.percent));
        })
        .on('end', function () {
            socket.emit('merged', fileName + '-merged.webm');
            console.log('Merging finished!!! !');

            // removing audio/video files
           // fs.unlink(audioFile);
         //   fs.unlink(videoFile);
        })
        .saveToFile(mergedFile);
}