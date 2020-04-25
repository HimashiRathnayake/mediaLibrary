// 'use strict';
// const sinon = require('sinon')
// const UserController = require('../../../api/controllers/user');
// const User = require('../../../api/models/user');
// const sinonTest =  require('sinon-test');
// const test = sinonTest(sinon);
// const faker = require('faker');
// require('sinon-mongoose')

// describe('User Controller', function () {
//     describe('user signup', function () {
//         let req = { 
//             body: { 
//                 email: faker.internet.email(),
//                 password:  faker.internet.password()
//             },
//         },
//             error = new Error({ error: "blah blah" }),
//             res = {}, 
//             expectedResult;
//         beforeEach(function () {
//             res = {
//                 json: sinon.spy(),
//                 status: sinon.spy()
//             };
//         });
//         it('should return user token', test(function () {
//             const findResult = {
//                 exec: sinon.stub().resolves({email:req.body.email})
//             }
//             const user={
//                 email: req.body.email,
//                 password: req.body.password
//             }
//             this.stub(User, 'find').returns(Promise.resolve(false)); 
//             this.stub(User.prototype, 'save').returns(user);
//             UserController.user_signup(req, res);
//             sinon.assert.calledWith(User.find, {email:req.body.email});
//             sinon.assert.calledWith(User.prototype.save(req.body))
//             sinon.assert.calledWith(res.status, 200);
//             // sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
//         }));
//     });
// })