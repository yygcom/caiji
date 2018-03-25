function zm(i){
var exec = require('child_process').exec;
var exec2 = require('child_process').exec;
var cmdStr = 'ffprobe -loglevel quiet -print_format json -show_format -show_streams -i a/'+i+'.mp3';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('get weather api error:'+stderr);
    } else {
        var data = JSON.parse(stdout);
        var tt = Math.floor(data.format.duration* 100)/100;
		var cmdstr2 = 'ffmpeg -loop 1 -f image2 -i '+i+'.jpg -i a/'+i+'.mp3 -c:v h264 -c:a aac -b:v 240k -b:a 128k -bsf:v h264_mp4toannexb -f mpegts  -t '+tt+' -y x'+i+'.ts';

		console.log(cmdstr2);

		exec2(cmdstr2, function(err2,stdout2,stderr2){
			if(err2) {
				console.log('zm error:'+cmdstr2);
			} else {
				console.log(stdout2);
			}
		});

		//console.log(tt);
    }
});
}

function i2vts(i){
var exec = require('child_process').exec;
var exec2 = require('child_process').exec;
var cmdStr = 'ffprobe -loglevel quiet -print_format json -show_format -show_streams -i a/'+i+'.mp3';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('i2vts error:'+stderr);
    } else {
        var data = JSON.parse(stdout);
        var tt = Math.floor(data.format.duration* 100)/100;
		var cmdstr2 = 'ffmpeg -loop 1 -f image2 -i '+i+'.jpg -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v h264 -b:v 240k -bsf:v h264_mp4toannexb -f mpegts -t '+tt+' -y v'+i+'.ts';

		console.log(cmdstr2);

		exec2(cmdstr2, function(err2,stdout2,stderr2){
			if(err2) {
				console.log('get weather api error:'+stderr);
			} else {
				console.log(stdout2);
			}
		});

		//console.log(tt);
    }
});
}

function avts(i){
var exec = require('child_process').exec;
var cmdStr = 'ffmpeg -i v'+i+'.ts -i a/'+i+'.mp3 -c:v copy -c:a aac -b:a 128k -bsf:v h264_mp4toannexb -f mpegts -y x'+i+'.ts';
exec(cmdStr, function(err,stdout,stderr){
    if(err) {
        console.log('avts err:'+stderr);
    } else {
		console.log(stdout);
    }
});
}

exports.zm = zm;
exports.i2vts = i2vts;
exports.avts = avts;
