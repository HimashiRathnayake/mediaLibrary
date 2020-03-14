// var multer_middleare = multer({ dest: './uploads',
//     onFileUploadComplete: function (file) {
//         // after file is uploaded, upload it to remote server
//         var filename = file.name;

//         request({
//             method: 'PUT',
//             preambleCRLF: true,
//             postambleCRLF: true,
//             uri: 'http://remote-server.com/upload',
//             auth: {
//                 'user': 'username',
//                 'pass': 'password',
//                 'sendImmediately': false
//             },
//             multipart: [
//                 { body: fs.createReadStream('./path_to_storage/' + filename) }
//             ]
//         },
//         function (error, response, body) {
//             if (error) {
//                 return console.error('upload failed:', error);
//             }
//             console.log('Upload successful!  Server responded with:', body);
//         })
//     });