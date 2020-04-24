// const sinon = require('sinon');
// const UserController = require('../../../api/controllers/user');
// const User = require('../../../api/models/user');
// const sinonTest =  require('sinon-test');
// const test = sinonTest(sinon);
// const faker = require('faker');
// // const sinonMongoose = require('sinon-mongoose');

// describe('User Controller', function () {
//     describe('user login', function () {
//         let req = { 
//             body: { // for testing create vehicle
//                 email: faker.internet.email(),
//                 password:  faker.internet.password()
//             },
//         },
//             // server error
//             error = new Error({ error: "blah blah" }),
//             res = {}, 
//             expectedResult;
//         beforeEach(function () {
//             res = {
//                 json: sinon.spy(),
//                 status: sinon.spy()
//             };
//         });
//         it('should return created vehicle obj', test(function () {
//             // sinonMongoose.mock()
//             this.stub(User, 'find').returns(); 
//             UserController.user_login(req, res);
//             sinon.assert.calledWith(User.find.exec, req.body);
//             // sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
//             // sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
//         }));
//     });
// })