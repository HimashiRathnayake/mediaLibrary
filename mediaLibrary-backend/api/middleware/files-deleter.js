var aws = require('aws-sdk');

aws.config.update({
    secretAccessKey: 'sp3cE6P/Vk5lx75c1J0ieHNqGbw7uvoIroTqnmdB',
    accessKeyId: 'AKIAJF4RWB6KLDPH7D6A',
    region: 'ap-south-1',
});

var s3 = new aws.S3();

const getParams = (req, file, cb)=>{
    filePath = file.path.split('/');
    bucketName = filePath[2].split('.')[0];
    key = filePath[3];
    var params = {
        Bucket: bucketName,
        Key: key
    };
    s3.deleteObject(params, function (err, data) {
        if (data) {
            console.log("File deleted successfully");
        }
        else {
            console.log("Check if you have sufficient permissions : "+err);
        }
    });
    
}

module.exports = getParams;
