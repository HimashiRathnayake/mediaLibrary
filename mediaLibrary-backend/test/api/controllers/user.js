// const sinon = require('sinon');
// const userController = require('../../../api/controllers/user');
// const User = require('../../../api/models/user');
// const faker = require('faker');

// describe('User Controller', function () {
//     let req = { 
//         body : { 
//             email: faker.internet.email(),
//             password: faker.internet.password(),
//         }
//     },
//         // server error
//         error = new Error({ error: "Error" }),
//         res = {}, 
//         expectedResult;
//         beforeEach(function () {
//             res = {
//                 json: sinon.spy(),
//                 status: sinon.stub().returns({ end: sinon.spy() }) // to spy res.status(500).end()
//             };
//         });
//         it('should return user token', sinon.test(function () {
//             expectedResult = req.body
//             this.stub(User, 'create').yields(null, expectedResult); 
//             userController.user_login(req, res);
//             sinon.assert.calledWith(User.create, req.body);
//             sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
//             sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
//         }));
//         // it('should return status 500 on server error', sinon.test(function () {
//         //     this.stub(Vehicle, 'create').yields(error);
//         //     Controller.create(req, res);
//         //     sinon.assert.calledWith(Vehicle.create, req.body);
//         //     sinon.assert.calledWith(res.status, 500);
//         //     sinon.assert.calledOnce(res.status(500).end);
//         // }));
    
// }

// // process.env.NODE_ENV = 'test';
// // process.env.JWT_KEY = "secret";
// // process.env.MONGO_ATLAS_PW = "mediaLibraryPassword";

// // const chai = require('chai');
// // const {expect} = chai;
// // const faker = require('faker');
// // const sinon = require('sinon');
// // const sinonChai = require('sinon-chai');
// // const rewire = require('rewire');

// // const User = require('../../../api/models/user');
// // const userController = require('../../../api/controllers/user');

// // chai.use(sinonChai);

// // let sandbox = null;

// // describe('User Controller', ()=>{
// //     let req = {
// //         body: {
// //             email: faker.internet.email(),
// //             password: faker.internet.password()
// //         }
// //     };
// //     let res = {
// //         json : function(){
// //             return this;
// //         },
// //         status: function(){
// //             return this;
// //         }
// //     }

// //     let next;

// //     beforeEach(()=>{
// //         sandbox = sinon.createSandbox();
// //     })

// //     afterEach(()=>{
// //         sandbox.restore();
// //     })

// //     describe('login', ()=>{
// //         it('should return token when signIn called', ()=>{
// //             sandbox.spy(res, 'json');
// //             sandbox.spy(res, 'status');
// //             console.log(req.body.email);
// //             userController.user_login.call
// //             })
// //         })

        
// //     })


// // })