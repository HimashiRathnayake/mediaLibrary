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

describe ('Folder routes', ()=>{
    const signup = '/user/signup';
    
    const preSave = {email: faker.internet.email(), password: faker.internet.password()};
    let folderId;
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

    describe('get all folders', ()=>{
        let params = {folderType: 'Image'};
        it('OK, should show all folders of the user', done => {
            request(app)
            .get('/folders/' + params.folderType)
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('folders')
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 404 if folterType is empty', done => {
            request(app)
            .get('/folders/')
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(404);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get all folders of the user if the token doesn't exist", done => {
            request(app)
            .get('/folders/' + params.folderType)
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

        it("OK, should not get all folders of the user if the folderType is invalid", done => {
            request(app)
            .get('/folders/' + faker.random.word())
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).to.deep.contain({ message: 'folderType is invalid' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

    });

    describe('Create Folder', ()=>{
        it('OK, should return error 500 if folderName is empty', done => {
            let body ={ folderType: 'Image'};
            request(app)
            .post('/folders/' + body.folderType)
            .set("Authorization", "Bearer " + token) 
            .send(body)
            .then((res)=>{
                expect(res.status).to.equal(500);
                done();
            })
            .catch((err)=>{
                console.log('error catch:',err);
                done();
            });
        });

        it('OK, should return error 404 if folderType is empty', done => {
            let body ={ folderName: 'Test Folder'};
            request(app)
            .post('/folders/')
            .set("Authorization", "Bearer " + token) 
            .send(body)
            .then((res)=>{
                expect(res.status).to.equal(404);
                done();
            })
            .catch((err)=>{
                console.log('error catch:',err);
                done();
            });
        });

        it("OK, should not create a folder of the user if the token doesn't exist", done => {
            let body ={ folderName: 'Test Folder', folderType: 'Image'};
            request(app)
            .post('/folders/'+ body.folderType)
            .send(body)
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

        it("OK, should not create a folder of the user if folderType is invalid", done => {
            let body ={ folderName: 'Test Folder', folderType: 'Type'};
            request(app)
            .post('/folders/'+ body.folderType)
            .set("Authorization", "Bearer " + token) 
            .send(body)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({ message: 'FolderType is invalid' })
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 201 if folder create successfull', done => {
            let body ={ folderName: 'Test Folder', folderType: 'Image'};
            request(app)
            .post('/folders/'+ body.folderType)
            .set("Authorization", "Bearer " + token) 
            .send(body)
            .then((res)=>{
                folderId= res.body.folder._id;
                expect(res.status).to.equal(201);
                expect(res.body).to.be.deep.contain({message: "Folder created successfully"})
                done();
            })
            .catch((err)=>{
                console.log('error catch:',err);
                done();
            });
        });

    });

    describe('Rename Folder', ()=>{
        it('OK, should rename folder successfully', done => {
            request(app)
            .patch('/folders/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .send({folderName: 'RenamedFolder'})
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Folder renamed successfully'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename folder if folderName is not provided', done => {
            request(app)
            .patch('/folders/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .send({})
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'folderName name is required'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not rename folder if folderId is invalid', done => {
            request(app)
            .patch('/folders/'+ fakeId)
            .set("Authorization", "Bearer "+token)
            .send({folderName: 'RenamedFolder'})
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Folder not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not rename the folder if the token doesn't exist", done => {
            request(app)
            .patch('/folders/'+ folderId)
            .send({folderName: 'RenamedFolder'})
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

    describe('Delete Folder', ()=>{
        it('OK, should delete folder successfully', done => {
            request(app)
            .delete('/folders/'+ folderId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Folder deleted'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should not delete folder if folderId is invalid', done => {
            request(app)
            .delete('/folders/'+fakeId)
            .set("Authorization", "Bearer "+token)
            .then((res)=>{
                expect(res.status).to.equal(404);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.deep.contain({message: 'Folder not found'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not delete the folder if the token doesn't exist", done => {
            request(app)
            .delete('/folders/'+ folderId)
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