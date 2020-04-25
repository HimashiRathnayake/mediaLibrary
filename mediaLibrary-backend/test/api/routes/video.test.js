process.env.NODE_ENV = 'test';
process.env.JWT_KEY = "secret";
process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";
process.env.SERVER = "http://192.168.1.4:3000/";

const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');

const app =require('../../../app.js');
const conn = require('../../../db.js');

let token; 
let folderId = mongoose.Types.ObjectId();
let videoId;
let fakeId = mongoose.Types.ObjectId();

describe ('Video routes', ()=>{
    const signup = '/user/signup';
    const preSave = {email: 'test123@gmail.com', password: faker.internet.password()};

    before (done=>{
        request(app)
        .post(signup)
        .send(preSave)
        .then((res)=>{
            expect(res.status).to.equal(201);
            token = res.body.token;
            done();
        })
        .catch((err)=>{
            console.log(err);
            done();
        });
    })

    after('dropping test db', done => {
        mongoose.connection.db.dropDatabase(()=>{
            console.log('\n Test database dropped');
            done();
        });
    })

    describe('\nget all videos', ()=>{
        it('OK, should get all videos of the user', done => {
            request(app)
            .get('/videos/')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Videos');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get all videos of the user if the token doesn't exist", done => {
            request(app)
            .get('/videos/')
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

    });

    describe('\nget all videos inside a folder', ()=>{
        it('OK, should return all videos inside the folder', done => {
            request(app)
            .get('/videos/'+folderId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('videos');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get videos inside the folder if the token doesn't exist", done => {
            request(app)
            .get('/videos/'+folderId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('\nupload video', ()=>{
        it('OK, should upload video successfully', done => {
            request(app)
            .post('/videos/'+folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp4')
            .then((res)=>{
                videoId = res.body.video._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should return 401 if video doesn't included", done => {
            request(app)
            .post('/videos/'+folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'File Not Found' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not upload video if user token doesn't exist", done => {
            request(app)
            .post('/videos/'+folderId)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp4')
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nRename video', ()=>{
        it('OK, should rename video successfully', done => {
            request(app)
            .patch('/videos/'+videoId)
            .set("Authorization", "Bearer "+token)
            .send({videoName: 'RenamedTest'})
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video renamed successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename video if video name is not provided', done => {
            request(app)
            .patch('/videos/'+videoId)
            .set("Authorization", "Bearer "+token)
            .send({})
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video name is required'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename video if video id is invalid', done => {
            request(app)
            .patch('/videos/'+fakeId)
            .set("Authorization", "Bearer "+token)
            .send({videoName: 'RenamedTest'})
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not rename the video if the token doesn't exist", done => {
            request(app)
            .patch('/videos/'+videoId)
            .send({videoName: 'RenamedTest'})
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nDelete video', ()=>{
        it('OK, should delete video successfully', done => {
            request(app)
            .delete('/videos/'+videoId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not delete video if video id is invalid', done => {
            request(app)
            .delete('/videos/'+fakeId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not delete the video if the token doesn't exist", done => {
            request(app)
            .delete('/videos/'+videoId)
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'Auth failed' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

})