process.env.NODE_ENV = 'test';
process.env.JWT_KEY = "secret";
process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";
process.env.SERVER = "http://localhost:3000/";

const expect = require('chai').expect;
const request = require('supertest');
const faker = require('faker');
const mongoose = require('mongoose');

const app =require('../../../app.js');
const conn = require('../../../db.js');

let token; 
let folderId = mongoose.Types.ObjectId();
let imageId;
let fakeId = mongoose.Types.ObjectId();

describe ('Image routes', ()=>{
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

    describe('get all images', ()=>{
        it('OK, should get all images of the user', done => {
            request(app)
            .get('/images/')
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Images');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get all images of the user if the token doesn't exist", done => {
            request(app)
            .get('/images/')
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

    describe('get all images inside a folder', ()=>{
        it('OK, should return all images inside the folder', done => {
            request(app)
            .get('/images/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Images');
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get images inside the folder if the token doesn't exist", done => {
            request(app)
            .get('/images/'+ folderId)
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

    describe('Upload Image', ()=>{
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
                expect(res.body).to.deep.contain({message: 'Image uploaded successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should return 401 if image doesn't included", done => {
            request(app)
            .post('/images/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .field('Content-Type','multipart/form-data')
            .attach('file', '')
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

        it("OK, should not upload image if user token doesn't exist", done => {
            request(app)
            .post('/images/'+ folderId)
            .field('Content-Type','multipart/form-data')
            .attach('file', './test/media/test.jpg')
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

    describe('Rename Image', ()=>{
        it('OK, should rename image successfully', done => {
            request(app)
            .patch('/images/'+ imageId)
            .set("Authorization", "Bearer "+token)
            .send({imageName: 'RenamedImage'})
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image renamed successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename image if imageName is not provided', done => {
            request(app)
            .patch('/images/'+ imageId)
            .set("Authorization", "Bearer "+token)
            .send({})
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'imageName is required'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename image if image id is invalid', done => {
            request(app)
            .patch('/images/'+ fakeId)
            .set("Authorization", "Bearer "+token)
            .send({imageName: 'RenamedImage'})
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not rename the image if the token doesn't exist", done => {
            request(app)
            .patch('/images/'+ imageId)
            .send({imageName: 'RenamedImage'})
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

        it('OK, should not delete image if image id is invalid', done => {
            request(app)
            .delete('/images/'+ fakeId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Image not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not delete the image if the token doesn't exist", done => {
            request(app)
            .delete('/images/'+ imageId)
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
