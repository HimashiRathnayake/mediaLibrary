process.env.NODE_ENV = 'test';
process.env.JWT_KEY = "secret";
process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";

const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');

const app =require('../../../app.js');
const conn = require('../../../db.js');

let token; 
let imageId;
let audioId;
let videoId;
let folderId = mongoose.Types.ObjectId();
let faketype = faker.random.word();
let userId;

describe ('Share routes', ()=>{
    const signup = '/user/signup';
    const user = {email: 'test1234@gmail.com', password: faker.internet.password()};
    const preSave = {email: faker.internet.email(), password: faker.internet.password()};
    const fakeId= mongoose.Types.ObjectId();

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

    describe('Upload image', ()=>{
        it('OK, should upload image successfully', done => {
            request(app)
            .post('/images/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.jpg')
            .then((res)=>{
                imageId = res.body.image._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image uploaded successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Upload audio', ()=>{
        it('OK, should upload audio successfully', done => {
            request(app)
            .post('/audios/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp3')
            .then((res)=>{
                audioId = res.body.audio._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio uploaded successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('Upload video', ()=>{
        it('OK, should upload video successfully', done => {
            request(app)
            .post('/videos/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp4')
            .then((res)=>{
                videoId = res.body.video._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Video uploaded successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nsignUp', ()=>{
        it('OK, should create another users', done => {
            request(app)
            .post(signup)
            .send(user)
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('token');
                expect(res.body).to.be.deep.contain({message: 'User created'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nGet other user', ()=>{
        it('OK, should get other users', done => {
            request(app)
            .get('/user/'+ user.email)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                userId=res.body.Users[0]._id;
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\n Image add user', ()=>{
        const type = 'image';
        it('OK, should share image successfully', done => {
            request(app)
            .patch('/share/'+type+'/'+imageId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Image shared successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not share image if image is already shared', done => {
            request(app)
            .patch('/share/'+type+'/'+imageId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Already Shared'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not share image if the token doesn't exist", done => {
            request(app)
            .patch('/share/'+type+'/'+imageId+'/'+userId)
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

    describe('\n Audio add user', ()=>{
        const type = 'audio';
        it('OK, should share audio successfully', done => {
            request(app)
            .patch('/share/'+type+'/'+audioId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Audio shared successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not share audio if audio is already shared', done => {
            request(app)
            .patch('/share/'+type+'/'+audioId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Already Shared'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not share audio if the token doesn't exist", done => {
            request(app)
            .patch('/share/'+type+'/'+audioId+'/'+userId)
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

    describe('\n Video add user', ()=>{
        const type = 'video';
        it('OK, should share video successfully', done => {
            request(app)
            .patch('/share/'+type+'/'+videoId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Video shared successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not share video if video is already shared', done => {
            request(app)
            .patch('/share/'+type+'/'+videoId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Already Shared'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not share video if the token doesn't exist", done => {
            request(app)
            .patch('/share/'+type+'/'+videoId+'/'+userId)
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

    describe('\n Image remove user', ()=>{
        const type = 'image';
        it('OK, should remove user from accessList', done => {
            request(app)
            .patch('/share/remove/'+type+'/'+imageId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Removed user successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove user if the token doesn't exist", done => {
            request(app)
            .patch('/share/remove/'+type+'/'+imageId+'/'+userId)
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

    describe('\n Audio remove user', ()=>{
        const type = 'audio';
        it('OK, should remove user from accessList', done => {
            request(app)
            .patch('/share/remove/'+type+'/'+audioId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Removed user successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove user if the token doesn't exist", done => {
            request(app)
            .patch('/share/remove/'+type+'/'+audioId+'/'+userId)
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

    describe('\n Video remove user', ()=>{
        const type = 'video';
        it('OK, should remove user from accessList', done => {
            request(app)
            .patch('/share/remove/'+type+'/'+videoId+'/'+userId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.be.deep.contain({message: 'Removed user successfully'});
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not remove user if the token doesn't exist", done => {
            request(app)
            .patch('/share/remove/'+type+'/'+videoId+'/'+userId)
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

    describe('\n Get shared images', ()=>{
        it('OK, should get all shared images', done => {
            request(app)
            .get('/share/sharedImages')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get shared images if the token doesn't exist", done => {
            request(app)
            .get('/share/sharedImages')
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

    describe('\n Get shared images', ()=>{
        it('OK, should get all shared images', done => {
            request(app)
            .get('/share/sharedImages')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get shared images if the token doesn't exist", done => {
            request(app)
            .get('/share/sharedImages')
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
    });describe('\n Get shared audios', ()=>{
        it('OK, should get all shared audios', done => {
            request(app)
            .get('/share/sharedAudios')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get shared audios if the token doesn't exist", done => {
            request(app)
            .get('/share/sharedAudios')
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

    describe('\n Get shared videos', ()=>{
        it('OK, should get all shared videos', done => {
            request(app)
            .get('/share/sharedVideos')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get shared videos if the token doesn't exist", done => {
            request(app)
            .get('/share/sharedVideos')
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

    describe('Delete Image', ()=>{
        it('OK, should delete image successfully', done => {
            request(app)
            .delete('/images/'+ imageId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nDelete audio', ()=>{
        it('OK, should delete audio successfully', done => {
            request(app)
            .delete('/audios/'+audioId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio deleted'})
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
    });

    
});