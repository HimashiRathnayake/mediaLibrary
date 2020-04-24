// process.env.NODE_ENV = 'test';
// process.env.JWT_KEY = "secret";
// process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";

// const chai = require('chai');
// const {expect} = chai;
// const faker = require('faker');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// const rewire = require('rewire');

// const User = require('../../../api/models/user');
// const userController = rewire('../../../api/controllers/user');

// chai.use(sinonChai);

// let sandbox = null;

// describe('User Controller', ()=>{
//     let req = {
//         body: {
//             email: faker.internet.email(),
//             password: faker.internet.password()
//         }
//     };
//     let res = {
//         json : function(){
//             return this;
//         },
//         status: function(){
//             return this;
//         }
//     }

//     beforeEach(()=>{
//         sandbox = sinon.createSandbox();
//     })

//     afterEach(()=>{
//         sandbox.restore();
//     })

//     describe('login', ()=>{
//         it('should return token when signIn called', ()=>{
//             sandbox.spy(res, 'json');
//             sandbox.spy(res, 'status');
//             userController.user_login(req,res, ()=>{
//                 expect(res.status).to.have.been.calledWith(409);
//                 expect(res.json.callCount).to.equal(1);
//                 done();
//             })
//         })

        
//     })


// })