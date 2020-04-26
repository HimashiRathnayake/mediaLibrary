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

describe ('User routes', ()=>{
    const signup = '/user/signup';
    const login = '/user/login';
    const user = {email: faker.internet.email(), password: faker.internet.password()};
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

    describe('\nsignup', ()=>{
        it('OK, should create new user if email not found', done => {
            request(app)
            .post(signup)
            .send(user)
            .then((res)=>{
                expect(res.status).to.equal(201);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('token');
                expect(res.body).to.be.deep.contain({message: 'User created'})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 409 if email was found', done => {
            request(app)
            .post(signup)
            .send(preSave)
            .then((res)=>{
                expect(res.status).to.equal(409);
                expect(res.body).to.be.deep.equal({message: "email already exists"})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    });

    describe('\nlogin', ()=>{
        it('OK, should return error 401 if user email and password empty', done => {
            let user ={};
            request(app)
            .post(login)
            .send(user)
            .then((res)=>{
                expect(res.status).to.equal(401);
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it('OK, should return 200 and token if login successfull', done => {
            request(app)
            .post(login)
            .send(preSave)
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.have.property('token');
                expect(res.body).to.be.deep.contain({message: "Auth successful"})
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });
    })

    describe('\nget other users', ()=>{
        it('OK, should get all other users', done => {
            request(app)
            .get('/user/test')
            .set("Authorization", "Bearer " + token) 
            .then((res)=>{
                expect(res.status).to.equal(200);
                expect(res.body).not.to.be.empty;
                expect(res.body).to.contain.property('count');
                expect(res.body).to.contain.property('Users')
                done();
            })
            .catch((err)=>{
                console.log(err);
                done();
            });
        });

        it("OK, should not get other users if token doesn't exist", done => {
            request(app)
            .get('/user/test')
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

})