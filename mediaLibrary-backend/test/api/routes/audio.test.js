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
let audioId;
let fakeId = mongoose.Types.ObjectId();

describe ('Audio routes', ()=>{
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

    describe('\nget all audios', ()=>{
        it('OK, should get all files of the user', done => {
            request(app)
            .get('/audios/')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Audios');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get all files of the user if the token doesn't exist", done => {
            request(app)
            .get('/audios/')
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

    describe('\nget all audios inside a folder', ()=>{
        it('OK, should return all audios inside the folder', done => {
            request(app)
            .get('/audios/'+folderId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Audios');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get files inside the folder if the token doesn't exist", done => {
            request(app)
            .get('/audios/'+folderId)
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

    describe('\nupload audio', ()=>{
        it('OK, should upload audio successfully', done => {
            request(app)
            .post('/audios/'+folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp3')
            .then((res)=>{
                audioId = res.body.audio._id;
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should return 401 if audio doesn't included", done => {
            request(app)
            .post('/audios/'+folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .then((res)=>{
                expect(res.status).to.equal(401);
                expect(res.body).not.to.be.empty;
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        }); 

        it("OK, should not upload audio if user token doesn't exist", done => {
            request(app)
            .post('/audios/'+folderId)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.mp3')
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

    describe('\nRename audio', ()=>{
        it('OK, should rename audio successfully', done => {
            request(app)
            .patch('/audios/'+audioId)
            .set("Authorization", "Bearer "+token)
            .send({audioName: 'RenamedTest'})
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio renamed successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename audio without giving a audio name', done => {
            request(app)
            .patch('/audios/'+audioId)
            .set("Authorization", "Bearer "+token)
            .send({})
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio name is required'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename audio with invalid id', done => {
            request(app)
            .patch('/audios/'+fakeId)
            .set("Authorization", "Bearer "+token)
            .send({audioName: 'RenamedTest'})
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not rename the audio if the token doesn't exist", done => {
            request(app)
            .patch('/audios/'+audioId)
            .send({audioName: 'RenamedTest'})
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

        it('OK, should not delete an audio when invalid id is given', done => {
            request(app)
            .delete('/audios/'+fakeId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Audio not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not delete the audio if the token doesn't exist", done => {
            request(app)
            .delete('/audios/'+audioId)
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
