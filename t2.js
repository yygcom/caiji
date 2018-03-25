var zm = require("./zm");
var fs = require("fs");

//path模块，可以生产相对和绝对路径
var path = require("path");

//配置远程路径
var remotePath = "a";

//获取当前目录绝对路径，这里resolve()不传入参数
var filePath = path.resolve();
console.log(filePath);

//读取文件存储数组
var fileArr = [];

//读取文件目录
fs.readdir(filePath,function(err,files){
    if(err){
        console.log(err);
        return;
    }
    var count = files.length;
    //console.log(files);
    var results = {};
    files.forEach(function(filename){
        
        //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
        fs.stat(path.join(filePath,filename),function(err, stats){
            if (err) throw err;
            //文件
            if(stats.isFile()){
                if(getdir(filename) == 'jpg'){
					//console.log(filename.trim('jpg'));
					//
					var ffx = filename.match(/(\d+-\d+-\d+)/);
					//console.log(ffx[0]);

					if(1){
						//console.log('111');
						zm.zm(ffx[0]);
						fileArr.push('x'+ffx[0]+'.ts');
						writeFile(fileArr);
					}
					if(0){
						if(0){
							//console.log('222');
							zm.i2vts(ffx[0]);
						}
						if(1){
							console.log('333');
							zm.avts(ffx[0]);
							fileArr.push('x'+ffx[0]+'.ts');
							writeFile(fileArr);
						}
					}
                    //var newUrl=remotePath+filename;
                    //fileArr.push(newUrl);
                    //writeFile(fileArr);
                }
                // (getdir(filename) == 'html')&&(fileArr.push(filename);writeFile(newUrl));
                //console.log("%s is file", filename);
            }else if(stats.isDirectory()){
                // console.log("%s is a directory文件目录", filename);
　　　　　　　　　//返回指定文件名的扩展名称 
　　　　　　　 　//console.log(path.extname("pp/index.html"));

                 if(filename == 'css' || filename == 'images'){
//var readurl = filePath+'/'+filename;
                         //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
                     //    console.log(path.join(filePath,filename));
                         var name = filename;
                         readFile(path.join(filePath,filename),name);
                 }
            }
        });
    });
});


//获取后缀名
function getdir(url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}

//获取文件数组
function readFile(readurl,name){
    console.log(name);
    var name = name;
    fs.readdir(readurl,function(err,files){
        if(err){console.log(err);return;}
        
        files.forEach(function(filename){
         // console.log(path.join(readurl,filename));

            fs.stat(path.join(readurl,filename),function(err, stats){
                if (err) throw err;
                //是文件
                if(stats.isFile()){
                    var newUrl=remotePath+name+'/'+filename;
                    fileArr.push(newUrl);
                    writeFile(fileArr)
                //是子目录
                }else if(stats.isDirectory()){
                    var dirName = filename;
                    readFile(path.join(readurl,filename),name+'/'+dirName);
                    //利用arguments.callee(path.join())这种形式利用自身函数，会报错
                    //arguments.callee(path.join(readurl,filename),name+'/'+dirName);
                }
            });
        });
    });
}


// 写入到filelisttxt文件
function writeFile(data){
    var data = data.join("|");
    fs.writeFile("mg.bat",'ffmpeg -i "concat:'+data+'" -c copy -bsf:a aac_adtstoasc -movflags +faststart output.mp4\r\ndel -y *.ts',function(err){
        if(err) throw err;
        console.log("写入成功");
    });
}
